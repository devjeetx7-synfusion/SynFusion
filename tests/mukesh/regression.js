'use strict';
// Regression checks for sections the Reels/Graphics work must not affect:
// intro screen, WhatsApp quotation form, footer and navigation. Uses a mocked feed.
const fs = require('fs');
const path = require('path');
const F = require('./fixtures');
const { run, settle, sleep } = require('./harness');

const TEMPLATE = process.argv[2] || path.join(__dirname, '..', '..', 'mukesh.xml');
let passed = 0, failed = 0;
function check(name, cond, detail) {
  if (cond) { passed++; console.log('  PASS  ' + name); }
  else { failed++; console.log('  FAIL  ' + name + (detail !== undefined ? '  -> ' + JSON.stringify(detail) : '')); }
}

(async () => {
  console.log('Template under test: ' + TEMPLATE + '\n\n## Regression: intro, WhatsApp form, footer, navigation');
  const ctx = run(fs.readFileSync(TEMPLATE, 'utf8'), () => ({ status: 200, body: F.feed([F.reelsPost(), F.graphicsPost()]) }));
  await settle(ctx, 4000);
  const w = ctx.window, d = w.document;

  check('Intro screen is shown on load', !d.getElementById('introScreen').classList.contains('hidden'));
  w.matchMedia = () => ({ matches: true, addListener() {}, removeListener() {}, addEventListener() {}, removeEventListener() {} });
  d.getElementById('enterStudio').click();
  await sleep(1100);
  check('"Enter" dismisses the intro', d.body.classList.contains('intro-dismissed') && d.getElementById('introScreen').classList.contains('hidden'));

  const opened = [];
  w.open = (u) => { opened.push(u); return {}; };
  const form = d.getElementById('whatsappQuoteForm');
  form.dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
  check('Empty quotation form shows validation and does not open WhatsApp', d.getElementById('quoteName').classList.contains('field-error') && opened.length === 0);
  d.getElementById('quoteName').value = 'Test Client';
  const sel = d.getElementById('quoteService');
  sel.value = sel.options[1].value;
  d.getElementById('quoteRequirements').value = 'Need a festive poster';
  form.dispatchEvent(new w.Event('submit', { cancelable: true, bubbles: true }));
  await sleep(50);
  check('Valid quotation opens wa.me with the entered details', !!opened[0] && /^https:\/\/wa\.me\/\d+\?text=/.test(opened[0]) && /Test%20Client/.test(opened[0]) && /festive%20poster/.test(opened[0]), opened[0]);

  const footer = d.querySelector('footer');
  check('Footer is present', !!footer && /Singh Creative Studio/.test(footer.textContent));
  check('Header navigation links are present', d.querySelectorAll('header a[href^="#"], nav a[href^="#"]').length >= 5);
  const themeErrors = ctx.logs.filter(l => l.level === 'error' || (l.level === 'jsdomError' && !/Not implemented: navigation/.test(l.text)));
  check('No JavaScript errors from the theme', themeErrors.length === 0, themeErrors);
  w.close();

  console.log('\n==== RESULT: ' + passed + ' passed, ' + failed + ' failed ====');
  process.exit(failed ? 1 : 0);
})();
