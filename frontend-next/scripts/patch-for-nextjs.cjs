// Script to patch all React Router imports and add 'use client' directives
// Run with: node scripts/patch-for-nextjs.cjs

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

const SRC_DIR = path.join(__dirname, '..', 'src');

function getAllJSXFiles(dir) {
  const results = [];
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const fullPath = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      results.push(...getAllJSXFiles(fullPath));
    } else if (/\.(jsx?|tsx?)$/.test(entry.name)) {
      results.push(fullPath);
    }
  }
  return results;
}

function patchFile(filePath) {
  let content = fs.readFileSync(filePath, 'utf8');
  let modified = false;

  // 1. Replace react-router-dom imports with next/navigation equivalents
  //    Handle: import { Link, useNavigate, useLocation, useParams, Navigate, useNavigationType } from 'react-router-dom'
  const routerImportRegex = /import\s*\{([^}]+)\}\s*from\s*['"]react-router-dom['"]/g;
  
  content = content.replace(routerImportRegex, (match, imports) => {
    modified = true;
    const items = imports.split(',').map(s => s.trim()).filter(Boolean);
    
    const nextNavItems = [];
    const nextLinkItems = [];
    const skipped = [];

    for (const item of items) {
      const clean = item.replace(/\s+as\s+\w+/, '').trim();
      if (['useNavigate', 'useLocation', 'useParams', 'Navigate', 'useNavigationType', 'useSearchParams'].includes(clean)) {
        nextNavItems.push(item);
      } else if (clean === 'Link') {
        nextLinkItems.push(item);
      } else if (['BrowserRouter', 'Router', 'Routes', 'Route', 'Outlet'].includes(clean)) {
        // These are removed (handled by Next.js file-system routing)
        skipped.push(item);
      } else {
        // Unknown — keep a note
        skipped.push(item);
      }
    }

    let replacement = '';
    if (nextNavItems.length > 0) {
      // Map Navigate → redirect doesn't apply cleanly, keep as useRouter approach
      // Map useNavigate → useRouter, useLocation → usePathname, useNavigationType → (removed)
      const mappedItems = nextNavItems.map(item => {
        const clean = item.trim();
        if (clean === 'useNavigate') return 'useRouter';
        if (clean === 'useLocation') return 'usePathname';
        if (clean === 'Navigate') return '// Navigate removed - use router.replace()';
        if (clean === 'useNavigationType') return '// useNavigationType removed';
        if (clean === 'useSearchParams') return 'useSearchParams';
        return clean;
      }).filter(s => !s.startsWith('//'));
      
      if (mappedItems.length > 0) {
        replacement += `import { ${mappedItems.join(', ')} } from 'next/navigation';\n`;
      }
    }
    if (nextLinkItems.length > 0) {
      replacement += `import Link from 'next/link';`;
    }
    if (skipped.length > 0 && nextNavItems.length === 0 && nextLinkItems.length === 0) {
      // Nothing useful mapped — keep as comment
      replacement = `// NOTE: react-router-dom import removed: ${skipped.join(', ')}`;
    }
    
    return replacement || `// react-router-dom import removed`;
  });

  // 2. Replace <Link to="..."> with <Link href="...">
  content = content.replace(/<Link\s+to=/g, '<Link href=');
  if (content.includes('<Link href=')) modified = true;

  // 3. Replace navigate(...) with router.push(...)  (simple cases)
  //    and replace const navigate = useNavigate() with const router = useRouter()
  if (content.includes('useNavigate') || content.includes('useRouter')) {
    content = content.replace(/const navigate = useNavigate\(\)/g, 'const router = useRouter()');
    content = content.replace(/\bnavigate\(/g, 'router.push(');
    modified = true;
  }

  // 4. Replace useLocation().pathname with usePathname()
  content = content.replace(/const\s+location\s*=\s*useLocation\(\)/g, 'const pathname = usePathname()');
  content = content.replace(/location\.pathname/g, 'pathname');
  if (content.includes('usePathname')) modified = true;

  // 5. Add 'use client' to files that use hooks or browser APIs (if not already present)
  const needsUseClient = [
    'useState', 'useEffect', 'useRef', 'useCallback', 'useMemo', 'useContext',
    'useSelector', 'useDispatch', 'useRouter', 'usePathname', 'useParams', 'useSearchParams',
    'onClick', 'onChange', 'onSubmit', 'localStorage', 'sessionStorage', 'window.', 'document.',
    'framer-motion', 'aos', 'socket.io'
  ];
  
  const needsClient = needsUseClient.some(pattern => content.includes(pattern));
  if (needsClient && !content.startsWith("'use client'") && !content.startsWith('"use client"')) {
    content = "'use client';\n\n" + content;
    modified = true;
  }

  if (modified) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log('Patched:', path.relative(SRC_DIR, filePath));
  }
}

const files = getAllJSXFiles(SRC_DIR);
console.log(`Found ${files.length} JS/JSX files to process...`);
files.forEach(patchFile);
console.log('Done! All files patched.');
