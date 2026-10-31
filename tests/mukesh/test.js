'use strict';
// Automated DOM tests for mukesh.xml. They execute the template's REAL inline JavaScript in jsdom
// against MOCKED Blogger feed responses (fetch + JSONP) and a mocked YouTube IFrame API.
// These are NOT live-site checks.
const fs = require('fs');
const path = require('path');
const F = require('./fixtures');
const { run, settle, snapshot, sleep } = require('./harness');

const TEMPLATE = process.argv[2] || path.join(__dirname, '..', '..', 'mukesh.xml');
const xml = fs.readFileSync(TEMPLATE, 'utf8');
const DEMO_IDS = ['L_LUpnjgPso', 'jNQXAC9IVRw', 'kJQP7kiw5Fk', 'fJ9rUzIMcZQ', '3JZ_D3ELwOQ', '2Vv-BfVoq4g', 'dQw4w9WgXcQ'];
const FEED_JSON = F.HOST + '/feeds/posts/default?alt=json';
const FEED_JSONP = F.HOST + '/feeds/posts/default?alt=json-in-script';

let passed = 0, failed = 0;
const failures = [];
function check(name, cond, detail) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; failures.push(name); console.log('  FAIL  ' + name + (detail !== undefined ? '  -> ' + (typeof detail === 'string' ? detail : JSON.stringify(detail)) : '')); }
}

const ok = body => () => ({ status: 200, body });
function startIndexOf(url) { const m = /start-index=(\d+)/.exec(url); return m ? parseInt(m[1], 10) : 1; }

async function load(router, options) {
  const ctx = run(xml, router, options);
  await settle(ctx, 5000);
  await sleep(30);
  return ctx;
}
const errorsOf = ctx => ctx.logs.filter(l => l.level === 'error' || l.level === 'jsdomError');
const warnsOf = ctx => ctx.logs.filter(l => l.level === 'warn');
const noDemoIn = ctx => { const html = ctx.window.document.documentElement.outerHTML; return DEMO_IDS.filter(id => html.includes(id)); };

function filler(n, startId) {
  const out = [];
  for (let i = 0; i < n; i++) out.push(F.entry({ postId: String(startId + i), title: 'Unlabeled note ' + (startId + i), labels: ['Blog'], content: '<p>Text</p>' }));
  return out;
}

async function scenario(name, fn) {
  console.log('\n## ' + name);
  try { await fn(); } catch (e) { check(name + ' (no exception in test)', false, e.stack); }
}

(async () => {
  console.log('Template under test: ' + TEMPLATE);

  await scenario('S1. Exactly two real posts (Graphics + Reels), classic Blogger upload + YouTube embed', async () => {
    const ctx = await load(ok(F.feed([F.reelsPost(), F.graphicsPost()])));
    const s = snapshot(ctx);
    check('Reels carousel has exactly 1 card', s.reels.length === 1, s.reels);
    check('Reel shows the real post title', s.reels[0] && s.reels[0].title === 'Product Ad Reel — Smartwatch Launch', s.reels[0]);
    check('Reel uses the post\'s YouTube ID', s.reels[0] && s.reels[0].ytId === F.YT_REEL, s.reels[0]);
    check('Reel cover is the YouTube thumbnail for that ID (max-res first)', s.reels[0] && s.reels[0].cover === 'https://i.ytimg.com/vi/' + F.YT_REEL + '/maxresdefault.jpg', s.reels[0] && s.reels[0].cover);
    check('Reel badge is the neutral REEL badge (no guessed sub-category)', s.reels[0] && s.reels[0].badge === 'REEL', s.reels[0] && s.reels[0].badge);
    check('Graphics gallery has exactly 1 card', s.graphics.length === 1, s.graphics);
    check('Graphic shows the real post title', s.graphics[0] && s.graphics[0].title === 'Diwali Sale Poster Design');
    check('Graphic artwork is the full-size uploaded image', s.graphics[0] && s.graphics[0].img === F.GFX_IMG_FULL, s.graphics[0] && s.graphics[0].img);
    const gimg = ctx.window.document.querySelector('#graphicsGrid .graphic-card img');
    check('Graphic keeps the exact in-post image as fallback', gimg && gimg.getAttribute('data-fallback-src') === F.GFX_IMG_SMALL, gimg && gimg.getAttribute('data-fallback-src'));
    check('Graphic card keeps the original post URL', ctx.window.document.querySelector('#graphicsGrid .graphic-card').getAttribute('data-post-url') === F.HOST + '/2026/10/diwali-sale-poster.html');
    check('Reels post is NOT in Graphics', !s.graphics.some(g => /Reel/.test(g.title)));
    check('Graphics post is NOT in Reels', !s.reels.some(r => /Diwali/.test(r.title)));
    check('No demo/sample YouTube IDs anywhere in the DOM', noDemoIn(ctx).length === 0, noDemoIn(ctx));
    const cardTitles = s.reels.map(r => r.title).concat(s.graphics.map(g => g.title));
    check('No placeholder card titles ("Untitled Project", "Creative Reel", "Creative Artwork", "Untitled")', !cardTitles.some(t => /^(Untitled Project|Untitled|Creative Reel|Creative Artwork)$/i.test(t.trim())) && !/Untitled Project|Creative Artwork/.test(ctx.window.document.body.textContent), cardTitles);
    check('Counter shows 01 / 01', s.counter.replace(/\s+/g, ' ').trim() === '01 / 01', s.counter);
    check('Single same-origin JSON request, bounded page size', ctx.requests.filter(r => r.kind === 'fetch').length === 1 && ctx.requests[0].url === FEED_JSON + '&start-index=1&max-results=50', ctx.requests);
    check('No JS errors', errorsOf(ctx).length === 0, errorsOf(ctx));

    // --- Reel plays only when the play button is pressed
    check('No YouTube player/API before pressing play (cover only, no autoplay)', ctx.players.length === 0 && !ctx.requests.some(r => r.kind === 'yt-api'));
    ctx.window.document.querySelector('#reelsTrack .reel-play-btn-wrap').click();
    await sleep(150);
    check('Pressing play loads the YouTube IFrame API', ctx.requests.some(r => r.kind === 'yt-api'));
    check('Player created for the Reel\'s video ID', ctx.players.length === 1 && ctx.players[0].opts.videoId === F.YT_REEL, ctx.players.map(p => p.opts.videoId));
    check('playVideo() called after press', ctx.players[0] && ctx.players[0].calls.includes('playVideo'), ctx.players[0] && ctx.players[0].calls);
    check('Player iframe mounted inside the active reel card', !!ctx.window.document.querySelector('#reelsTrack .reel-card.active iframe'));

    // --- Focus moving into the YouTube iframe (window blur) must NOT pause
    const p = ctx.players[0];
    const before = p.calls.filter(c => c === 'pauseVideo').length;
    const ifr = ctx.window.document.querySelector('#reelsTrack iframe');
    ifr.setAttribute('tabindex', '0'); ifr.focus();
    ctx.window.dispatchEvent(new ctx.window.Event('blur'));
    await sleep(40);
    check('Window blur caused by focusing the player iframe does not pause', p.calls.filter(c => c === 'pauseVideo').length === before, p.calls);
    // --- Tab hidden pauses (visibility-based playback kept)
    Object.defineProperty(ctx.window.document, 'hidden', { configurable: true, get: () => true });
    ctx.window.document.dispatchEvent(new ctx.window.Event('visibilitychange'));
    await sleep(40);
    check('Hiding the tab auto-pauses the playing Reel', p.calls.filter(c => c === 'pauseVideo').length === before + 1, p.calls);
    // jsdom has no layout engine (all rects are 0x0); report the reels section as on-screen, as it
    // would be for a visitor who switched tabs while watching.
    const rc = ctx.window.document.getElementById('reelsContainer') || ctx.window.document.getElementById('reels');
    rc.getBoundingClientRect = () => ({ top: 0, bottom: 600, left: 0, right: 800, width: 800, height: 600 });
    Object.defineProperty(ctx.window.document, 'hidden', { configurable: true, get: () => false });
    ctx.window.document.dispatchEvent(new ctx.window.Event('visibilitychange'));
    await sleep(40);
    check('Showing the tab again resumes playback', p.calls.filter(c => c === 'playVideo').length >= 2, p.calls);

    // --- Lightbox
    ctx.window.document.querySelector('#graphicsGrid .graphic-card').click();
    const lb = ctx.window.document.getElementById('lightboxModal');
    const lbImg = ctx.window.document.querySelector('#lightboxBody img');
    const link = ctx.window.document.getElementById('lightboxPostLink');
    check('Lightbox opens with the full-size artwork', lb.classList.contains('open') && lbImg && lbImg.getAttribute('src') === F.GFX_IMG_FULL);
    check('Lightbox title is the real post title', ctx.window.document.getElementById('lightboxTitle').textContent === 'Diwali Sale Poster Design');
    check('Lightbox "View post" link points at the Blogger post', link && !link.hidden && link.getAttribute('href') === F.HOST + '/2026/10/diwali-sale-poster.html');
    ctx.window.document.getElementById('lightboxClose').click();
    check('Lightbox closes', !lb.classList.contains('open'));
    ctx.window.close();
  });

  await scenario('S2. Page refresh (second full load) yields the same single cards, no duplicates', async () => {
    for (let i = 1; i <= 2; i++) {
      const ctx = await load(ok(F.feed([F.reelsPost(), F.graphicsPost()])));
      const s = snapshot(ctx);
      check('Load #' + i + ': 1 reel + 1 graphic', s.reels.length === 1 && s.graphics.length === 1, { r: s.reels.length, g: s.graphics.length });
      ctx.window.close();
    }
  });

  await scenario('S3. New Blogger editor image (img/a/ =size) + YouTube Shorts link', async () => {
    const g = F.graphicsPost({ content: '<p>Logo</p>' + F.bloggerImageHtml(F.GFX_A_FULL, F.GFX_A_SMALL), thumb: F.GFX_A_THUMB });
    const r = F.reelsPost({ content: '<p>Watch: <a href="https://youtube.com/shorts/' + F.YT_OTHER + '?feature=share">my short</a></p>', thumb: null });
    const ctx = await load(ok(F.feed([r, g])));
    const s = snapshot(ctx);
    check('Graphic uses large rendition of the new-editor upload', s.graphics[0] && s.graphics[0].img === 'https://blogger.googleusercontent.com/img/a/AVvXsEgTESTlogoNEWEDITOR456=s1600', s.graphics[0] && s.graphics[0].img);
    const gimg = ctx.window.document.querySelector('#graphicsGrid img');
    check('...with the exact in-post URL as fallback', gimg && gimg.getAttribute('data-fallback-src') === F.GFX_A_SMALL);
    check('Shorts link parsed to the correct ID', s.reels[0] && s.reels[0].ytId === F.YT_OTHER, s.reels);
    check('Exactly 1 + 1', s.reels.length === 1 && s.graphics.length === 1);
    ctx.window.close();
  });

  await scenario('S4. "Short" feed setting: no content, summary text only (media$thumbnail fallback)', async () => {
    const g = F.graphicsPost({ content: undefined, summary: 'Festive poster for a local brand.' });
    const r = F.reelsPost({ content: undefined, summary: 'Short-form product ad.' });
    const ctx = await load(ok(F.feed([r, g])));
    const s = snapshot(ctx);
    check('Graphic falls back to media$thumbnail, upgraded to s1600', s.graphics[0] && s.graphics[0].img === 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTESTposterARTWORK123/s1600/diwali-poster.png', s.graphics[0] && s.graphics[0].img);
    const gimg = ctx.window.document.querySelector('#graphicsGrid img');
    check('...keeping the original thumbnail URL as fallback', gimg && gimg.getAttribute('data-fallback-src') === F.GFX_THUMB);
    check('Reel ID recovered from Blogger\'s YouTube media$thumbnail', s.reels[0] && s.reels[0].ytId === F.YT_REEL, s.reels);
    ctx.window.close();
  });

  await scenario('S5. Mixed-case / padded labels and sub-labels', async () => {
    const g = F.graphicsPost({ labels: ['  gRaPhIcS ', 'Posters & Banners'] });
    const r = F.reelsPost({ labels: ['REELS', 'Motion Graphics'] });
    const ctx = await load(ok(F.feed([r, g])));
    const s = snapshot(ctx);
    check('"  gRaPhIcS " recognised as Graphics', s.graphics.length === 1);
    check('"REELS" recognised as Reels', s.reels.length === 1);
    check('"Motion Graphics" sub-label does NOT make the Reel a Graphic', s.graphics.length === 1 && s.graphics[0].title === 'Diwali Sale Poster Design');
    check('Graphic sub-label maps to POSTER badge', s.graphics[0] && s.graphics[0].badge === 'POSTER', s.graphics[0] && s.graphics[0].badge);
    check('Reel sub-label maps to MOTION badge', s.reels[0] && s.reels[0].badge === 'MOTION', s.reels[0] && s.reels[0].badge);
    // filters: poster chip shows the graphic; logo chip shows category-empty state (not the feed-empty state)
    const doc = ctx.window.document;
    doc.querySelector('#graphicsFilterGroup [data-gfx-filter="logo"]').click();
    check('Category with no posts shows a category-empty message', /No Graphics in This Category Yet/.test(doc.getElementById('graphicsGrid').textContent));
    doc.querySelector('#graphicsFilterGroup [data-gfx-filter="poster"]').click();
    check('Matching category chip shows the graphic', doc.querySelectorAll('#graphicsGrid .graphic-card').length === 1);
    const workAllActive = doc.querySelector('#work .filter[data-filter="all"]').classList.contains('active');
    check('Graphics filter clicks do not disturb the portfolio filters', workAllActive);
    doc.querySelector('#work .filter[data-filter="brand"]').click();
    check('Portfolio filter clicks do not disturb the Graphics filters', doc.querySelector('#graphicsFilterGroup [data-gfx-filter="poster"]').classList.contains('active'));
    doc.querySelector('#reelsFilterGroup [data-reel-filter="2d"]').click();
    check('Reels category with no posts shows a category-empty message', /No Reels in This Category Yet/.test(doc.getElementById('reelsTrack').textContent));
    doc.querySelector('#reelsFilterGroup [data-reel-filter="motion"]').click();
    check('Reels "Motion Graphics" chip shows the reel', doc.querySelectorAll('#reelsTrack .reel-card').length === 1);
    ctx.window.close();
  });

  await scenario('S6. Graphics post with NO image', async () => {
    const g = F.graphicsPost({ content: '<p>Artwork coming soon.</p>', thumb: null });
    const ctx = await load(ok(F.feed([F.reelsPost(), g])));
    const s = snapshot(ctx);
    check('Card still listed under Graphics with its real title', s.graphics.length === 1 && s.graphics[0].title === 'Diwali Sale Poster Design');
    check('Card is marked no-image and contains no <img>', s.graphics[0] && s.graphics[0].noImage && s.graphics[0].img === null);
    check('Card states clearly that no artwork image was found', /No artwork image found in this Blogger post/.test(s.graphics[0] && s.graphics[0].text));
    check('Card links to the post', !!ctx.window.document.querySelector('#graphicsGrid .graphic-post-link'));
    check('Reason logged to console', warnsOf(ctx).some(w => /no usable artwork image/.test(w.text) && /Diwali Sale Poster Design/.test(w.text)), warnsOf(ctx));
    ctx.window.document.querySelector('#graphicsGrid .graphic-card').click();
    check('No-image card does not open an empty lightbox', !ctx.window.document.getElementById('lightboxModal').classList.contains('open'));
    ctx.window.close();
  });

  await scenario('S7. Graphics post with incidental YouTube link: stays Graphics, YT thumbnails never used as artwork', async () => {
    const g1 = F.graphicsPost({ content: '<p>Poster. Process video: <a href="https://youtu.be/' + F.YT_OTHER + '">watch</a></p>' + F.bloggerImageHtml(F.GFX_IMG_FULL, F.GFX_IMG_SMALL) });
    const g2 = F.graphicsPost({ postId: '7003', title: 'Only a video here', content: F.bloggerYouTubeIframe(F.YT_OTHER), thumb: 'https://img.youtube.com/vi/' + F.YT_OTHER + '/default.jpg' });
    const ctx = await load(ok(F.feed([F.reelsPost(), g1, g2])));
    const s = snapshot(ctx);
    check('Both Graphics-labeled posts are in Graphics only', s.graphics.length === 2 && s.reels.length === 1 && s.reels[0].ytId === F.YT_REEL, { g: s.graphics.map(x => x.title), r: s.reels.map(x => x.ytId) });
    check('Real artwork used for the poster', s.graphics.some(x => x.img === F.GFX_IMG_FULL));
    check('No Graphics card uses a YouTube thumbnail', !s.graphics.some(x => x.img && /ytimg|youtube/.test(x.img)), s.graphics.map(x => x.img));
    check('Video-only Graphics post is shown as no-image, not as a Reel', s.graphics.some(x => x.title === 'Only a video here' && x.noImage));
    ctx.window.close();
  });

  await scenario('S8. Reels post that also contains an uploaded image', async () => {
    const r = F.reelsPost({ content: F.bloggerImageHtml(F.GFX_IMG_FULL, F.GFX_IMG_SMALL) + F.bloggerYouTubeIframe(F.YT_REEL) });
    const ctx = await load(ok(F.feed([r, F.graphicsPost({ postId: '7009', title: 'Logo Pack', content: F.bloggerImageHtml(F.GFX_A_FULL, F.GFX_A_SMALL) })])));
    const s = snapshot(ctx);
    check('Reel cover is the YouTube thumbnail, not the uploaded image', s.reels[0] && /i\.ytimg\.com\/vi\/Tst_Reel-01\//.test(s.reels[0].cover), s.reels[0] && s.reels[0].cover);
    check('The Reels post is not added to Graphics', s.graphics.length === 1 && s.graphics[0].title === 'Logo Pack');
    ctx.window.close();
  });

  await scenario('S9. Reels post with INVALID YouTube IDs', async () => {
    const r = F.reelsPost({ content: '<p><a href="https://youtu.be/abc123">too short</a> and https://www.youtube.com/watch?v=TooLongVideoId12</p>', thumb: null });
    const ctx = await load(ok(F.feed([r, F.graphicsPost()])));
    const s = snapshot(ctx);
    check('Invalid Reel is skipped (no playable card, no invented video)', s.reels.length === 0);
    check('Reels empty state explains the skipped post', /could not be shown because no valid YouTube video link was found/.test(s.reelsText), s.reelsText);
    check('Problem logged with the post title', warnsOf(ctx).some(w => /was skipped: no valid YouTube/.test(w.text) && /Smartwatch/.test(w.text)));
    check('Graphics post unaffected', s.graphics.length === 1);
    ctx.window.close();
  });

  await scenario('S10. Valid EMPTY feed (Blogger omits "entry")', async () => {
    const ctx = await load(ok(F.feed([])));
    const s = snapshot(ctx);
    check('Reels show the empty state (not an error)', /No Reels Published Yet/.test(s.reelsText) && !s.reelsRetry, s.reelsText);
    check('Graphics show the empty state (not an error)', /No Graphic Projects Found/.test(s.graphicsText) && !s.graphicsRetry, s.graphicsText);
    check('No sample cards rendered', s.reels.length === 0 && s.graphics.length === 0 && noDemoIn(ctx).length === 0);
    check('Counter shows 00 / 00', s.counter.replace(/\s+/g, ' ').trim() === '00 / 00', s.counter);
    check('No JS errors', errorsOf(ctx).length === 0, errorsOf(ctx));
    ctx.window.close();
  });

  await scenario('S11. Feed request FAILS on every endpoint, then Retry succeeds exactly once', async () => {
    let mode = 'fail';
    const router = (url) => mode === 'fail' ? { status: 500, body: 'Internal error' } : { status: 200, body: F.feed([F.reelsPost(), F.graphicsPost()]) };
    const ctx = await load(router);
    let s = snapshot(ctx);
    check('Reels show a retryable error state', /Unable to Load Reels/.test(s.reelsText) && s.reelsRetry, s.reelsText);
    check('Graphics show a retryable error state', /Unable to Load Graphics/.test(s.graphicsText) && s.graphicsRetry, s.graphicsText);
    check('All endpoints were tried (same-origin JSON, blog JSONP, blog-ID JSONP)',
      ctx.requests.some(r => r.kind === 'fetch' && r.url.startsWith(FEED_JSON)) &&
      ctx.requests.some(r => r.kind === 'jsonp' && r.url.startsWith(FEED_JSONP)) &&
      ctx.requests.some(r => r.kind === 'jsonp' && r.url.startsWith('https://www.blogger.com/feeds/' + F.BLOG_ID + '/posts/default?alt=json-in-script')), ctx.requests.map(r => r.kind + ' ' + r.url));
    check('No unrelated blog domain requested', !ctx.requests.some(r => /synfusion\.blogspot|singhcreative/.test(r.url)));
    check('Failure logged as an error', errorsOf(ctx).some(e => /Could not load the Blogger feed/.test(e.text)));
    mode = 'ok';
    const n0 = ctx.requests.length;
    const btn = ctx.window.document.getElementById('graphicsRetryBtn');
    btn.click(); btn.click(); // double click must not start two runs
    await settle(ctx, 4000); await sleep(50);
    s = snapshot(ctx);
    check('After Retry: exactly 1 reel and 1 graphic', s.reels.length === 1 && s.graphics.length === 1, { r: s.reels.length, g: s.graphics.length });
    check('Double-clicking Retry started only one request', ctx.requests.length - n0 === 1, ctx.requests.slice(n0));
    ctx.window.close();
  });

  await scenario('S12. fetch returns non-JSON (e.g. feed redirect) -> JSONP fallback on the blog host', async () => {
    const router = (url, kind) => kind === 'fetch' ? { status: 200, body: '<?xml version="1.0"?><rss></rss>' } : { status: 200, body: F.feed([F.reelsPost(), F.graphicsPost()]) };
    const ctx = await load(router);
    const s = snapshot(ctx);
    check('Posts loaded through JSONP fallback', s.reels.length === 1 && s.graphics.length === 1);
    check('JSONP used the blog\'s own host with a callback', ctx.requests.some(r => r.kind === 'jsonp' && r.url.startsWith(FEED_JSONP) && /&callback=__scsFeedCb_\d+_\d+$/.test(r.url)), ctx.requests);
    ctx.window.close();
  });

  await scenario('S13. Viewed from a non-blog origin (Blogger preview): uses data:blog.* address, no same-origin guess', async () => {
    const ctx = await load(ok(F.feed([F.reelsPost(), F.graphicsPost()])), { pageUrl: 'https://www.blogger.com/blog/themes/preview' });
    const s = snapshot(ctx);
    check('Posts loaded', s.reels.length === 1 && s.graphics.length === 1);
    check('First request went to the blog homepage (JSONP), not to blogger.com/feeds/posts/default', ctx.requests[0] && ctx.requests[0].url.startsWith(FEED_JSONP), ctx.requests[0]);
    ctx.window.close();
  });

  await scenario('S14. Both labels on one post (conflict rule)', async () => {
    const both = F.entry({ postId: '7100', title: 'Mixed Label Post', labels: ['Reels', 'Graphics'], content: F.bloggerImageHtml(F.GFX_A_FULL, F.GFX_A_SMALL) + F.bloggerYouTubeIframe(F.YT_OTHER) });
    const ctx = await load(ok(F.feed([both, F.reelsPost(), F.graphicsPost()])));
    const s = snapshot(ctx);
    check('Conflicting post appears in neither section', !s.reels.some(r => r.title === 'Mixed Label Post') && !s.graphics.some(g => g.title === 'Mixed Label Post'));
    check('The two correctly-labeled posts still appear once each', s.reels.length === 1 && s.graphics.length === 1);
    check('Conflict logged with a fix instruction', warnsOf(ctx).some(w => /BOTH the 'Reels' and 'Graphics' labels/.test(w.text) && /Mixed Label Post/.test(w.text)));
    ctx.window.close();
  });

  await scenario('S15. Malformed entries do not block valid posts', async () => {
    const weird = [null, 42, 'text', {}, { title: 'string-not-object', category: [null, 42, { term: null }], content: { $t: 42 } },
      { id: { $t: 'tag:blogger.com,1999:blog-1.post-999' }, category: { term: 'Reels' }, content: 'not-an-object', link: 'nope' }];
    const ctx = await load(ok(F.feed(weird.concat([F.reelsPost(), F.graphicsPost()]))));
    const s = snapshot(ctx);
    check('Valid posts render', s.reels.length === 1 && s.graphics.length === 1, { r: s.reels, g: s.graphics });
    check('No JS errors', errorsOf(ctx).length === 0, errorsOf(ctx));
    ctx.window.close();
  });

  await scenario('S16. Duplicates within a page and across pages; bounded pagination', async () => {
    const page1 = filler(47, 8000).concat([F.reelsPost(), F.graphicsPost(), F.reelsPost()]); // 50 entries, one dup
    const page2 = [F.graphicsPost(), F.reelsPost()]; // only dups
    const router = url => ({ status: 200, body: startIndexOf(url) === 1 ? F.feed(page1, { total: 52 }) : F.feed(page2, { total: 52, start: 51 }) });
    const ctx = await load(router);
    const s = snapshot(ctx);
    check('Each post appears exactly once', s.reels.length === 1 && s.graphics.length === 1, { r: s.reels.length, g: s.graphics.length });
    check('Fetched 2 pages (start-index 1 and 51)', ctx.requests.length === 2 && /start-index=51/.test(ctx.requests[1].url), ctx.requests.map(r => r.url));
    ctx.window.close();

    let calls = 0;
    const endless = url => { calls++; const st = startIndexOf(url); return { status: 200, body: F.feed(filler(50, 20000 + st), { total: 100000, start: st }) }; };
    const ctx2 = await load(endless);
    check('Endless feed stops at maxTotalPosts=150 (3 requests of 50)', calls === 3, calls);
    ctx2.window.close();
  });

  await scenario('S17. Later page fails: posts from earlier pages are kept', async () => {
    const page1 = filler(48, 9000).concat([F.reelsPost(), F.graphicsPost()]);
    const router = url => startIndexOf(url) === 1 ? { status: 200, body: F.feed(page1, { total: 120 }) } : { status: 503, body: 'busy' };
    const ctx = await load(router);
    const s = snapshot(ctx);
    check('Page-1 posts rendered despite page-2 failure', s.reels.length === 1 && s.graphics.length === 1);
    check('Partial failure logged', warnsOf(ctx).some(w => /later feed page failed/.test(w.text)));
    ctx.window.close();
  });

  await scenario('S18. No fetch() available -> JSONP', async () => {
    const ctx = await load(ok(F.feed([F.reelsPost(), F.graphicsPost()])), { noFetch: true });
    const s = snapshot(ctx);
    check('Posts loaded via JSONP', s.reels.length === 1 && s.graphics.length === 1 && ctx.requests[0].kind === 'jsonp');
    ctx.window.close();
  });

  await scenario('S19. Hostile/odd titles and URLs are rendered safely', async () => {
    const g = F.graphicsPost({ title: 'Mukesh\'s "Best" <img src=x onerror=alert(1)> & Co',
      content: '<img src="https://example.com/a.png\' onerror=\'alert(1)" width="800"/>', thumb: null });
    const r = F.reelsPost({ title: '<b>Bold</b> reel\'s title' });
    const ctx = await load(ok(F.feed([r, g])));
    const doc = ctx.window.document;
    const card = doc.querySelector('#graphicsGrid .graphic-card');
    const img = card && card.querySelector('img');
    check('Graphic title rendered as literal text', card && card.querySelector('h3').textContent === 'Mukesh\'s "Best" <img src=x onerror=alert(1)> & Co');
    check('Alt attribute intact (apostrophes/quotes preserved)', img && img.getAttribute('alt') === 'Mukesh\'s "Best" <img src=x onerror=alert(1)> & Co', img && img.outerHTML);
    check('No injected elements in the card', card && card.querySelectorAll('img').length === 1 && !card.querySelector('b'));
    check('Quote in image URL is percent-encoded, no attribute injection', img && /%27/.test(img.getAttribute('src')) && img.getAttribute('onerror') === 'window.handleGraphicImgError(this);', img && img.outerHTML);
    const rt = doc.querySelector('#reelsTrack .reel-meta-title');
    check('Reel title rendered as literal text', rt && rt.textContent === '<b>Bold</b> reel\'s title' && !rt.querySelector('b'));
    ctx.window.close();
  });

  await scenario('S20. Missing title: no fabricated title', async () => {
    const g = F.graphicsPost({ title: '' });
    const ctx = await load(ok(F.feed([F.reelsPost(), g])));
    const s = snapshot(ctx);
    const img = ctx.window.document.querySelector('#graphicsGrid img');
    check('Card rendered without a made-up title', s.graphics.length === 1 && !ctx.window.document.querySelector('#graphicsGrid h3'));
    check('Neutral alt text', img && img.getAttribute('alt') === 'Graphics artwork');
    check('Missing title logged', warnsOf(ctx).some(w => /has no title/.test(w.text)));
    ctx.window.close();
  });

  await scenario('S21. Image fallbacks: YouTube cover quality chain and artwork URL fallback', async () => {
    const ctx = await load(ok(F.feed([F.reelsPost(), F.graphicsPost()])));
    const w = ctx.window, doc = w.document;
    const cover = doc.querySelector('#reelsTrack img.reel-cover-img');
    const seq = [cover.getAttribute('src')];
    w.handleReelCoverImgError(cover); seq.push(cover.getAttribute('src'));            // maxres 404 -> sd
    Object.defineProperty(cover, 'naturalWidth', { configurable: true, get: () => 120 });
    w.handleReelCoverImgLoad(cover); seq.push(cover.getAttribute('src'));             // sd placeholder -> hq
    Object.defineProperty(cover, 'naturalWidth', { configurable: true, get: () => 480 });
    w.handleReelCoverImgLoad(cover); const kept = cover.getAttribute('src');          // hq real -> keep
    check('maxres -> sd -> hq; a real 480px hq thumbnail is kept', seq.map(u => u.split('/').pop()).join(',') === 'maxresdefault.jpg,sddefault.jpg,hqdefault.jpg' && kept.endsWith('/hqdefault.jpg'), seq.concat([kept]));
    w.handleReelCoverImgError(cover); w.handleReelCoverImgError(cover);                // hq err -> mq -> default
    check('Chain reaches default.jpg', cover.getAttribute('src').endsWith('/default.jpg'), cover.getAttribute('src'));
    Object.defineProperty(cover, 'naturalWidth', { configurable: true, get: () => 120 });
    w.handleReelCoverImgLoad(cover);
    check('default.jpg (120px) is accepted as a real thumbnail', cover.style.display !== 'none' && cover.getAttribute('src').endsWith('/default.jpg'));
    w.handleReelCoverImgError(cover);
    check('If every size fails: neutral "Cover image unavailable" state, no fake cover', cover.style.display === 'none' && cover.closest('.reel-thumbnail-wrap').classList.contains('no-cover'));
    const gimg = doc.querySelector('#graphicsGrid img');
    w.handleGraphicImgError(gimg);
    check('Upgraded artwork URL failing -> exact in-post URL', gimg.getAttribute('src') === F.GFX_IMG_SMALL);
    w.handleGraphicImgError(gimg);
    check('Both failing -> honest "could not be loaded" state', gimg.style.display === 'none' && gimg.closest('.graphic-image-wrap').classList.contains('img-failed'));
    ctx.window.close();
  });

  await scenario('S22. Static checks: swipe CSS, XML wiring, no demo data in source', async () => {
    const css = (xml.match(/<b:skin>\s*<!\[CDATA\[([\s\S]*?)\]\]>/) || [])[1] || '';
    check('No "touch-action: pan-y" left on the reels carousel', !/touch-action:\s*pan-y\s*;/.test(css));
    check('Reels wrapper allows native horizontal panning with overscroll containment', /\.reels-carousel-track-wrapper\s*\{[^}]*touch-action:\s*manipulation;[^}]*overscroll-behavior-x:\s*contain;/.test(css));
    check('Blog address comes from Blogger data, not a hardcoded host', /expr:data-home-url='data:blog\.homepageUrl'/.test(xml) && /expr:data-blog-id='data:blog\.blogId'/.test(xml) && !/synfusion\.blogspot\.com/.test(xml));
    check('No demo/sample YouTube IDs in the template source', DEMO_IDS.every(id => !xml.includes(id)));
    check('No placeholder title strings in the template source', !/Untitled Project|'Creative Reel'|'Creative Artwork'|createBrandedSvgThumbnail/.test(xml));
  });

  console.log('\n==== RESULT: ' + passed + ' passed, ' + failed + ' failed ====');
  if (failed) { console.log('Failed checks:\n - ' + failures.join('\n - ')); process.exit(1); }
})();
