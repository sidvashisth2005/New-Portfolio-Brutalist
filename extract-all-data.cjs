const fs = require('fs');

const content = fs.readFileSync('reference-bundle.js', 'utf8');

// We want to find variables/arrays like projects list, experience list, education list, skills list, awards list.
// Let's write a script that does regex searches for arrays of objects that look like they hold data.

function extractBlock(keyword, markerStart, markerEnd) {
  let idx = 0;
  while ((idx = content.indexOf(keyword, idx)) !== -1) {
    const start = Math.max(0, idx - 100);
    const end = Math.min(content.length, idx + 2000);
    const chunk = content.substring(idx - 50, end);
    console.log(`\n=== MATCH FOR "${keyword}" ===`);
    console.log(chunk.substring(0, 1000));
    console.log('==================================');
    idx += keyword.length;
  }
}

// Let's search for the projects list
console.log('--- Searching for Projects list ---');
extractBlock('ARCore', null, null);

// Let's search for skills list
console.log('--- Searching for Skills list ---');
extractBlock('GTM', null, null);

// Let's search for experience list
console.log('--- Searching for Experience list ---');
extractBlock('Trustique', null, null);

// Let's write a script that regex matches all objects with title/description/tags
const fileOutput = [];

// Find patterns like [{title:"..." or [{role:"..." or similar
const arrayPattern = /\[\s*\{\s*(?:title|role|name|year|yr|n)\s*:/gi;
let match;
while ((match = arrayPattern.exec(content)) !== null) {
  const startIdx = match.index;
  // Print 1500 chars from here
  fileOutput.push(`\n\n--- ARRAY DATA STARTING AT INDEX ${startIdx} ---`);
  fileOutput.push(content.substring(startIdx, startIdx + 1500));
}

fs.writeFileSync('extracted-arrays.txt', fileOutput.join('\n'), 'utf8');
console.log('Wrote arrays to extracted-arrays.txt');
