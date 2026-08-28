import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
import puppeteer from 'puppeteer';
import handler from 'serve-handler';
import http from 'http';
import https from 'https';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const distDir = path.resolve(__dirname, '../dist');

// Define API URL
const BACKEND_URL = process.env.VITE_API_URL || 'http://localhost:5000';
const BACKEND_HOST = new URL(BACKEND_URL).host;

// The static SEO routes we want to pre-render
const staticRoutesToPrerender = [
  '/',
  '/courses',
  '/live',
  '/about',
  '/placement-support',
  '/summer-internships',
  '/school-coding',
  '/school-coding/catalog',
  '/blogs',
  '/faq',
  '/contact',
  '/register'
];

async function fetchDynamicRoutes() {
  const dynamicRoutes = [];
  try {
    const courseRes = await fetch(`${BACKEND_URL}/api/courses`);
    if (courseRes.ok) {
      const parsed = await courseRes.json();
      const courses = parsed.courses || parsed.data || parsed || [];
      if (Array.isArray(courses)) {
        courses.forEach(c => {
          if (c.slug) dynamicRoutes.push(`/courses/${c.slug}`);
          else if (c._id) dynamicRoutes.push(`/courses/${c._id}`);
        });
      }
    }
  } catch (e) {
    console.error("⚠️ Failed to fetch courses for prerendering. Ensure backend is running.", e.message);
  }

  try {
    const postRes = await fetch(`${BACKEND_URL}/api/posts`);
    if (postRes.ok) {
      const parsed = await postRes.json();
      const posts = parsed.posts || parsed.blogs || parsed.data || parsed || [];
      if (Array.isArray(posts)) {
        posts.forEach(p => {
          if (p.slug) dynamicRoutes.push(`/blogs/${p.slug}`);
          else if (p._id) dynamicRoutes.push(`/blogs/${p._id}`);
        });
      }
    }
  } catch (e) {
    console.error("⚠️ Failed to fetch blogs for prerendering. Ensure backend is running.", e.message);
  }

  return dynamicRoutes;
}

// Proxy utility
const proxyRequest = (req, res) => {
  const url = new URL(req.url, BACKEND_URL);
  const options = {
    hostname: url.hostname,
    port: url.port,
    path: url.pathname + url.search,
    method: req.method,
    headers: { ...req.headers, host: BACKEND_HOST }
  };
  const protocol = url.protocol === 'https:' ? https : http;
  const proxyReq = protocol.request(options, (proxyRes) => {
    res.writeHead(proxyRes.statusCode, proxyRes.headers);
    proxyRes.pipe(res, { end: true });
  });
  req.pipe(proxyReq, { end: true });
  proxyReq.on('error', (e) => {
    console.error(`Proxy error for ${req.url}: ${e.message}`);
    if (!res.headersSent) {
      res.writeHead(500);
      res.end();
    }
  });
};

async function prerender() {
  console.log('🚀 Starting pre-rendering process...');
  console.log(`🔗 Targeting API: ${BACKEND_URL}`);

  const dynamicRoutes = await fetchDynamicRoutes();
  const routesToPrerender = [...new Set([...staticRoutesToPrerender, ...dynamicRoutes])];
  console.log(`📝 Total routes to prerender: ${routesToPrerender.length}`);

  // Start a local static server for the 'dist' directory
  const server = http.createServer((request, response) => {
    if (request.url.startsWith('/api')) {
      return proxyRequest(request, response);
    }
    return handler(request, response, {
      public: distDir,
      rewrites: [{ source: '**', destination: '/index.html' }] // SPA fallback
    });
  });

  await new Promise((resolve) => server.listen(3000, resolve));
  console.log('🌍 Local static server started on port 3000');

  // Launch Puppeteer
  const browser = await puppeteer.launch({
    headless: 'new',
    args: ['--no-sandbox', '--disable-setuid-sandbox'],
  });

  const page = await browser.newPage();
  
  // Disable irrelevant requests to speed up rendering
  await page.setRequestInterception(true);
  page.on('request', (req) => {
    const resourceType = req.resourceType();
    if (['image', 'font', 'media'].includes(resourceType)) {
      req.abort();
    } else {
      req.continue();
    }
  });

  page.on('pageerror', err => {
    console.error('PAGE ERROR:', err.message);
  });
  
  page.on('console', msg => {
    if (msg.type() === 'error') {
      console.error('PAGE CONSOLE ERROR:', msg.text());
    }
  });

  const sitemapUrls = [];
  const today = new Date().toISOString().split('T')[0];

  for (const route of routesToPrerender) {
    const url = `http://localhost:3000${route}`;
    console.log(`⏳ Pre-rendering ${route}...`);

    try {
      await page.goto(url, { waitUntil: 'networkidle0', timeout: 30000 });
      
      // Give React an extra second to ensure async data (like Redux/Helmet) is fully populated
      await new Promise((resolve) => setTimeout(resolve, 1000));

      const html = await page.content();
      
      const routeDir = path.join(distDir, route);
      if (route !== '/') {
        fs.mkdirSync(routeDir, { recursive: true });
      }
      
      const filePath = route === '/' ? path.join(distDir, 'index.html') : path.join(routeDir, 'index.html');
      fs.writeFileSync(filePath, html);
      
      sitemapUrls.push(`
  <url>
    <loc>https://codementees.com${route === '/' ? '' : route}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>${route === '/' ? '1.0' : '0.8'}</priority>
  </url>`);
      
      console.log(`✅ Successfully pre-rendered ${route}`);
    } catch (error) {
      console.error(`❌ Failed to pre-render ${route}:`, error);
    }
  }

  // Generate sitemap.xml
  const sitemapContent = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${sitemapUrls.join('')}
</urlset>`;
  fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
  console.log(`✅ Generated sitemap.xml with ${routesToPrerender.length} URLs`);

  // Cleanup
  await browser.close();
  server.close();
  console.log('🎉 Pre-rendering complete!');
  process.exit(0);
}

prerender();
