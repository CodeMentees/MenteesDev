const fs = require('fs');

let content = fs.readFileSync('src/App.jsx', 'utf8');

// Replace the HelmetWrapper definition
content = content.replace(
  /const HelmetWrapper = \(\{[\s\S]*?\}\) => \{[\s\S]*?<\/>\s*\);\s*};\s*/,
  `import SEOHead from './seo/SEOHead';\n\nconst SEOHeadWrapper = ({ path, noindex, title, children }) => (\n  <>\n    <SEOHead path={path} noindex={noindex} title={title} />\n    {children}\n  </>\n);\n\n`
);

// Replace all `<HelmetWrapper ...>` calls with `<SEOHeadWrapper path="...">`
// We need to extract the `canonical` or `path` if it exists.
content = content.replace(/<HelmetWrapper\s+([^>]*?)>/g, (match, p1) => {
  let path = '/';
  let noindex = false;
  let title = '';

  const canonicalMatch = p1.match(/canonical="([^"]+)"/);
  if (canonicalMatch) path = canonicalMatch[1];
  
  const noindexMatch = p1.match(/noindex=\{true\}/);
  if (noindexMatch) noindex = true;

  const nofollowMatch = p1.match(/nofollow=\{true\}/);
  if (nofollowMatch) noindex = true; // combine them

  const titleMatch = p1.match(/title="([^"]+)"|title=\{([^}]+)\}/);
  if (titleMatch) {
    if (titleMatch[1]) title = `"${titleMatch[1]}"`;
    else title = `{${titleMatch[2]}}`;
  }

  // If it's an admin route or error route without canonical, we use title
  if (!canonicalMatch) {
    return `<SEOHeadWrapper noindex={${noindex}} title=${title || '""'}>`;
  }

  return `<SEOHeadWrapper path="${path}" noindex={${noindex}}>`;
});

// Replace closing tags
content = content.replace(/<\/HelmetWrapper>/g, '</SEOHeadWrapper>');

// Fix import of Helmet (remove it)
content = content.replace(/import \{ Helmet \} from 'react-helmet';\n/, '');

fs.writeFileSync('src/App.jsx', content);
console.log('App.jsx refactored successfully.');
