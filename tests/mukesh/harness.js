'use strict';
// DOM harness that executes a Blogger template's real inline JavaScript in jsdom,
// with mocked network (fetch + JSONP script injection), IntersectionObserver and YouTube IFrame API.
const { JSDOM, VirtualConsole } = require('jsdom');
const { HOST } = require('./fixtures');

function templateToHtml(xml, opts) {
  const homepageUrl = (opts && opts.homepageUrl) || (HOST + '/');
  let html = xml.replace(/^<\?xml[^>]*\?>\s*/, '');
  html = html.replace(/<b:skin>\s*<!\[CDATA\[([\s\S]*?)\]\]>\s*<\/b:skin>/, (m, css) => '<style>' + css + '</style>');
  html = html.replace(/<b:template-skin>[\s\S]*?<\/b:template-skin>/, '');
  html = html.replace(/<b:include[^>]*\/>/g, '');
  html = html.replace(/<b:section[\s\S]*?<\/b:section>/g, '');
  // Emulate Blogger rendering of expr: attributes that reference blog data.
  html = html.replace(/expr:([a-zA-Z0-9_-]+)='data:blog\.homepageUrl'/g, (m, attr) => attr + "='" + homepageUrl + "'");
  html = html.replace(/expr:([a-zA-Z0-9_-]+)='data:blog\.blogId'/g, (m, attr) => attr + "='1234567890123456789'");
  html = html.replace(/\s(?:b|expr):[a-zA-Z0-9_:-]+='[^']*'/g, '');
  return html;
}

function parseQuery(url) {
  const q = {};
  const s = url.split('?')[1] || '';
  s.split('&').forEach(p => { if (!p) return; const [k, v] = p.split('='); q[decodeURIComponent(k)] = decodeURIComponent(v || ''); });
  return q;
}

/**
 * router(url, kind) -> { status, body } | { networkError: true } | { hang: true }
 *   kind: 'fetch' | 'jsonp'
 */
function run(xml, router, options) {
  options = options || {};
  const logs = [];
  const requests = [];
  const vc = new VirtualConsole();
  ['log', 'info', 'warn', 'error'].forEach(level => vc.on(level, (...args) => {
    logs.push({ level, text: args.map(a => (a && a.message) ? a.message : (typeof a === 'object' ? JSON.stringify(a) : String(a))).join(' ') });
  }));
  vc.on('jsdomError', e => { logs.push({ level: 'jsdomError', text: String(e && e.message) }); });

  const players = [];
  const dom = new JSDOM(templateToHtml(xml, options), {
    url: options.pageUrl || (HOST + '/'),
    runScripts: 'dangerously',
    pretendToBeVisual: true,
    virtualConsole: vc,
    beforeParse(window) {
      window.scrollTo = function () {};
      window.Element.prototype.scrollTo = function (o) { if (o && typeof o.left === 'number') this.scrollLeft = o.left; };
      window.IntersectionObserver = function (cb) { this.observe = function () {}; this.unobserve = function () {}; this.disconnect = function () {}; };
      if (options.noFetch) { delete window.fetch; } else {
        window.fetch = function (url, init) {
          requests.push({ kind: 'fetch', url: String(url) });
          const r = router(String(url), 'fetch');
          if (r.hang) return new Promise((res, rej) => { if (init && init.signal) init.signal.addEventListener('abort', () => rej(new Error('The operation was aborted.'))); });
          if (r.networkError) return Promise.reject(new TypeError('Failed to fetch'));
          return Promise.resolve({
            ok: r.status >= 200 && r.status < 300, status: r.status,
            json: () => (typeof r.body === 'string' ? Promise.resolve().then(() => JSON.parse(r.body)) : Promise.resolve(JSON.parse(JSON.stringify(r.body)))),
            text: () => Promise.resolve(typeof r.body === 'string' ? r.body : JSON.stringify(r.body))
          });
        };
      }
      // JSONP interception: when a <script src=...alt=json-in-script...> is attached, answer it.
      const origAppend = window.Node.prototype.appendChild;
      const origInsert = window.Node.prototype.insertBefore;
      function intercept(node) {
        if (node && node.tagName === 'SCRIPT' && node.src && /alt=json-in-script/.test(node.src)) {
          requests.push({ kind: 'jsonp', url: node.src });
          const q = parseQuery(node.src);
          const r = router(node.src, 'jsonp');
          setTimeout(() => {
            if (r.hang) return;
            if (r.networkError || r.status >= 400) { if (typeof node.onerror === 'function') node.onerror(new window.Event('error')); return; }
            const fn = window[q.callback];
            if (typeof fn === 'function') fn(JSON.parse(JSON.stringify(r.body)));
          }, 5);
          return true;
        }
        if (node && node.tagName === 'SCRIPT' && node.src && /youtube\.com\/iframe_api/.test(node.src)) {
          requests.push({ kind: 'yt-api', url: node.src });
          setTimeout(() => { installYT(window, players); if (typeof window.onYouTubeIframeAPIReady === 'function') window.onYouTubeIframeAPIReady(); }, 5);
          return true;
        }
        return false;
      }
      window.Node.prototype.appendChild = function (node) { intercept(node); return origAppend.call(this, node); };
      window.Node.prototype.insertBefore = function (node, ref) { intercept(node); return origInsert.call(this, node, ref); };
    }
  });
  return { dom, window: dom.window, logs, requests, players };
}

function installYT(window, players) {
  window.YT = {
    PlayerState: { UNSTARTED: -1, ENDED: 0, PLAYING: 1, PAUSED: 2, BUFFERING: 3, CUED: 5 },
    Player: function (containerId, opts) {
      const self = this;
      self.containerId = containerId; self.opts = opts; self.state = -1; self.calls = [];
      const host = window.document.getElementById(containerId);
      if (host) { const ifr = window.document.createElement('iframe'); ifr.src = 'https://www.youtube.com/embed/' + opts.videoId; host.appendChild(ifr); }
      self.playVideo = function () { self.calls.push('playVideo'); self.state = 1; setTimeout(() => opts.events && opts.events.onStateChange && opts.events.onStateChange({ data: 1, target: self }), 1); };
      self.pauseVideo = function () { self.calls.push('pauseVideo'); self.state = 2; setTimeout(() => opts.events && opts.events.onStateChange && opts.events.onStateChange({ data: 2, target: self }), 1); };
      self.stopVideo = function () { self.calls.push('stopVideo'); };
      self.destroy = function () { self.calls.push('destroy'); };
      self.mute = function () { self.calls.push('mute'); };
      self.unMute = function () { self.calls.push('unMute'); };
      self.getPlayerState = function () { return self.state; };
      players.push(self);
      setTimeout(() => opts.events && opts.events.onReady && opts.events.onReady({ target: self }), 3);
    }
  };
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function settle(ctx, ms) {
  // Wait until both sections leave the loading state (or timeout).
  const deadline = Date.now() + (ms || 3000);
  while (Date.now() < deadline) {
    const d = ctx.window.document;
    const t = (d.getElementById('reelsTrack') || {}).textContent || '';
    const g = (d.getElementById('graphicsGrid') || {}).textContent || '';
    if (!/Loading published/i.test(t) && !/Loading published/i.test(g)) { await sleep(30); return; }
    await sleep(20);
  }
}

function snapshot(ctx) {
  const d = ctx.window.document;
  const track = d.getElementById('reelsTrack');
  const grid = d.getElementById('graphicsGrid');
  const reels = [...track.querySelectorAll('.reel-card')].map(c => ({
    id: c.getAttribute('data-id'),
    title: (c.querySelector('.reel-meta-title') || {}).textContent || '',
    cover: (c.querySelector('img.reel-cover-img') || {}).getAttribute ? c.querySelector('img.reel-cover-img').getAttribute('src') : null,
    ytId: (c.querySelector('img.reel-cover-img') || { getAttribute: () => null }).getAttribute('data-yt-id'),
    badge: (c.querySelector('.reel-badge-category') || {}).textContent || ''
  }));
  const graphics = [...grid.querySelectorAll('.graphic-card')].map(c => ({
    title: (c.querySelector('h3') || {}).textContent || '',
    img: c.querySelector('img') ? c.querySelector('img').getAttribute('src') : null,
    noImage: c.classList.contains('graphic-card--no-image'),
    badge: (c.querySelector('.graphic-badge') || {}).textContent || '',
    text: c.textContent.replace(/\s+/g, ' ').trim()
  }));
  return {
    reels, graphics,
    reelsText: track.textContent.replace(/\s+/g, ' ').trim(),
    graphicsText: grid.textContent.replace(/\s+/g, ' ').trim(),
    counter: (d.getElementById('reelsCounter') || {}).textContent || '',
    reelsRetry: !!d.getElementById('reelsRetryBtn'),
    graphicsRetry: !!d.getElementById('graphicsRetryBtn')
  };
}

module.exports = { run, settle, snapshot, sleep, templateToHtml, parseQuery };
