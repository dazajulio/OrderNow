const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const results = [];

function search(dir) {
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      if (file !== 'node_modules' && file !== '.next' && file !== '.git') {
        search(fullPath);
      }
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts') || file.endsWith('.js')) {
        const content = fs.readFileSync(fullPath, 'utf8');
        let matches = [];
        if (content.includes('/gerente') || content.includes('/app') || content.includes('active_restaurant_id')) {
          matches.push('Path/Env references found');
        }
        if (matches.length > 0) {
          results.push({
            file: path.relative(rootDir, fullPath),
            relevance: matches.join(', ')
          });
        }
      }
    }
  }
}

search(rootDir);
console.log('Search Results:', JSON.stringify(results, null, 2));
process.exit(0);
