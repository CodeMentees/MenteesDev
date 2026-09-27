# CodeMentees SEO System — Developer Guide

All SEO for this project flows through three files in this folder:

```
src/seo/
├── seo.config.js      ← Single source of truth: route titles, descriptions, keywords
├── SEOHead.jsx        ← Universal SEO component — drop into any page
├── useDynamicSEO.js   ← Hook for pages with API-driven content (courses, blogs)
└── README.md          ← You are here
```

---

## Adding SEO to a New Page (2 Steps)

### Step 1 — Register the route in `seo.config.js`

Open [`seo.config.js`](./seo.config.js) and add an entry to `SEO_ROUTES`:

```js
{
  path: '/my-new-page',

  // Title: 50-60 characters ideal
  title: 'My New Page | CodeMentees',

  // Description: 150-160 characters ideal
  description: 'A clear description of what this page contains, written for humans.',

  // Keywords: comma-separated (used by Bing + some crawlers, low weight in Google)
  keywords: 'keyword one, keyword two, keyword three',

  // Sitemap settings
  changefreq: 'monthly',   // how often this page changes
  priority: 0.7,           // 1.0 = homepage, 0.5 = average, 0.1 = rarely changes
}
```

This automatically:
- ✅ Pre-bakes `<title>` and `<meta>` into the HTML at build time (searchable by crawlers)
- ✅ Adds the URL to `sitemap.xml` at next build (no manual sitemap edit needed)
- ✅ Sets up canonical URL

### Step 2 — Add `<SEOHead>` to your page component

```jsx
import SEOHead from '../seo/SEOHead';

function MyNewPage() {
  return (
    <div>
      <SEOHead path="/my-new-page" />
      {/* rest of your page */}
    </div>
  );
}
```

**That's it.** Full SEO in 2 steps.

---

## Dynamic Pages (Content from API)

For pages whose title/description come from an API call (e.g., course detail, blog post):

```jsx
import SEOHead from '../seo/SEOHead';
import { useDynamicSEO } from '../seo/useDynamicSEO';

function CourseDetails() {
  const [course, setCourse] = useState(null);

  // Generates title, description, keywords, AND JSON-LD from the course object
  const seoProps = useDynamicSEO('course', course);

  return (
    <div>
      <SEOHead path="/courses/:courseId" {...seoProps} />
      {/* rest of your page */}
    </div>
  );
}
```

**Supported dynamic types:**

| Type | Use for |
|------|---------|
| `'course'` | Individual course detail pages |
| `'blog'` | Individual blog post pages |
| `'liveCourse'` | Live/recorded course detail pages |

> While `data` is `null` (loading), `useDynamicSEO` returns `{}` and `SEOHead` falls back to the static config defaults — so there's always something in the `<head>`.

---

## Admin / Utility Pages (noindex)

For pages that must NOT appear in search results:

```js
// In seo.config.js:
{ path: '/my-admin-page', title: 'Admin | CodeMentees', description: '...', noindex: true }
```

Or override inline in the component:
```jsx
<SEOHead path="/my-admin-page" noindex={true} />
```

---

## Adding a Custom OG Image

Each page can have its own social share image (used for link previews on Facebook, Twitter, LinkedIn):

1. Place the image in `public/images/` (1200×630px recommended)
2. Add `ogImage: '/images/my-page-og.jpg'` to the route entry in `seo.config.js`

---

## All `SEOHead` Props Reference

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `path` | string | `'/'` | Route path — used to load config defaults |
| `title` | string | from config | Override page title |
| `description` | string | from config | Override meta description |
| `keywords` | string | from config | Override keywords (comma-separated) |
| `canonical` | string | derived from path | Override full canonical URL |
| `ogImage` | string | from config | Override OG image path |
| `ogType` | string | `'website'` | OG type: `'website'` or `'article'` |
| `noindex` | boolean | from config | Block page from search engines |
| `jsonLd` | object/array | — | Raw JSON-LD structured data object(s) |

---

## SEO Checklist for Every New Page

Before merging a new page, verify:

- [ ] Entry added to `SEO_ROUTES` in `seo.config.js`
- [ ] Title is 50-60 characters
- [ ] Description is 150-160 characters
- [ ] At least 5-8 relevant keywords listed
- [ ] Page has exactly **one** `<h1>` tag
- [ ] All `<img>` tags have descriptive `alt` attributes
- [ ] `<SEOHead path="...">` is rendered inside the component
- [ ] Admin/utility pages have `noindex: true`
- [ ] For dynamic pages, `useDynamicSEO` is used to build props from API data

---

## How the Pre-Rendering Works

At build time (`npm run build`), the Vite plugin (`vite-plugin-html-per-route.js`) reads `SEO_ROUTES` and:

1. Takes `dist/index.html` (the compiled SPA shell)
2. For each indexable route, creates `dist/<route>/index.html`
3. Injects `<title>`, `<meta>`, `<canonical>`, and JSON-LD into `<head>`

Result: Googlebot gets real HTML content on first request. The React SPA then hydrates normally for users.
