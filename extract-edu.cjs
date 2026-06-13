const fs = require('fs');

const content = fs.readFileSync('reference-bundle.js', 'utf8');

const searchTerms = ['Jaypee', 'VRARMR', 'Club', 'Bhopal', 'BVM', 'Skills'];

searchTerms.forEach(term => {
  console.log(`\n=== SEARCHING FOR "${term}" ===`);
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(term, idx)) !== -1) {
    count++;
    if (count <= 3) {
      console.log(`Match ${count} at idx ${idx}:`);
      console.log(content.substring(idx - 100, idx + 1000));
      console.log('---------------------------------');
    }
    idx += term.length;
  }
});
