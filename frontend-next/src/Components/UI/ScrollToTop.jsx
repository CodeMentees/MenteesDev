'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollToTop — scrolls window to top on new route visits.
 * Preserves scroll position on browser back/forward navigation.
 *
 * Note: Next.js App Router handles scroll restoration natively for browser
 * back/forward, so we only need to scroll up on forward navigation.
 */
export default function ScrollToTop() {
  const pathname = usePathname();

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'instant' });
  }, [pathname]);

  return null;
}
