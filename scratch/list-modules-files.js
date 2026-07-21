const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const modulesDir = path.join(rootDir, 'src/modules');
const filesList = [];

function scan(dir) {
  if (!fs.existsSync(dir)) return;
  const files = fs.readdirSync(dir);
  for (const file of files) {
    const fullPath = path.join(dir, file);
    const stat = fs.statSync(fullPath);
    if (stat.isDirectory()) {
      scan(fullPath);
    } else {
      if (file.endsWith('.tsx') || file.endsWith('.ts')) {
        filesList.push(path.relative(rootDir, fullPath));
      }
    }
  }
}

scan(modulesDir);
console.log('Module files to refactor:', JSON.stringify(filesList, null, 2));
process.exit(0);
