import React from 'react';
import { Inter, Manrope, Outfit, Playwrite_IT_Moderna } from 'next/font/google';
import './globals.css';
import Providers from '@/Providers';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

const manrope = Manrope({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-manrope',
});

const outfit = Outfit({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-outfit',
});

const playwrite = Playwrite_IT_Moderna({
  weight: ['100', '400'],
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-playwrite',
});

export const metadata = {
  title: {
    default: 'Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees',
    template: '%s | CodeMentees',
  },
  description:
    'Live 1:1 mentorship in Web Development, Data Structures & Algorithms, and Interview Prep — from engineers who\'ve worked in production at companies like JPMorgan and Freecharge. Join 500+ developers already learning.',
  authors: [{ name: 'CodeMentees Team' }],
  metadataBase: new URL('https://codementees.com'),
  openGraph: {
    siteName: 'CodeMentees',
    locale: 'en_US',
    type: 'website',
    title: 'Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees',
    description:
      'Live 1:1 mentorship in Web Development, DSA & Interview Prep from engineers at JPMorgan and Freecharge. Join 500+ developers already learning.',
    images: [
      {
        url: '/images/home-og.jpg',
        width: 1200,
        height: 630,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: '@codementees',
    title: 'Learn to Code. Get Job-Ready. Work From Anywhere. | CodeMentees',
    description:
      'Live 1:1 mentorship in Web Development, DSA & Interview Prep from engineers at JPMorgan and Freecharge.',
    images: ['/images/home-og.jpg'],
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={`${inter.variable} ${manrope.variable} ${outfit.variable} ${playwrite.variable}`}>
      <head>
        {/* Font Awesome */}
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.0.0-beta3/css/all.min.css"
        />
        {/* Favicon */}
        <link rel="icon" type="image/png" href="/favicon.png" />
        {/* JSON-LD Structured Data */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": ["EducationalOrganization", "Organization"],
              "name": "CodeMentees",
              "url": "https://codementees.com/",
              "logo": "https://codementees.com/logo/primary-logo.svg",
              "description":
                "Live 1:1 mentorship in Web Development, DSA & Interview Prep from engineers who've worked at JPMorgan and Freecharge.",
              "foundingDate": "2023",
              "areaServed": "Worldwide",
              "aggregateRating": {
                "@type": "AggregateRating",
                "ratingValue": "4.8",
                "reviewCount": "100",
                "bestRating": "5",
              },
              "sameAs": [
                "https://www.facebook.com/codementees",
                "https://twitter.com/codementees",
                "https://www.linkedin.com/company/codementees",
              ],
            }),
          }}
        />
      </head>
      <body>
        <Providers>
          <div className="flex flex-col min-h-screen" style={{ background: '#000005' }}>
            {children}
          </div>
        </Providers>
      </body>
    </html>
  );
}
