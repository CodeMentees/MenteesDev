/**
 * useDynamicSEO.js — Hook for API-driven page titles & JSON-LD
 *
 * Use this on pages where title/description come from an API response
 * (course detail, blog post, live course detail).
 *
 * Returns SEOHead-compatible props you can spread directly:
 *   const seoProps = useDynamicSEO('course', course);
 *   <SEOHead path="/courses/:courseId" {...seoProps} />
 *
 * Supported types:
 *   'course'      — Individual course detail page
 *   'blog'        — Individual blog post page
 *   'liveCourse'  — Live course detail page
 *
 * Returns {} (empty object) while data is still loading — SEOHead
 * will fall back to the static config defaults until data arrives.
 */

import { useMemo } from 'react';
import { SITE_NAME, SITE_URL } from './seo.config';

/**
 * Strip HTML tags from a string (for meta description from rich-text content).
 * @param {string} html
 * @param {number} maxLen
 */
function stripHtml(html = '', maxLen = 155) {
  return html
    .replace(/<[^>]+>/g, '')
    .replace(/\s+/g, ' ')
    .trim()
    .substring(0, maxLen);
}

/**
 * useDynamicSEO
 * @param {'course'|'blog'|'liveCourse'} type
 * @param {object|null} data - The API response object (null while loading)
 * @returns {object} Props to spread into <SEOHead>
 */
export function useDynamicSEO(type, data) {
  return useMemo(() => {
    // Return empty while still loading — SEOHead uses config defaults
    if (!data) return {};

    switch (type) {
      // ── Individual Course Detail ─────────────────────────────
      case 'course': {
        const courseDesc = stripHtml(data.description ?? '');
        return {
          title: `${data.name} | Learn with Expert Mentors | ${SITE_NAME}`,
          description: courseDesc || `Master ${data.name} with live 1:1 mentorship at ${SITE_NAME}.`,
          keywords: [
            data.name,
            'coding course',
            data.category ?? '',
            'mentorship',
            'online learning',
            SITE_NAME,
          ]
            .filter(Boolean)
            .join(', ')
            .toLowerCase(),
          ogImage: data.image ?? undefined,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: data.name,
            description: courseDesc,
            url: `${SITE_URL}/courses/${data._id}`,
            image: data.image,
            provider: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
            },
            offers: {
              '@type': 'Offer',
              price: '1599',
              priceCurrency: 'INR',
              availability: 'https://schema.org/InStock',
              url: `${SITE_URL}/courses/${data._id}`,
            },
          },
        };
      }

      // ── Individual Blog Post ─────────────────────────────────
      case 'blog': {
        const blogDesc = stripHtml(data.content ?? data.excerpt ?? '');
        return {
          title: `${data.title} | ${SITE_NAME} Blog`,
          description: blogDesc || `Read ${data.title} on the ${SITE_NAME} blog.`,
          keywords: (data.categories ?? []).concat(['coding blog', 'web development']).join(', '),
          ogImage: data.image ?? undefined,
          ogType: 'article',
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Article',
            headline: data.title,
            description: blogDesc,
            image: data.image,
            datePublished: data.createdAt,
            dateModified: data.updatedAt ?? data.createdAt,
            author: {
              '@type': 'Person',
              name: data.author?.name ?? SITE_NAME,
            },
            publisher: {
              '@type': 'Organization',
              name: SITE_NAME,
              logo: {
                '@type': 'ImageObject',
                url: `${SITE_URL}/logo.png`,
              },
            },
            mainEntityOfPage: {
              '@type': 'WebPage',
              '@id': `${SITE_URL}/blogs/${data._id}`,
            },
          },
        };
      }

      // ── Live Course Detail ───────────────────────────────────
      case 'liveCourse': {
        const liveDesc = stripHtml(data.description ?? '');
        return {
          title: `${data.name} | Live ${data.courseType === 'recorded' ? 'Recorded Series' : 'Class'} | ${SITE_NAME}`,
          description: liveDesc || `Join ${data.name} — live or recorded sessions with expert mentors at ${SITE_NAME}.`,
          keywords: [
            data.name,
            'live coding class',
            data.courseType === 'recorded' ? 'recorded course' : 'live session',
            'coding mentorship',
            SITE_NAME,
          ]
            .filter(Boolean)
            .join(', ')
            .toLowerCase(),
          ogImage: data.image ?? undefined,
          jsonLd: {
            '@context': 'https://schema.org',
            '@type': 'Course',
            name: data.name,
            description: liveDesc,
            url: `${SITE_URL}/live/${data._id}`,
            image: data.image,
            provider: {
              '@type': 'Organization',
              name: SITE_NAME,
              url: SITE_URL,
            },
          },
        };
      }

      default:
        return {};
    }
  }, [type, data]);
}
