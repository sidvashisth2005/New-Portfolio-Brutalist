const fs = require('fs');

const content = fs.readFileSync('reference-bundle.js', 'utf8');

// Find podcast match around index 1276500 to 1279000
const startIdx = 1275000;
const endIdx = 1281000;
const subText = content.substring(startIdx, endIdx);

console.log('Extracting text context around index 1275000 to 1281000:');
fs.writeFileSync('podcast-context.txt', subText, 'utf8');
console.log('Saved to podcast-context.txt');
