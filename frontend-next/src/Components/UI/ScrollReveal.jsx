'use client';

import { useEffect } from 'react';
import { usePathname } from 'next/navigation';

/**
 * ScrollReveal — observes elements with .reveal / .reveal-stagger / .reveal-scale /
 * .reveal-left / .reveal-right classes and adds .revealed when they enter the viewport.
 * Runs on every route change so newly mounted pages get animated too.
 *
 * Replaces the useScrollReveal() hook that was called inside AppInner in App.jsx.
 */
export default function ScrollReveal() {
  const pathname = usePathname();

  useEffect(() => {
    const timer = setTimeout(() => {
      const selectors = ['.reveal', '.reveal-stagger', '.reveal-scale', '.reveal-left', '.reveal-right'];
      const elements = document.querySelectorAll(selectors.join(','));

      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('revealed');
              observer.unobserve(entry.target);
            }
          });
        },
        { threshold: 0.1, rootMargin: '0px 0px -40px 0px' }
      );

      elements.forEach((el) => observer.observe(el));

      return () => observer.disconnect();
    }, 80);

    return () => clearTimeout(timer);
  }, [pathname]);

  return null;
}
