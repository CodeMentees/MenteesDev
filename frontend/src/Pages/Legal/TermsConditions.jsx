import React, { useState } from "react";
import { motion } from "framer-motion";
import SEOHead from "../../seo/SEOHead";
import { Link } from "react-router-dom";

const SECTIONS = [
  {
    id: "acceptance",
    title: "1. Acceptance of Terms",
    content: `By accessing or using the CodeMentees platform (the "Service"), you agree to be bound by these Terms and Conditions ("Terms"). If you do not agree with any part of these Terms, you may not use the Service.

We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes your acceptance of the updated Terms. We will notify registered users of significant changes via email.`,
  },
  {
    id: "eligibility",
    title: "2. Eligibility & Accounts",
    content: `• You must be at least 13 years old to use CodeMentees.
• You are responsible for maintaining the confidentiality of your account credentials.
• You agree to provide accurate, complete, and up-to-date information during registration.
• You are responsible for all activities that occur under your account.
• You must verify your email address using the OTP sent during registration before accessing certain features.
• We reserve the right to suspend or terminate accounts that violate these Terms.`,
  },
  {
    id: "content",
    title: "3. Intellectual Property",
    content: `• All course content, videos, written materials, and designs on CodeMentees are the intellectual property of CodeMentees or its content creators.
• You may not reproduce, distribute, or use our content commercially without prior written permission.
• When you submit content (e.g., comments, forum posts, or project submissions), you grant CodeMentees a non-exclusive, royalty-free license to use, display, and distribute that content on our platform.
• You retain ownership of your original work and submissions.`,
  },
  {
    id: "courses",
    title: "4. Course Access & Enrollment",
    content: `• Some courses on CodeMentees are free; others may require payment.
• Upon enrollment, you are granted a personal, non-transferable license to access the course content.
• Course access does not confer any certification or credential unless explicitly stated.
• CodeMentees reserves the right to update, modify, or discontinue courses at any time.
• Live sessions are time-bound and recordings (if available) are provided at our discretion.`,
  },
  {
    id: "payments",
    title: "5. Payments & Refunds",
    content: `• Payments for premium courses, live sessions, or internship programs are processed securely through our payment gateway.
• All prices are listed in Indian Rupees (INR) and are inclusive of applicable taxes unless stated otherwise.
• **Refund Policy**: Refunds may be requested within 7 days of purchase if the course content has not been substantially accessed. Refunds are not applicable after 7 days or if more than 20% of the course has been completed.
• For live course enrollments, refunds must be requested at least 48 hours before the session start time.
• To request a refund, contact us at codementees@gmail.com with your order details.`,
  },
  {
    id: "conduct",
    title: "6. Prohibited Conduct",
    content: `You agree NOT to:

• Share your account credentials or allow others to access the platform using your account.
• Reproduce, redistribute, or resell any course content.
• Use the platform to upload or transmit harmful, offensive, or illegal content.
• Attempt to reverse-engineer, hack, or disrupt the platform's infrastructure.
• Engage in harassment, discrimination, or abuse toward other users, mentors, or staff.
• Submit false, misleading, or plagiarized content in assignments or forums.
• Use automated scripts, bots, or crawlers to access the platform without permission.

Violations may result in immediate account suspension and legal action where applicable.`,
  },
  {
    id: "liability",
    title: "7. Disclaimer & Limitation of Liability",
    content: `• The Service is provided on an "as is" and "as available" basis without warranties of any kind.
• CodeMentees does not guarantee that its platform will be uninterrupted, error-free, or secure.
• We are not responsible for any outcomes related to your career, employment, or skill development resulting from use of the platform.
• To the maximum extent permitted by law, CodeMentees shall not be liable for any indirect, incidental, special, or consequential damages arising from your use of the Service.
• Our total liability to you for any claims arising from these Terms shall not exceed the amount you paid to CodeMentees in the 12 months preceding the claim.`,
  },
  {
    id: "privacy",
    title: "8. Privacy",
    content: `Your use of the platform is also governed by our Privacy Policy, which is incorporated into these Terms by reference. By using CodeMentees, you consent to the collection and use of your data as described in our Privacy Policy.`,
  },
  {
    id: "termination",
    title: "9. Termination",
    content: `• You may delete your account at any time by contacting us at codementees@gmail.com.
• CodeMentees may suspend or terminate your account immediately, without prior notice, if you violate these Terms.
• Upon termination, your right to access the platform ceases immediately. Content you have uploaded may be retained or deleted at our discretion.`,
  },
  {
    id: "governing",
    title: "10. Governing Law & Disputes",
    content: `• These Terms are governed by the laws of India, without regard to its conflict of law provisions.
• Any disputes arising from these Terms shall first be attempted to be resolved through good-faith negotiation.
• If negotiation fails, disputes shall be subject to the exclusive jurisdiction of the courts located in Uttarakhand, India.`,
  },
  {
    id: "contact",
    title: "11. Contact Us",
    content: `If you have questions about these Terms, please contact us:

• Email: codementees@gmail.com
• Phone: +91 6396934224
• Contact Form: Visit our Contact Page at /contact`,
  },
];

const TermsConditions = () => {
  const [activeSection, setActiveSection] = useState(null);

  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 60%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/terms"
        title="Terms & Conditions | CodeMentees"
        description="Read the Terms and Conditions for using the CodeMentees platform, including account, content, payment, and conduct policies."
      />

      <div className="fixed top-1/3 left-1/4 w-[500px] h-[500px] bg-orange-600/6 rounded-full blur-[120px] pointer-events-none" />

      {/* Hero */}
      <section className="pt-32 pb-16 px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4"
        >
          Legal
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-4xl md:text-6xl font-black mb-4"
        >
          Terms &{" "}
          <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">Conditions</span>
        </motion.h1>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }}
          className="text-gray-500 text-sm"
        >
          Last Updated: September 2025 · Governed by Indian Law
        </motion.p>
        <motion.p
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.3 }}
          className="text-gray-400 max-w-2xl mx-auto mt-4 text-base leading-relaxed"
        >
          Please read these Terms carefully before using CodeMentees. By creating an account or
          accessing our platform, you agree to be bound by these Terms.
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
                  <div className="text-gray-400 text-sm leading-relaxed">
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
                      return line ? <p key={j} className="mb-3">{line}</p> : null;
                    })}
                  </div>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="max-w-4xl mx-auto mt-12 text-center space-y-3">
          <p className="text-gray-500 text-sm">
            By using CodeMentees, you acknowledge that you have read and agree to these Terms.
          </p>
          <p className="text-gray-500 text-sm">
            Also see our{" "}
            <Link to="/privacy-policy" className="text-orange-400 hover:text-orange-300 transition-colors">
              Privacy Policy
            </Link>
            .
          </p>
        </div>
      </section>
    </div>
  );
};

export default TermsConditions;
