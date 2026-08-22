/**
 * SEOHead.jsx — Universal SEO Component for CodeMentees
 *
 * Drop this into any page to get full SEO: title, description, keywords,
 * canonical, Open Graph, Twitter Card, robots, and JSON-LD.
 *
 * ─── USAGE ───────────────────────────────────────────────────────────────
 *
 * Static page (config auto-loaded from seo.config.js):
 *   <SEOHead path="/about" />
 *
 * Dynamic page (API-driven title/description):
 *   const seoProps = useDynamicSEO('course', course);
 *   <SEOHead path="/courses/:courseId" {...seoProps} />
 *
 * Admin / utility page (no-index):
 *   <SEOHead path="/admin" noindex />
 *
 * ─── PROPS ───────────────────────────────────────────────────────────────
 *   path        {string}   Route path — used to look up defaults from seo.config.js
 *   title       {string}   Override title (optional)
 *   description {string}   Override description (optional)
 *   keywords    {string}   Override or add keywords (optional)
 *   canonical   {string}   Override full canonical URL (optional)
 *   ogImage     {string}   Override OG image path, e.g. '/images/course.jpg' (optional)
 *   ogType      {string}   OG type: 'website' | 'article' — default: 'website'
 *   noindex     {boolean}  true = noindex,nofollow (optional)
 *   jsonLd      {object|object[]} Raw JSON-LD to inject as structured data (optional)
 * ─────────────────────────────────────────────────────────────────────────
 */

import React from 'react';
import { Helmet } from 'react-helmet-async';
import {
  getSEOForPath,
  SITE_URL,
  SITE_NAME,
  DEFAULT_OG_IMAGE,
  TWITTER_HANDLE,
} from './seo.config';

export default function SEOHead({
  path = '/',
  title: titleOverride,
  description: descOverride,
  keywords: keywordsOverride,
  canonical: canonicalOverride,
  ogImage: ogImageOverride,
  ogType = 'website',
  noindex: noindexOverride,
  jsonLd: jsonLdOverride,
}) {
  // Load defaults from config; allow any prop to override
  const config = getSEOForPath(path);

  const title       = titleOverride    ?? config.title       ?? SITE_NAME;
  const description = descOverride     ?? config.description ?? '';
  const keywords    = keywordsOverride ?? config.keywords    ?? '';
  const ogImage     = ogImageOverride  ?? config.ogImage     ?? DEFAULT_OG_IMAGE;
  const noindex     = noindexOverride  ?? config.noindex     ?? false;
  const robots      = noindex ? 'noindex, nofollow' : 'index, follow';

  // Build canonical — prefer explicit override, then derive from path
  const canonical =
    canonicalOverride ??
    (path && !path.includes(':')
      ? `${SITE_URL}${path === '/' ? '' : path}`
      : undefined);

  // Ensure ogImage is an absolute URL
  const ogImageAbsolute = ogImage.startsWith('http')
    ? ogImage
    : `${SITE_URL}${ogImage}`;

  return (
    <Helmet>
      {/* ── Core ──────────────────────────────────── */}
      <title>{title}</title>
      <meta name="description" content={description} />
      {keywords && <meta name="keywords" content={keywords} />}
      {canonical && <link rel="canonical" href={canonical} />}
      <meta name="robots" content={robots} />

      {/* ── Open Graph ────────────────────────────── */}
      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:locale"    content="en_US" />
      <meta property="og:type"      content={ogType} />
      {canonical && <meta property="og:url" content={canonical} />}
      <meta property="og:title"       content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:image"       content={ogImageAbsolute} />
      <meta property="og:image:width"  content="1200" />
      <meta property="og:image:height" content="630" />

      {/* ── Twitter Card ──────────────────────────── */}
      <meta name="twitter:card"        content="summary_large_image" />
      <meta name="twitter:site"        content={TWITTER_HANDLE} />
      <meta name="twitter:title"       content={title} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image"       content={ogImageAbsolute} />

      {/* ── JSON-LD Structured Data ───────────────── */}
      {jsonLdOverride && (
        <script type="application/ld+json">
          {JSON.stringify(
            Array.isArray(jsonLdOverride) ? jsonLdOverride : [jsonLdOverride],
            null,
            2
          )}
        </script>
      )}
    </Helmet>
  );
}
