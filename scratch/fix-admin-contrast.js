const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const files = [
  'src/app/(super-admin)/admin/page.tsx',
  'src/app/(super-admin)/admin/billing/page.tsx',
  'src/app/(super-admin)/admin/emails/page.tsx',
  'src/app/(super-admin)/admin/settings/page.tsx',
  'src/app/(super-admin)/admin/tenants/page.tsx',
  'src/app/(super-admin)/admin/users/page.tsx'
];

const replacements = [
  { pattern: /text-3xl font-black text-white/g, replacement: 'text-3xl font-black text-gray-900' },
  { pattern: /text-2xl font-black text-white/g, replacement: 'text-2xl font-black text-gray-900' },
  { pattern: /text-xl font-bold text-white/g, replacement: 'text-xl font-bold text-gray-900' },
  { pattern: /text-lg font-bold text-white/g, replacement: 'text-lg font-bold text-gray-900' },
  { pattern: /text-lg font-semibold text-white/g, replacement: 'text-lg font-semibold text-gray-900' },
  { pattern: /text-md font-bold text-white/g, replacement: 'text-md font-bold text-gray-900' },
  { pattern: /text-sm font-bold text-white/g, replacement: 'text-sm font-bold text-gray-900' },
  { pattern: /font-semibold text-white/g, replacement: 'font-semibold text-gray-900' },
  { pattern: /text-white font-mono/g, replacement: 'text-gray-900 font-mono' },
  { pattern: /text-white flex/g, replacement: 'text-gray-900 flex' },
  { pattern: /text-white select-none/g, replacement: 'text-gray-900 select-none' },
  { pattern: /text-white border/g, replacement: 'text-gray-900 border' },
  { pattern: /text-white rounded/g, replacement: 'text-gray-900 rounded' },
  { pattern: /text-white block/g, replacement: 'text-gray-900 block' },
  { pattern: /text-white tracking-tight/g, replacement: 'text-gray-900 tracking-tight' },
  { pattern: /font-bold text-white/g, replacement: 'font-bold text-gray-900' },
  { pattern: /font-mono text-white/g, replacement: 'font-mono text-gray-900' },
  { pattern: /text-white uppercase/g, replacement: 'text-gray-900 uppercase' },

  { pattern: /divide-white\/5/g, replacement: 'divide-gray-200' },
  { pattern: /border-white\/5/g, replacement: 'border-gray-200' },
  { pattern: /border-white\/10/g, replacement: 'border-gray-200' },
  { pattern: /border-white\/20/g, replacement: 'border-gray-200' },

  { pattern: /shadow-sm\/25/g, replacement: 'shadow-md' },
  { pattern: /shadow-sm\/40/g, replacement: 'shadow-md' },

  { pattern: /hover:bg-white\/\[0\.01\]/g, replacement: 'hover:bg-slate-50/80' },
  { pattern: /hover:bg-white\/5/g, replacement: 'hover:bg-slate-50' }
];

for (const relPath of files) {
  const filePath = path.join(rootDir, relPath);
  if (!fs.existsSync(filePath)) continue;
  let content = fs.readFileSync(filePath, 'utf8');
  let original = content;

  for (const r of replacements) {
    content = content.replace(r.pattern, r.replacement);
  }

  // Restore button text-white manually where it should be white
  // E.g., restore standard orange CTA button text
  content = content.replace(/bg-orange-500 hover:bg-orange-600 text-gray-900/g, 'bg-orange-500 hover:bg-orange-600 text-white');
  content = content.replace(/bg-gradient-to-r from-orange-500 to-orange-600 text-gray-900/g, 'bg-gradient-to-r from-orange-500 to-orange-600 text-white');
  content = content.replace(/bg-red-600 hover:bg-red-700 text-gray-900/g, 'bg-red-600 hover:bg-red-700 text-white');
  content = content.replace(/bg-green-600 hover:bg-green-700 text-gray-900/g, 'bg-green-600 hover:bg-green-700 text-white');

  if (content !== original) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Fixed contrast for:', relPath);
  }
}
process.exit(0);
