import React from "react";
import { Helmet } from "react-helmet";

const About = () => {
  return (
    <div className="min-h-screen p-8 bg-white">
      {/* ✅ SEO Meta Tags */}
      <Helmet>
        <title>About Us | Codementees</title>
        <meta name="description" content="Learn more about Codementees. We are dedicated to providing top-notch coding education and mentorship." />
        <meta property="og:title" content="About Us | Codementees" />
        <meta property="og:description" content="Learn more about Codementees. We are dedicated to providing top-notch coding education and mentorship." />
        <meta property="og:image" content="/about-us-image.jpg" />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://codementees.com/about" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content="About Us | Codementees" />
        <meta name="twitter:description" content="Discover Codementees, your go-to platform for coding education and mentorship." />
      </Helmet>

      {/* ✅ Schema Markup for SEO */}
      <script type="application/ld+json">
        {JSON.stringify({
          "@context": "https://schema.org",
          "@type": "Organization",
          "name": "Codementees",
          "url": "https://codementees.com",
          "description": "We provide top-notch coding education and mentorship.",
          "logo": "https://codementees.com/logo.png",
          "contactPoint": {
            "@type": "ContactPoint",
            "telephone": "+91 6396934224",
            "contactType": "customer support"
          }
        })}
      </script>

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
