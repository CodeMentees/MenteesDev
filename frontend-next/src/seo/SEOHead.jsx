'use client';

import React, { useEffect } from 'react';
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
  const config = getSEOForPath(path) || {};

  const title       = titleOverride    ?? config.title       ?? SITE_NAME;
  const description = descOverride     ?? config.description ?? '';
  const keywords    = keywordsOverride ?? config.keywords    ?? '';
  const noindex     = noindexOverride  ?? config.noindex     ?? false;

  useEffect(() => {
    if (typeof document === 'undefined') return;

    if (title) {
      document.title = title;
    }

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (metaDesc) {
        metaDesc.setAttribute('content', description);
      }
    }
  }, [title, description]);

  return null;
}
