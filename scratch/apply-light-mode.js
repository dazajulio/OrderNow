const fs = require('fs');
const path = require('path');

const rootDir = path.resolve(__dirname, '..');
const targets = [
  'src/app/(super-admin)/admin',
  'src/app/[slug]/gerente',
  'src/app/[slug]/cocina',
  'src/app/[slug]',
  'src/modules'
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
        // Exclude root page.tsx and root layout.tsx (landing page exceptions)
        const relPath = path.relative(rootDir, fullPath);
        if (relPath === 'src\\app\\page.tsx' || relPath === 'src\\app\\layout.tsx') {
          continue;
        }
        filesList.push(fullPath);
      }
    }
  }
}

for (const target of targets) {
  scan(path.join(rootDir, target));
}

console.log(`Found ${filesList.length} files to refactor.`);

// Replacements configuration
const replacements = [
  // 1. Purge all dark: modifiers
  { pattern: /\bdark:[a-zA-Z0-9-/:_#\\[\]]+/g, replacement: '' },

  // 2. Base Backgrounds: Main layout / outer wrappers to slate-50/gray-50
  { pattern: /bg-\[#0A0A0B\]/gi, replacement: 'bg-slate-50' },
  { pattern: /bg-\[#0B0C10\]/gi, replacement: 'bg-slate-50' },
  { pattern: /bg-\[#0b0c10\]/gi, replacement: 'bg-slate-50' },
  { pattern: /bg-\[#090a0f\]/gi, replacement: 'bg-slate-100' },
  { pattern: /bg-\[#16171d\]/gi, replacement: 'bg-white shadow-sm' },
  { pattern: /bg-zinc-950/g, replacement: 'bg-slate-50' },
  { pattern: /bg-zinc-900\/80/g, replacement: 'bg-white/80' },
  { pattern: /bg-zinc-900\/50/g, replacement: 'bg-white/50' },
  { pattern: /bg-zinc-900\/60/g, replacement: 'bg-white/60' },
  { pattern: /bg-zinc-950\/50/g, replacement: 'bg-white/50' },
  { pattern: /bg-zinc-950\/90/g, replacement: 'bg-white/90' },
  { pattern: /bg-zinc-900/g, replacement: 'bg-white shadow-sm' },

  // 3. Card/Container backgrounds: to white or slate-100 (for inner/secondary items)
  { pattern: /bg-zinc-850/g, replacement: 'bg-slate-100' },
  { pattern: /bg-zinc-800\/50/g, replacement: 'bg-slate-50' },
  { pattern: /bg-zinc-800\/60/g, replacement: 'bg-slate-50' },
  { pattern: /bg-zinc-800\/40/g, replacement: 'bg-slate-50' },
  { pattern: /bg-zinc-800/g, replacement: 'bg-slate-100' },
  { pattern: /bg-white\/5/g, replacement: 'bg-slate-50' },
  { pattern: /bg-white\/10/g, replacement: 'bg-slate-100' },
  { pattern: /bg-black/g, replacement: 'bg-white' },

  // 4. Divisores y Bordes to gray-200
  { pattern: /border-zinc-800\/60/g, replacement: 'border-gray-200' },
  { pattern: /border-zinc-800\/40/g, replacement: 'border-gray-200' },
  { pattern: /border-zinc-700\/50/g, replacement: 'border-gray-200' },
  { pattern: /border-zinc-800/g, replacement: 'border-gray-200' },
  { pattern: /border-zinc-700/g, replacement: 'border-gray-200' },
  { pattern: /border-white\/5/g, replacement: 'border-gray-200' },
  { pattern: /border-white\/10/g, replacement: 'border-gray-200' },
  { pattern: /border-white\/20/g, replacement: 'border-gray-200' },
  { pattern: /divide-zinc-800/g, replacement: 'divide-gray-200' },
  { pattern: /divide-zinc-700/g, replacement: 'divide-gray-200' },
  { pattern: /border-zinc-900/g, replacement: 'border-gray-200' },

  // 5. Typography: Dark texts on Light backgrounds
  { pattern: /text-zinc-100/g, replacement: 'text-gray-900' },
  { pattern: /text-zinc-200/g, replacement: 'text-gray-900' },
  { pattern: /text-zinc-300/g, replacement: 'text-gray-800' },
  { pattern: /text-zinc-400/g, replacement: 'text-gray-500' },
  { pattern: /text-zinc-500/g, replacement: 'text-gray-400' },
  { pattern: /text-zinc-600/g, replacement: 'text-gray-600' },

  { pattern: /text-slate-100/g, replacement: 'text-gray-900' },
  { pattern: /text-slate-200/g, replacement: 'text-gray-900' },
  { pattern: /text-slate-300/g, replacement: 'text-gray-700' },
  { pattern: /text-slate-400/g, replacement: 'text-gray-500' },
  { pattern: /text-slate-500/g, replacement: 'text-gray-400' },

  // 6. Admin Panel: Purple to Orange Brand Unification
  { pattern: /text-purple-400/g, replacement: 'text-orange-500' },
  { pattern: /text-purple-300/g, replacement: 'text-orange-400' },
  { pattern: /bg-purple-500\/10/g, replacement: 'bg-orange-500/10' },
  { pattern: /bg-purple-500\/20/g, replacement: 'bg-orange-500/20' },
  { pattern: /from-purple-500/g, replacement: 'from-orange-500' },
  { pattern: /to-cyan-500/g, replacement: 'to-orange-600' },
  { pattern: /border-purple-500/g, replacement: 'border-orange-500' },
  { pattern: /text-purple-500/g, replacement: 'text-orange-500' },
  { pattern: /bg-purple-600/g, replacement: 'bg-orange-500' },
  { pattern: /hover:bg-purple-700/g, replacement: 'hover:bg-orange-600' },
  { pattern: /bg-purple-500/g, replacement: 'bg-orange-500' },
  { pattern: /text-purple-600/g, replacement: 'text-orange-600' },
  { pattern: /text-purple-300/g, replacement: 'text-orange-300' }
];

let modifiedCount = 0;

for (const filePath of filesList) {
  let content = fs.readFileSync(filePath, 'utf8');
  let originalContent = content;

  for (const r of replacements) {
    content = content.replace(r.pattern, r.replacement);
  }

  // Selective layout text-white title cleanup (without affecting standard buttons/badges text-white)
  // We change 'text-white' to 'text-gray-900' only when paired with headers or labels on layouts
  content = content.replace(/className="text-xl font-bold tracking-tight text-white/g, 'className="text-xl font-bold tracking-tight text-gray-900');
  content = content.replace(/className="text-lg font-semibold text-white/g, 'className="text-lg font-semibold text-gray-900');
  content = content.replace(/className="text-2xl font-bold text-white/g, 'className="text-2xl font-bold text-gray-900');
  content = content.replace(/className="text-3xl font-bold text-white/g, 'className="text-3xl font-bold text-gray-900');
  content = content.replace(/text-white font-bold text-lg/g, 'text-gray-900 font-bold text-lg');
  content = content.replace(/text-white font-extrabold/g, 'text-gray-950 font-extrabold');

  if (content !== originalContent) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`Refactored: ${path.relative(rootDir, filePath)}`);
    modifiedCount++;
  }
}

console.log(`Finished. Refactored ${modifiedCount} files.`);
process.exit(0);
