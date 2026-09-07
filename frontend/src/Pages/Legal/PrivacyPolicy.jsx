import React, { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "../../seo/SEOHead";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    id: "information",
    title: "1. Information We Collect",
    content: `When you register or interact with our platform, we collect:

• **Personal Information**: Name, email address, and phone number (provided during registration).
• **Account Data**: Your role, course enrolments, and activity on the platform.
• **Usage Data**: Pages visited, features used, and interactions with course content (collected via analytics).
• **Communication Data**: Messages submitted through our contact form or support queries.
• **Technical Data**: IP address, browser type, device information, and cookies.`,
  },
  {
    id: "usage",
    title: "2. How We Use Your Information",
    content: `We use your data to:

• Create and manage your account on the CodeMentees platform.
• Deliver purchased courses and live sessions.
• Send OTP verification emails during registration and password reset.
• Send important service announcements, updates, and promotional content (you may opt out of marketing emails at any time).
• Improve our platform through usage analytics.
• Respond to your queries and provide customer support.
• Detect and prevent fraudulent or unauthorized activity.`,
  },
  {
    id: "sharing",
    title: "3. Information Sharing",
    content: `We do not sell your personal data. We may share data with:

• **Service Providers**: Third-party tools we use to run the platform, including:
  - **MongoDB Atlas** (database hosting, located in the cloud)
  - **Cloudinary** (image and media storage)
  - **Google OAuth** (for social sign-in)
  - **Nodemailer / Gmail SMTP** (for sending emails)
• **Legal Requirements**: If required by law or to protect our rights, we may disclose information to authorities.
• **Business Transfers**: If CodeMentees is acquired or merges, your data may be transferred to the new entity.`,
  },
  {
    id: "cookies",
    title: "4. Cookies & Session Data",
    content: `We use cookies and session storage for:

• **Authentication**: We store a secure, HttpOnly JWT token in a cookie to keep you logged in. This cookie is never accessible to JavaScript and expires based on your session preference (1 day or 30 days with "Remember Me").
• **Session Tracking**: We use \`sessionStorage\` to count unique visits for our visitor statistics.
• **No Third-Party Ad Cookies**: We do not use advertising cookies or sell data to advertisers.

You can disable cookies in your browser settings, but this will prevent you from logging in.`,
  },
  {
    id: "rights",
    title: "5. Your Rights",
    content: `You have the right to:

• **Access**: Request a copy of the personal data we hold about you.
• **Correction**: Request correction of any inaccurate data.
• **Deletion**: Request deletion of your account and associated data. To delete your account, contact us at codementees@gmail.com.
• **Opt-Out**: Unsubscribe from marketing emails using the unsubscribe link in any email we send.
• **Data Portability**: Request your data in a machine-readable format.`,
  },
  {
    id: "security",
    title: "6. Data Security",
    content: `We take reasonable steps to protect your data:

• Passwords are hashed using bcrypt before storage — we never store plaintext passwords.
• Authentication uses secure, HttpOnly cookies (not localStorage).
• API routes are protected with JWT verification and role-based access control (RBAC).
• OTP codes expire after 10 minutes.
• We use HTTPS in production for all data transmission.

No system is 100% secure. If you believe your account has been compromised, contact us immediately.`,
  },
  {
    id: "retention",
    title: "7. Data Retention",
    content: `We retain your data for as long as your account is active or as needed to provide services. If you request account deletion, we will remove your personal data within 30 days, except where retention is required by law.`,
  },
  {
    id: "children",
    title: "8. Children's Privacy",
    content: `CodeMentees is not directed at children under 13 years of age. We do not knowingly collect personal information from children under 13. If you believe a child has provided us with their data, please contact us and we will delete it promptly.`,
  },
  {
    id: "changes",
    title: "9. Changes to This Policy",
    content: `We may update this Privacy Policy from time to time. When we do, we will update the "Last Updated" date at the top of this page and notify registered users via email for significant changes.`,
  },
  {
    id: "contact",
    title: "10. Contact Us",
    content: `If you have any questions, concerns, or requests regarding this Privacy Policy, please contact us:

• **Email**: codementees@gmail.com
• **Phone**: +91 6396934224
• **Contact Form**: Visit our [Contact Page](/contact)`,
  },
];

const PrivacyPolicy = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 60%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/privacy-policy"
        title="Privacy Policy | CodeMentees"
        description="Learn how CodeMentees collects, uses, and protects your personal information."
      />

      <div className="fixed top-1/3 right-1/4 w-[500px] h-[500px] bg-indigo-600/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-xs font-bold tracking-widest uppercase mb-4"
        >
          Legal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-4"
        >
          Privacy{" "}
          <span className="bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">Policy</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm"
        >
          Last Updated: September 2025
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-2xl mx-auto mt-4 text-base leading-relaxed"
        >
          At CodeMentees, we take your privacy seriously. This policy explains what data we collect,
          why we collect it, and how we protect it.
        </motion.p>
      </section>

      {/* Content */}
      <section className="pb-24 px-6 relative z-10">
        <div className="max-w-4xl mx-auto space-y-4">
          {SECTIONS.map((section, i) => (
            <motion.div
              key={section.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.04 }}
              className="rounded-2xl overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <button
                className="w-full text-left px-6 py-5 flex items-center justify-between gap-4 transition-colors duration-200 hover:bg-white/5"
                onClick={() => setActiveSection(activeSection === section.id ? null : section.id)}
              >
                <h2 className="text-base font-bold text-white">{section.title}</h2>
                <span className="text-gray-500 shrink-0 text-lg">
                  {activeSection === section.id ? "−" : "+"}
                </span>
              </button>
              {activeSection === section.id && (
                <div className="px-6 pb-6">
                  <div className="h-px bg-white/5 mb-4" />
                  <div className="text-gray-400 text-sm leading-relaxed whitespace-pre-line">
                    {section.content.split("\n").map((line, j) => {
                      if (line.startsWith("• **")) {
                        const parts = line.slice(2).split("**");
                        return (
                          <p key={j} className="mb-1.5 flex gap-2">
                            <span className="text-gray-600 mt-0.5">•</span>
                            <span>
                              <strong className="text-white">{parts[1]}</strong>
                              {parts[2]}
                            </span>
                          </p>
                        );
                      }
                      if (line.startsWith("• ")) {
                        return (
                          <p key={j} className="mb-1.5 flex gap-2">
                            <span className="text-gray-600 mt-0.5">•</span>
                            <span>{line.slice(2)}</span>
                          </p>
                        );
                      }
                      if (line.startsWith("  - ")) {
                        return (
                          <p key={j} className="mb-1 ml-6 flex gap-2 text-gray-500">
                            <span>–</span>
                            <span>{line.slice(4)}</span>
                          </p>
                        );
                      }
                      return line ? <p key={j} className="mb-3">{line}</p> : null;
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center">
          <p className="text-gray-500 text-sm">
            Have a question about this policy?{" "}
            <Link to="/contact" className="text-indigo-400 hover:text-indigo-300 transition-colors">
              Contact us
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default PrivacyPolicy;
