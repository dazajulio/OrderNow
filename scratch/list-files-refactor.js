const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targets = [
  'src/app/(super-admin)/admin',
  'src/app/[slug]/gerente',
  'src/app/[slug]/cocina',
  'src/app/[slug]'
];
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
        // Exclude specific files like page.tsx in the root of [slug] or layout.tsx in the root of [slug] if they are public landing, but wait: [slug]/page.tsx is the kiosk itself, which is public client Kiosko!
        // We only exclude the root app/page.tsx (the main landing)
        filesList.push(path.relative(rootDir, fullPath));
      }
    }
  }
}

for (const target of targets) {
  scan(path.join(rootDir, target));
}

console.log('Files to refactor:', JSON.stringify(filesList, null, 2));
process.exit(0);
