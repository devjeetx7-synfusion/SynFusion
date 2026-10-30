/* eslint-disable @typescript-eslint/no-require-imports */
const fs = require('fs');

console.log('Validating theme.xml...');
const xml = fs.readFileSync('theme.xml', 'utf8');

// Check key requirements for SynFusion Blogger Theme
const checks = [
  { name: 'XML Header', test: xml.includes('<?xml version="1.0" encoding="UTF-8" ?>') },
  { name: 'Blogger Namespace', test: xml.includes("xmlns:b='http://www.google.com/2005/gml/b'") },
  { name: 'Skin Block', test: xml.includes('<b:skin>') },
  { name: 'Blog Widget', test: xml.includes("type='Blog'") },
  { name: 'SynFusion Tagline', test: xml.includes('WE BUILD. WE INNOVATE. WE SCALE.') || xml.includes('We Build. We Innovate. We Scale.') },
  { name: 'Primary Color #008F4C', test: xml.includes('#008F4C') },
  { name: 'Official Logo Image', test: xml.includes('https://i.postimg.cc/7PNN0DMg/file-000000006e788243a3aaf94a91b6f9db.png') },
  { name: 'Phone Number', test: xml.includes('+91 93346 03912') },
  { name: 'Email Address', test: xml.includes('dharmjeetsingh958@gmail.com') },
  { name: 'WhatsApp Link', test: xml.includes('wa.me/919334603912') },
  { name: 'Automatic GitHub Portfolio Engine', test: xml.includes('devjeetx7-synfusion') },
  { name: 'Social Media Handle @getsynfusion', test: xml.includes('getsynfusion') },
  { name: 'Redesigned Post Reader', test: xml.includes('readingProgressBar') && xml.includes('postTocContainer') },
];

let failed = false;
checks.forEach(c => {
  if (c.test) {
    console.log(`✓ Passed: ${c.name}`);
  } else {
    console.error(`✗ Failed: ${c.name}`);
    failed = true;
  }
});

if (failed) {
  process.exit(1);
} else {
  console.log('All automated validation checks passed successfully!');
}
