import React from 'react';
import SEOHead from '../../seo/SEOHead';

const faqData = [
  {
    question: "What services do you offer?",
    answer: "We provide web development, SEO, and marketing services."
  },
  {
    question: "How can I contact support?",
    answer: "You can contact us via email or the contact form."
  }
];

const faqJsonLd = {
  "@context": "https://schema.org",
  "@type": "FAQPage",
  mainEntity: faqData.map((item) => ({
    "@type": "Question",
    name: item.question,
    acceptedAnswer: {
      "@type": "Answer",
      text: item.answer,
    },
  })),
};

const FAQ = () => (
  <div className="min-h-screen p-8 bg-gray-100">
    <SEOHead path="/faq" jsonLd={faqJsonLd} />

    <h1 className="text-3xl font-semibold text-gray-800">Frequently Asked Questions</h1>
    <div className="mt-6 space-y-4">
      {faqData.map((item, index) => (
        <details key={index} className="border p-4 rounded bg-white">
          <summary className="cursor-pointer font-semibold">{item.question}</summary>
          <p className="mt-2 text-gray-600">{item.answer}</p>
        </details>
      ))}
    </div>
  </div>
);

export default FAQ;