const fs = require('fs');

const content = fs.readFileSync('reference-bundle.js', 'utf8');

// Function to find array/object blocks near keywords
function searchKeywordData(kw, limit = 5) {
  console.log(`\n=========================================`);
  console.log(`Searching for data structures containing: "${kw}"`);
  console.log(`=========================================`);
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(kw, idx)) !== -1) {
    count++;
    // Get context from 100 chars before to 1500 chars after the match
    const start = Math.max(0, idx - 50);
    const end = Math.min(content.length, idx + 2000);
    const textPart = content.substring(idx, end);
    
    // Look for array patterns like [ { or similar
    console.log(`Match ${count} at index ${idx}:`);
    console.log(textPart.substring(0, 1000));
    console.log('-----------------------------------------');
    
    if (count >= limit) break;
    idx += kw.length;
  }
}

searchKeywordData('podcast');
searchKeywordData('gallery');
