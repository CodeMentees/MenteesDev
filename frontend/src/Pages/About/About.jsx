import React from "react";
import SEOHead from "../../seo/SEOHead";
import { SITE_URL } from "../../seo/seo.config";

const organizationJsonLd = {
  "@context": "https://schema.org",
  "@type": "Organization",
  name: "CodeMentees",
  url: SITE_URL,
  description:
    "CodeMentees connects self-taught and early-career developers with experienced mentors to build real, hireable skills — not just certificates.",
  logo: `${SITE_URL}/logo.png`,
  contactPoint: {
    "@type": "ContactPoint",
    telephone: "+91 6396934224",
    contactType: "customer support",
  },
  sameAs: [
    "https://www.facebook.com/codementees",
    "https://twitter.com/codementees",
    "https://www.linkedin.com/company/codementees",
  ],
};

const About = () => {
  return (
    <div className="p-8 bg-white">
      <SEOHead path="/about" jsonLd={organizationJsonLd} />

      {/* ✅ Content */}
      <section className="max-w-4xl mx-auto text-gray-800">
        <h1 className="text-4xl font-bold text-gray-900">About Codementees</h1>
        <p className="mt-4 text-lg">
          Welcome to <strong>Codementees</strong>, your go-to platform for coding education and mentorship.
          Our team is dedicated to empowering learners with high-quality programming resources, hands-on projects, and expert guidance.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Our Mission</h2>
        <p className="mt-2 text-lg">
          We strive to make coding accessible to everyone, from beginners to professionals.
          Whether you're looking to build a project, improve your skills, or land your dream job, we’ve got you covered.
        </p>

        <h2 className="mt-6 text-2xl font-semibold text-gray-900">Why Choose Us?</h2>
        <ul className="mt-2 list-disc list-inside text-lg">
          <li>Expert-led mentorship programs</li>
          <li>Hands-on coding projects</li>
          <li>Community-driven learning environment</li>
          <li>Career-focused resources and job opportunities</li>
        </ul>
      </section>
    </div>
  );
};

export default About;
