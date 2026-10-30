const fs = require('fs');

console.log('Validating theme.xml...');
const xml = fs.readFileSync('theme.xml', 'utf8');

// Check key requirements
const checks = [
  { name: 'XML Header', test: xml.includes('<?xml version="1.0" encoding="UTF-8" ?>') },
  { name: 'Blogger Namespace', test: xml.includes("xmlns:b='http://www.google.com/2005/gml/b'") },
  { name: 'Skin Block', test: xml.includes('<b:skin>') },
  { name: 'Blog Widget', test: xml.includes("type='Blog'") },
  { name: 'SynFusion Tagline', test: xml.includes('We Build. We Innovate. We Scale.') },
  { name: 'Primary Color #008F4C', test: xml.includes('#008F4C') },
  { name: 'Phone Number', test: xml.includes('+91 93346 03912') },
  { name: 'Email Address', test: xml.includes('dharmjeetsingh958@gmail.com') },
  { name: 'WhatsApp Link', test: xml.includes('wa.me/919334603912') },
  { name: 'WorkDaily Project', test: xml.includes('WorkDaily') },
  { name: 'Jump Adventure Project', test: xml.includes('Jump Adventure') },
  { name: 'EduSathi Project', test: xml.includes('EduSathi') },
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
