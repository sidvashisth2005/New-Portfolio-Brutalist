const fs = require('fs');

const content = fs.readFileSync('reference-bundle.js', 'utf8');

const keywords = ['podcast', 'gallery', 'spotify', 'episode', 'photo', 'skills', 'about', 'contact', 'vashisth'];

keywords.forEach(kw => {
  console.log(`\n=== SEARCHING FOR "${kw}" ===`);
  let idx = 0;
  let count = 0;
  while ((idx = content.indexOf(kw, idx)) !== -1) {
    count++;
    if (count <= 10) {
      const start = Math.max(0, idx - 150);
      const end = Math.min(content.length, idx + kw.length + 150);
      const context = content.substring(start, end).replace(/\n/g, ' ');
      console.log(`Match ${count} (idx ${idx}): ... ${context} ...`);
    }
    idx += kw.length;
  }
  console.log(`Total matches for "${kw}": ${count}`);
});
