/**
 * vite-plugin-html-per-route.js
 *
 * Custom Vite plugin that pre-renders per-route HTML files at build time.
 *
 * What it does during `npm run build`:
 *   1. Reads the built `dist/index.html` (SPA shell)
 *   2. For each indexable route in src/seo/seo.config.js:
 *      - Creates `dist/<route>/index.html`
 *      - Injects <title>, <meta name="description">, <meta name="keywords">,
 *        <link rel="canonical">, <meta name="robots">, OG tags, and JSON-LD
 *        into <head> — all BEFORE JavaScript runs
 *   3. Auto-generates `dist/sitemap.xml` from the same route config
 *
 * Why: Googlebot sees real content on first HTTP response.
 * The React SPA hydrates normally for interactive users.
 */

import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

// ─── Inline route config (mirrors src/seo/seo.config.js) ────────────────────
// We duplicate the data here because Vite plugins run in Node.js context
// during build, before the React source is compiled/importable.
const SITE_URL = 'https://codementees.com';
const SITE_NAME = 'CodeMentees';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/og-default.jpg`;
const TWITTER_HANDLE = '@codementees';

const SEO_ROUTES = [
  {
    path: '/',
    title: 'Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees',
    description: 'Live 1:1 mentorship in Web Development, DSA & Interview Prep — from engineers at JPMorgan and Freecharge. Join 500+ developers already learning.',
    keywords: 'coding mentorship, 1:1 mentorship, web development, DSA, data structures algorithms, interview prep, remote coding, job ready, JavaScript, React, online coding',
    ogImage: `${SITE_URL}/images/home-og.jpg`,
    jsonLdType: 'organization',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/courses',
    title: 'All Courses | Web Dev, DSA & Interview Prep | CodeMentees',
    description: 'Explore mentor-led courses in Web Development, Data Structures & Algorithms, and Interview Preparation. Learn from engineers with real production experience.',
    keywords: 'coding courses, web development course, DSA course, interview prep, MERN stack, JavaScript course, React course, online mentorship, coding classes India',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/live',
    title: 'Live Classes & Recorded Courses | CodeMentees',
    description: 'Join live 1:1 coding sessions with expert mentors or learn at your own pace with recorded courses. Web Dev, DSA, and Interview Prep — interactive and online.',
    keywords: 'live coding classes, live mentorship, recorded courses, interactive coding, online DSA class, live web development, real-time coding',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/about',
    title: 'About CodeMentees | 1:1 Mentorship by Industry Engineers',
    description: 'CodeMentees connects early-career developers with mentors from JPMorgan and Freecharge. Build real, hireable skills — not just certificates.',
    keywords: 'about codementees, coding mentors, industry mentors, JPMorgan engineers, fintech mentorship, developer mentorship, coding platform India',
    jsonLdType: 'organization',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/placement-support',
    title: 'Placement Support & Tech Job Opportunities | CodeMentees',
    description: 'Hand-picked tech job openings updated live for the CodeMentees community. Get placement support and connect with hiring partners.',
    keywords: 'placement support, tech jobs, developer jobs, coding placement, remote jobs, software engineer jobs, IT placement India',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    path: '/summer-internships',
    title: 'Summer Training & Internship Programs | CodeMentees',
    description: 'Apply for 30-60 day summer internship and training programs. Choose from Web Dev, AI, MERN, and 12+ tech stacks. Certificate included.',
    keywords: 'summer internship, summer training, MERN internship, coding internship, tech internship India, AI internship, web dev internship',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/school-coding',
    title: 'School Coding Programs | K-12 CS Curriculum | CodeMentees',
    description: 'Comprehensive coding curriculum for K-12 schools. Teach Python, Scratch, and Computer Science fundamentals aligned to global standards.',
    keywords: 'school coding, K-12 coding, kids coding, coding for schools, school computer science, Python for kids, CS curriculum',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/school-coding/catalog',
    title: 'School Curriculum Catalog | CodeMentees',
    description: 'Explore the full CodeMentees school coding curriculum catalog. Standards-aligned content for every grade level.',
    keywords: 'school curriculum, coding catalog, K-12 CS curriculum, coding syllabus',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/blogs',
    title: 'Blog | Coding Guides, DSA Tips & Web Dev Articles | CodeMentees',
    description: 'Read expert articles on Web Development, DSA, Interview Prep, and career tips from the CodeMentees mentor community.',
    keywords: 'coding blog, web development articles, DSA tips, interview prep guide, developer career, React tutorials, coding articles',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    path: '/faq',
    title: 'FAQ | Frequently Asked Questions | CodeMentees',
    description: 'Find answers to frequently asked questions about CodeMentees courses, mentorship programs, payments, and placement support.',
    keywords: 'CodeMentees FAQ, coding platform questions, mentorship FAQ, course questions, payment questions',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/contact',
    title: 'Contact Us | CodeMentees',
    description: 'Get in touch with the CodeMentees team for queries about courses, mentorship, placement support, or partnerships.',
    keywords: 'contact codementees, coding support, mentorship enquiry, partnership',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/register',
    title: 'Register | Start Your Coding Journey | CodeMentees',
    description: 'Create your free CodeMentees account and start learning from expert mentors.',
    keywords: 'join codementees, register, coding platform, sign up',
    noindex: false,
    changefreq: 'monthly',
    priority: 0.5,
  },
];

// ─── JSON-LD Generators ──────────────────────────────────────────────────────

function buildOrganizationJsonLd() {
  return JSON.stringify({
    '@context': 'https://schema.org',
    '@type': ['EducationalOrganization', 'Organization'],
    name: SITE_NAME,
    url: SITE_URL,
    logo: `${SITE_URL}/logo.png`,
    description:
      'Live 1:1 mentorship in Web Development, DSA & Interview Prep from engineers at JPMorgan and Freecharge.',
    foundingDate: '2023',
    areaServed: 'Worldwide',
    sameAs: [
      'https://www.facebook.com/codementees',
      'https://twitter.com/codementees',
      'https://www.linkedin.com/company/codementees',
    ],
    aggregateRating: {
      '@type': 'AggregateRating',
      ratingValue: '4.8',
      reviewCount: '100',
      bestRating: '5',
    },
  }, null, 2);
}

// ─── Inject meta into HTML ───────────────────────────────────────────────────

function buildMetaBlock(route) {
  const canonical = route.path === '/'
    ? SITE_URL + '/'
    : `${SITE_URL}${route.path}`;
  const ogImage = route.ogImage ?? DEFAULT_OG_IMAGE;
  const robots = route.noindex ? 'noindex, nofollow' : 'index, follow';

  let jsonLdScript = '';
  if (route.jsonLdType === 'organization') {
    jsonLdScript = `\n  <script type="application/ld+json">\n  ${buildOrganizationJsonLd()}\n  </script>`;
  }

  return `
  <!-- Pre-rendered SEO: ${route.path} -->
  <title>${route.title}</title>
  <meta name="description" content="${route.description}" />
  <meta name="keywords" content="${route.keywords ?? ''}" />
  <link rel="canonical" href="${canonical}" />
  <meta name="robots" content="${robots}" />
  <meta property="og:site_name" content="${SITE_NAME}" />
  <meta property="og:locale" content="en_US" />
  <meta property="og:type" content="website" />
  <meta property="og:url" content="${canonical}" />
  <meta property="og:title" content="${route.title}" />
  <meta property="og:description" content="${route.description}" />
  <meta property="og:image" content="${ogImage}" />
  <meta property="og:image:width" content="1200" />
  <meta property="og:image:height" content="630" />
  <meta name="twitter:card" content="summary_large_image" />
  <meta name="twitter:site" content="${TWITTER_HANDLE}" />
  <meta name="twitter:title" content="${route.title}" />
  <meta name="twitter:description" content="${route.description}" />
  <meta name="twitter:image" content="${ogImage}" />${jsonLdScript}`;
}

function injectMetaIntoHtml(html, route) {
  const metaBlock = buildMetaBlock(route);

  // Remove existing generic <title> tag from the SPA shell
  let result = html.replace(/<title>[^<]*<\/title>/, '');

  // Remove existing generic <meta name="description"> if present
  result = result.replace(/<meta\s+name="description"[^>]*>/gi, '');

  // Inject our pre-rendered meta block right after <head>
  result = result.replace('<head>', `<head>${metaBlock}`);

  return result;
}

// ─── Sitemap Generator ───────────────────────────────────────────────────────

function buildSitemap() {
  const today = new Date().toISOString().split('T')[0];
  const indexableRoutes = SEO_ROUTES.filter(
    (r) => !r.noindex && !r.path.includes(':')
  );

  const urlEntries = indexableRoutes
    .map(
      (r) => `
  <url>
    <loc>${SITE_URL}${r.path === '/' ? '' : r.path}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq ?? 'monthly'}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>
  </url>`
    )
    .join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${urlEntries}
</urlset>`;
}

// ─── Vite Plugin ─────────────────────────────────────────────────────────────

export default function htmlPerRoutePlugin() {
  return {
    name: 'vite-plugin-html-per-route',
    apply: 'build',

    closeBundle() {
      const distDir = path.resolve(__dirname, 'dist');
      const indexHtmlPath = path.join(distDir, 'index.html');

      if (!fs.existsSync(indexHtmlPath)) {
        console.warn('[seo-plugin] dist/index.html not found — skipping pre-render.');
        return;
      }

      const baseHtml = fs.readFileSync(indexHtmlPath, 'utf-8');

      // 1. Inject into root index.html (homepage)
      const homepageRoute = SEO_ROUTES.find((r) => r.path === '/');
      if (homepageRoute) {
        const homeHtml = injectMetaIntoHtml(baseHtml, homepageRoute);
        fs.writeFileSync(indexHtmlPath, homeHtml);
        console.log(`[seo-plugin] ✅ Injected SEO → dist/index.html (/)`);
      }

      // 2. Generate per-route HTML files
      const subRoutes = SEO_ROUTES.filter(
        (r) => r.path !== '/' && !r.path.includes(':')
      );

      for (const route of subRoutes) {
        const routeHtml = injectMetaIntoHtml(baseHtml, route);
        const routeDir = path.join(distDir, route.path);

        fs.mkdirSync(routeDir, { recursive: true });
        fs.writeFileSync(path.join(routeDir, 'index.html'), routeHtml);
        console.log(`[seo-plugin] ✅ Pre-rendered → dist${route.path}/index.html`);
      }

      // 3. Auto-generate sitemap.xml
      const sitemapContent = buildSitemap();
      fs.writeFileSync(path.join(distDir, 'sitemap.xml'), sitemapContent);
      console.log(`[seo-plugin] ✅ Generated → dist/sitemap.xml (${SEO_ROUTES.filter(r => !r.noindex).length} URLs)`);

      console.log('[seo-plugin] 🎉 Pre-rendering complete.');
    },
  };
}
