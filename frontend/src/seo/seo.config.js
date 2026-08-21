// ============================================================
// seo.config.js — CodeMentees Central SEO Configuration
// ============================================================
// This is the SINGLE SOURCE OF TRUTH for all route SEO data.
//
// HOW TO ADD SEO TO A NEW PAGE:
//   1. Add one entry to SEO_ROUTES below (title, description, keywords, etc.)
//   2. In your page component, use: <SEOHead path="/your-route" />
//
// The Vite build plugin reads this file to:
//   ✅ Pre-render HTML with baked-in meta tags for each route
//   ✅ Auto-generate sitemap.xml (no manual sitemap maintenance needed)
// ============================================================

export const SITE_URL = 'https://codementees.com';
export const SITE_NAME = 'CodeMentees';
export const DEFAULT_OG_IMAGE = '/images/og-default.jpg';
export const TWITTER_HANDLE = '@codementees';

/**
 * SEO_ROUTES — Register every public route here.
 *
 * Fields:
 *   path        {string}   Route path matching App.jsx (e.g. '/about')
 *   title       {string}   <title> tag — aim for 50-60 characters
 *   description {string}   <meta name="description"> — aim for 150-160 characters
 *   keywords    {string}   Comma-separated keywords (still used by some crawlers & Bing)
 *   ogImage     {string}   Path to OG/Twitter share image (defaults to DEFAULT_OG_IMAGE)
 *   jsonLd      {string}   Schema type hint: 'organization' | 'itemlist' | 'faq' | 'article'
 *   noindex     {boolean}  true = noindex,nofollow (auth/utility pages)
 *   changefreq  {string}   Sitemap hint: 'always'|'hourly'|'daily'|'weekly'|'monthly'|'yearly'
 *   priority    {number}   Sitemap priority: 1.0 (homepage) → 0.1 (rarely updated)
 */
export const SEO_ROUTES = [
  // ── Public Marketing Pages ──────────────────────────────────
  {
    path: '/',
    title: 'Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees',
    description:
      'Live 1:1 mentorship in Web Development, DSA & Interview Prep — from engineers at JPMorgan and Freecharge. Join 500+ developers already learning.',
    keywords:
      'coding mentorship, 1:1 mentorship, web development, DSA, data structures algorithms, interview prep, remote coding, job ready, JavaScript, React, online coding',
    ogImage: '/images/home-og.jpg',
    jsonLd: 'organization',
    changefreq: 'weekly',
    priority: 1.0,
  },
  {
    path: '/courses',
    title: 'All Courses | Web Dev, DSA & Interview Prep | CodeMentees',
    description:
      'Explore mentor-led courses in Web Development, Data Structures & Algorithms, and Interview Preparation. Learn from engineers with real production experience.',
    keywords:
      'coding courses, web development course, DSA course, interview prep, MERN stack, JavaScript course, React course, online mentorship, coding classes India',
    jsonLd: 'itemlist',
    changefreq: 'weekly',
    priority: 0.9,
  },
  {
    path: '/live',
    title: 'Live Classes & Recorded Courses | CodeMentees',
    description:
      'Join live 1:1 coding sessions with expert mentors or learn at your own pace with recorded courses. Web Dev, DSA, and Interview Prep — interactive and online.',
    keywords:
      'live coding classes, live mentorship, recorded courses, interactive coding, online DSA class, live web development, real-time coding',
    changefreq: 'daily',
    priority: 0.9,
  },
  {
    path: '/about',
    title: 'About CodeMentees | 1:1 Mentorship by Industry Engineers',
    description:
      'CodeMentees connects early-career developers with mentors from JPMorgan and Freecharge. Build real, hireable skills — not just certificates.',
    keywords:
      'about codementees, coding mentors, industry mentors, JPMorgan engineers, fintech mentorship, developer mentorship, coding platform India',
    jsonLd: 'organization',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/placement-support',
    title: 'Placement Support & Tech Job Opportunities | CodeMentees',
    description:
      'Hand-picked tech job openings updated live for the CodeMentees community. Get placement support and connect with hiring partners.',
    keywords:
      'placement support, tech jobs, developer jobs, coding placement, remote jobs, software engineer jobs, IT placement India',
    changefreq: 'daily',
    priority: 0.8,
  },
  {
    path: '/summer-internships',
    title: 'Summer Training & Internship Programs | CodeMentees',
    description:
      'Apply for 30-60 day summer internship and training programs. Choose from Web Dev, AI, MERN, and 12+ tech stacks. Certificate included.',
    keywords:
      'summer internship, summer training, MERN internship, coding internship, tech internship India, AI internship, web dev internship',
    changefreq: 'monthly',
    priority: 0.8,
  },
  {
    path: '/school-coding',
    title: 'School Coding Programs | K-12 CS Curriculum | CodeMentees',
    description:
      'Comprehensive coding curriculum for K-12 schools. Teach Python, Scratch, and Computer Science fundamentals aligned to global standards.',
    keywords:
      'school coding, K-12 coding, kids coding, coding for schools, school computer science, Python for kids, CS curriculum',
    changefreq: 'monthly',
    priority: 0.7,
  },
  {
    path: '/school-coding/catalog',
    title: 'School Curriculum Catalog | CodeMentees',
    description:
      'Explore the full CodeMentees school coding curriculum catalog. Standards-aligned content for every grade level.',
    keywords:
      'school curriculum, coding catalog, K-12 CS curriculum, coding syllabus',
    changefreq: 'monthly',
    priority: 0.6,
  },
  {
    path: '/blogs',
    title: 'Blog | Coding Guides, DSA Tips & Web Dev Articles | CodeMentees',
    description:
      'Read expert articles on Web Development, DSA, Interview Prep, and career tips from the CodeMentees mentor community.',
    keywords:
      'coding blog, web development articles, DSA tips, interview prep guide, developer career, React tutorials, coding articles',
    changefreq: 'daily',
    priority: 0.7,
  },
  {
    path: '/faq',
    title: 'FAQ | Frequently Asked Questions | CodeMentees',
    description:
      'Find answers to frequently asked questions about CodeMentees courses, mentorship programs, payments, and placement support.',
    keywords:
      'CodeMentees FAQ, coding platform questions, mentorship FAQ, course questions, payment questions',
    jsonLd: 'faq',
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/contact',
    title: 'Contact Us | CodeMentees',
    description:
      'Get in touch with the CodeMentees team for queries about courses, mentorship, placement support, or partnerships.',
    keywords:
      'contact codementees, coding support, mentorship enquiry, partnership',
    changefreq: 'monthly',
    priority: 0.5,
  },

  // ── Auth / Utility Pages (noindex) ──────────────────────────
  {
    path: '/register',
    title: 'Register | Start Your Coding Journey | CodeMentees',
    description: 'Create your free CodeMentees account and start learning from expert mentors.',
    keywords: 'join codementees, register, coding platform, sign up',
    noindex: false,
    changefreq: 'monthly',
    priority: 0.5,
  },
  {
    path: '/login',
    title: 'Login | CodeMentees',
    description: 'Login to your CodeMentees account to access courses and live sessions.',
    noindex: true,
  },
  {
    path: '/verify-otp',
    title: 'Verify Account | CodeMentees',
    description: 'Verify your CodeMentees account with your OTP.',
    noindex: true,
  },
  {
    path: '/forgot-password',
    title: 'Forgot Password | CodeMentees',
    description: 'Reset your CodeMentees account password securely.',
    noindex: true,
  },
];

/**
 * getSEOForPath — Lookup SEO config for a given route path.
 * Falls back to a sensible branded default if the route is not registered.
 *
 * @param {string} path - The route path (e.g. '/about')
 * @returns {object} SEO config object
 */
export function getSEOForPath(path) {
  return (
    SEO_ROUTES.find((r) => r.path === path) ?? {
      title: `${SITE_NAME} — Learn to Code with Expert Mentors`,
      description:
        'CodeMentees offers live 1:1 mentorship in Web Dev, DSA & Interview Prep from engineers at JPMorgan and Freecharge.',
      keywords: 'coding, mentorship, web development, DSA, interview prep',
    }
  );
}

/**
 * getIndexableRoutes — Returns only routes that should appear in sitemap.xml.
 * Excludes noindex pages, dynamic routes (/:id), and admin pages.
 */
export function getIndexableRoutes() {
  return SEO_ROUTES.filter(
    (r) => !r.noindex && !r.path.includes(':')
  );
}
