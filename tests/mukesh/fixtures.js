'use strict';
// Realistic Blogger JSON feed fixtures, modeled on the real structure returned by
// https://<blog>.blogspot.com/feeds/posts/default?alt=json (verified live on a public blog).
// All IDs/URLs below are synthetic TEST DATA ONLY — they are never shipped in mukesh.xml.

const HOST = 'https://example-studio.blogspot.com';
const BLOG_ID = '1234567890123456789';

// Synthetic 11-char YouTube-style IDs used only inside tests.
const YT_REEL = 'Tst_Reel-01';
const YT_OTHER = 'Tst_Reel-02';

const GFX_IMG_FULL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTESTposterARTWORK123/s1600/diwali-poster.png';
const GFX_IMG_SMALL = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTESTposterARTWORK123/s320/diwali-poster.png';
const GFX_THUMB = 'https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEhTESTposterARTWORK123/s72-w640-h640-c/diwali-poster.png';
// New Blogger editor style (img/a/ with =size suffix)
const GFX_A_FULL = 'https://blogger.googleusercontent.com/img/a/AVvXsEgTESTlogoNEWEDITOR456=s1080';
const GFX_A_SMALL = 'https://blogger.googleusercontent.com/img/a/AVvXsEgTESTlogoNEWEDITOR456=w320-h320';
const GFX_A_THUMB = 'https://blogger.googleusercontent.com/img/a/AVvXsEgTESTlogoNEWEDITOR456=s72-w320-h320-c';

let seq = 100;
function entry(opts) {
  const id = opts.postId || String(++seq);
  const slug = opts.slug || ('post-' + id);
  const e = {
    id: { $t: 'tag:blogger.com,1999:blog-' + BLOG_ID + '.post-' + id },
    published: { $t: opts.published || '2026-10-31T10:00:00.000+05:30' },
    updated: { $t: opts.published || '2026-10-31T10:05:00.000+05:30' },
    title: { type: 'text', $t: opts.title === undefined ? '' : opts.title },
    link: [
      { rel: 'replies', type: 'application/atom+xml', href: HOST + '/feeds/' + id + '/comments/default', title: 'Post Comments' },
      { rel: 'edit', type: 'application/atom+xml', href: 'https://www.blogger.com/feeds/' + BLOG_ID + '/posts/default/' + id },
      { rel: 'self', type: 'application/atom+xml', href: 'https://www.blogger.com/feeds/' + BLOG_ID + '/posts/default/' + id },
      { rel: 'alternate', type: 'text/html', href: HOST + '/2026/10/' + slug + '.html', title: opts.title || '' }
    ],
    author: [{ name: { $t: 'Mukesh Singh' }, email: { $t: 'noreply@blogger.com' } }],
    'thr$total': { $t: '0' }
  };
  if (opts.labels) e.category = opts.labels.map(t => ({ scheme: 'http://www.blogger.com/atom/ns#', term: t }));
  if (opts.content !== undefined) e.content = { type: 'html', $t: opts.content };
  if (opts.summary !== undefined) e.summary = { type: 'text', $t: opts.summary };
  if (opts.thumb) e['media$thumbnail'] = { 'xmlns$media': 'http://search.yahoo.com/mrss/', url: opts.thumb, height: '72', width: '72' };
  if (opts.raw) Object.assign(e, opts.raw);
  return e;
}

function feed(entries, extra) {
  const f = {
    version: '1.0', encoding: 'UTF-8',
    feed: {
      xmlns: 'http://www.w3.org/2005/Atom',
      id: { $t: 'tag:blogger.com,1999:blog-' + BLOG_ID },
      title: { type: 'text', $t: 'Singh Creative Studio' },
      link: [{ rel: 'alternate', type: 'text/html', href: HOST + '/' }],
      'openSearch$totalResults': { $t: String((extra && extra.total !== undefined) ? extra.total : entries.length) },
      'openSearch$startIndex': { $t: String((extra && extra.start) || 1) },
      'openSearch$itemsPerPage': { $t: '50' }
    }
  };
  // Real Blogger omits the "entry" key entirely for an empty feed.
  if (entries.length) f.feed.entry = entries;
  return f;
}

// Blogger classic upload markup (separator div + anchor-wrapped image)
function bloggerImageHtml(full, small) {
  return '<div class="separator" style="clear: both;"><a href="' + full + '" style="display: block; padding: 1em 0; text-align: center; "><img alt="" border="0" data-original-height="1350" data-original-width="1080" width="320" src="' + small + '"/></a></div>';
}
// Blogger "Insert video > YouTube" markup
function bloggerYouTubeIframe(id) {
  return '<div class="separator" style="clear: both; text-align: center;"><iframe allowfullscreen="" class="BLOG_video_class" height="266" src="https://www.youtube.com/embed/' + id + '" width="320" youtube-src-id="' + id + '"></iframe></div>';
}

const graphicsPost = (o = {}) => entry(Object.assign({
  postId: '7001', slug: 'diwali-sale-poster', title: 'Diwali Sale Poster Design', labels: ['Graphics'],
  content: '<p>Festive poster for a local brand.</p>' + bloggerImageHtml(GFX_IMG_FULL, GFX_IMG_SMALL),
  thumb: GFX_THUMB, published: '2026-10-30T18:00:00.000+05:30'
}, o));

const reelsPost = (o = {}) => entry(Object.assign({
  postId: '7002', slug: 'product-ad-reel', title: 'Product Ad Reel — Smartwatch Launch', labels: ['Reels'],
  content: '<p>Short-form product ad.</p>' + bloggerYouTubeIframe(YT_REEL),
  thumb: 'https://img.youtube.com/vi/' + YT_REEL + '/default.jpg', published: '2026-10-31T09:00:00.000+05:30'
}, o));

module.exports = {
  HOST, BLOG_ID, YT_REEL, YT_OTHER, GFX_IMG_FULL, GFX_IMG_SMALL, GFX_THUMB, GFX_A_FULL, GFX_A_SMALL, GFX_A_THUMB,
  entry, feed, bloggerImageHtml, bloggerYouTubeIframe, graphicsPost, reelsPost
};
