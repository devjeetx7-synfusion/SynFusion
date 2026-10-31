# Tests for `mukesh.xml` (Singh Creative Studio Blogger theme)

These tests run the template's **real inline JavaScript** in [jsdom](https://github.com/jsdom/jsdom).
The Blogger feed, the JSONP endpoint and the YouTube IFrame API are **mocked**. A passing run therefore
proves the theme's logic against realistic Blogger feed data. It does **not** prove anything about a
specific live blog. To check a live blog, follow the steps in "Verifying on the live blog" below.

## Run

```bash
cd tests/mukesh
npm install
npm test            # test.js (Reels/Graphics behaviour) + regression.js (intro, WhatsApp form, footer)
node test.js /path/to/other/template.xml   # run against another version of the template
```

## What is covered (`test.js`)

| Area | Scenarios |
| --- | --- |
| The two real posts | One `Graphics` post and one `Reels` post. Each appears exactly once, in the right section only, with its real title. The Graphic shows its full-size uploaded artwork; the Reel shows its YouTube thumbnail. The Reel plays only when the play button is pressed. No demo IDs or placeholder titles anywhere. |
| Refresh / retry | A second page load gives the same single cards. A failed load followed by Retry gives each post exactly once. A double-click on Retry starts only one request. |
| Blogger formats | Classic `img/b/.../s320/` uploads, new-editor `img/a/...=w320-h320` uploads, "Short" feeds (summary only, `media$thumbnail`), YouTube embeds, Shorts, `youtu.be`, `watch?v=` links. |
| Strict labels | Mixed-case and padded labels (`  gRaPhIcS `, `REELS`). Sub-labels drive the filter chips. `Motion Graphics` does not count as `Graphics`. A post with **both** labels is shown in neither section and is logged. |
| Problem posts | Graphics post without an image (honest notice, no invented image). Reels post with an invalid YouTube ID (skipped and reported). Missing titles. Malformed entries. Hostile titles and URLs (escaped). |
| Feed handling | Valid empty feed (empty state, not an error). Every endpoint failing (retryable error state). Non-JSON response (JSONP fallback on the blog's own host). No `fetch()`. Preview origin. Duplicates within and across pages. Bounded pagination (max 150 posts). A later page failing keeps earlier posts. |
| Playback | No YouTube API or player before pressing play. `playVideo()` on press. Focusing the player iframe does not auto-pause. Hiding the tab pauses and showing it resumes. |
| Image fallbacks | YouTube cover chain `maxresdefault → sddefault → hqdefault → mqdefault → default`, including YouTube's 120×90 "missing" placeholder. Upgraded artwork URL falls back to the exact in-post URL. |

All IDs and URLs in `fixtures.js` are synthetic **test data**. They never appear in `mukesh.xml`; `test.js`
checks this explicitly.

## Verifying on the live blog

1. Paste `mukesh.xml` into **Blogger → Theme → ⋮ → Edit HTML**, then save.
2. Open the blog and the browser console. The theme logs one summary line, for example:
   `[Blogger Feed] Loaded 2 published post(s) via same-origin JSON feed in 1 page(s). Reels: 1, Graphics: 1, ...`
   Any skipped post is logged with its title, URL and the reason it was skipped.
3. Confirm that the Graphics post appears only in the Graphics gallery and the Reels post only in the Reels carousel.
