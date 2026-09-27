'use client';

import React from 'react';
import Header from '@/Components/Header/Header';
import Footer from '@/Components/Footer/Footer';
import RouteProgressBar from '@/Components/UI/RouteProgressBar';
import ScrollToTop from '@/Components/UI/ScrollToTop';
import VisitorTracker from '@/Components/UI/VisitorTracker';
import ScrollReveal from '@/Components/UI/ScrollReveal';

/**
 * Public layout — wraps all public-facing pages with the site Header & Footer.
 * Admin and Student routes have their own layouts and do NOT use this one.
 */
export default function PublicLayout({ children }) {
  return (
    <>
      <RouteProgressBar />
      <ScrollToTop />
      <VisitorTracker />
      <ScrollReveal />
      <Header />
      <main className="flex-grow font-sans mt-12 page-mount">
        {children}
      </main>
      <Footer />
    </>
  );
}
