import React from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
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
    "https://www.instagram.com/codementees",
    "https://www.linkedin.com/company/codementees",
  ],
};

const WHAT_WE_DO = [
  { icon: "🎓", title: "Expert Mentorship", desc: "Get paired with experienced developers who guide you through real-world problems, not textbook theory." },
  { icon: "💻", title: "Hands-On Courses", desc: "Learn Web Development, DSA, and more through project-based courses built for today's job market." },
  { icon: "🚀", title: "Live Sessions", desc: "Join live, interactive coding sessions where you code alongside instructors and peers in real time." },
  { icon: "🏆", title: "Placement Support", desc: "Mock interviews, resume reviews, and referrals to help you land your first or next tech role." },
  { icon: "🏫", title: "School Coding", desc: "We partner with schools and colleges to bring structured coding education directly to campuses." },
  { icon: "📸", title: "Community Events", desc: "Hackathons, workshops, and tech talks at colleges across India — where learning meets networking." },
];

const VALUES = [
  { icon: "📖", title: "Learn", color: "from-indigo-500 to-purple-500", desc: "We believe education should be practical, accessible, and grounded in how real software is built." },
  { icon: "🔨", title: "Build", color: "from-orange-500 to-pink-500", desc: "Our students don't just watch videos — they build projects, write code, and solve actual problems." },
  { icon: "🌱", title: "Grow", color: "from-emerald-500 to-teal-500", desc: "Growth isn't just technical. We nurture confidence, communication, and career-readiness in every mentee." },
];

const fadeUp = { hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } };

const About = () => {
  return (
    <div
      className="min-h-screen text-white"
      style={{ background: "linear-gradient(135deg, #000005 0%, #060d1f 50%, #0a0a1a 100%)" }}
    >
      <SEOHead
        path="/about"
        title="About Us | CodeMentees"
        description="CodeMentees connects self-taught and early-career developers with experienced mentors to build real, hireable skills."
        jsonLd={organizationJsonLd}
      />

      {/* Decorative glows */}
      <div className="fixed top-1/4 left-1/4 w-[600px] h-[600px] bg-indigo-600/8 rounded-full blur-[120px] pointer-events-none" />
      <div className="fixed bottom-1/4 right-1/4 w-[500px] h-[500px] bg-orange-600/8 rounded-full blur-[100px] pointer-events-none" />

      {/* ── Hero ── */}
      <section className="pt-32 pb-20 px-6 text-center relative z-10">
        <motion.span
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }}
          className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-6"
        >
          Our Story
        </motion.span>
        <motion.h1
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black mb-6 leading-tight"
        >
          Empowering the{" "}
          <span className="bg-gradient-to-r from-orange-400 via-pink-400 to-indigo-400 bg-clip-text text-transparent">
            Next Generation
          </span>
          {" "}of Developers
        </motion.h1>
        <motion.p
          initial={{ opacity: 0, y: -20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}
          className="text-gray-400 max-w-2xl mx-auto text-lg md:text-xl leading-relaxed"
        >
          CodeMentees was built with a single belief: the gap between learning to code and
          getting hired isn't about talent — it's about guidance, practice, and the right community.
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
          className="flex flex-wrap justify-center gap-4 mt-10"
        >
          <Link
            to="/courses"
            className="px-8 py-4 rounded-full font-bold text-white bg-gradient-to-r from-orange-500 to-pink-500 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300"
          >
            Explore Courses
          </Link>
          <Link
            to="/contact"
            className="px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:scale-105 transition-all duration-300"
          >
            Get in Touch
          </Link>
        </motion.div>
      </section>

      {/* ── Mission ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto grid md:grid-cols-2 gap-8">
          {[
            {
              badge: "Our Mission",
              gradient: "from-orange-500/20 to-pink-500/20",
              border: "border-orange-500/20",
              title: "Bridge the gap between learning & earning",
              body: "We strive to make quality mentorship accessible to every aspiring developer in India and beyond — from tier-3 cities to top colleges — by connecting them with industry professionals who actually know what it takes to get hired.",
            },
            {
              badge: "Our Vision",
              gradient: "from-indigo-500/20 to-purple-500/20",
              border: "border-indigo-500/20",
              title: "A developer community built on real growth",
              body: "We envision a world where no motivated developer is held back by lack of guidance. Where mentorship is as normal as online courses, and where every learner has access to someone who's already walked the path.",
            },
          ].map((card, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className={`rounded-3xl p-8 bg-gradient-to-br ${card.gradient} border ${card.border} relative overflow-hidden`}
            >
              <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">
                {card.badge}
              </span>
              <h2 className="text-2xl font-bold text-white mb-4">{card.title}</h2>
              <p className="text-gray-400 leading-relaxed">{card.body}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── What We Do ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">
              What We Offer
            </span>
            <h2 className="text-4xl md:text-5xl font-black text-white">
              Everything you need to{" "}
              <span className="bg-gradient-to-r from-orange-400 to-pink-400 bg-clip-text text-transparent">level up</span>
            </h2>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {WHAT_WE_DO.map((item, i) => (
              <motion.div
                key={i}
                variants={fadeUp}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
                transition={{ delay: i * 0.07 }}
                className="rounded-2xl p-6 group hover:scale-[1.02] transition-all duration-300"
                style={{
                  background: "rgba(255,255,255,0.03)",
                  border: "1px solid rgba(255,255,255,0.07)",
                }}
                onMouseEnter={e => e.currentTarget.style.borderColor = "rgba(249,115,22,0.3)"}
                onMouseLeave={e => e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"}
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Values ── */}
      <section className="py-20 px-6 relative z-10">
        <div className="max-w-5xl mx-auto text-center mb-16">
          <span className="inline-block py-1 px-3 rounded-full bg-white/5 border border-white/10 text-orange-400 text-xs font-bold tracking-widest uppercase mb-4">
            Our Values
          </span>
          <h2 className="text-4xl md:text-5xl font-black text-white">The CodeMentees Way</h2>
        </div>
        <div className="max-w-5xl mx-auto grid md:grid-cols-3 gap-6">
          {VALUES.map((v, i) => (
            <motion.div
              key={i}
              variants={fadeUp}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="text-center rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <div className={`inline-flex w-16 h-16 rounded-2xl items-center justify-center text-3xl mb-5 bg-gradient-to-br ${v.color}`}>
                {v.icon}
              </div>
              <h3 className="text-xl font-bold text-white mb-3">{v.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{v.desc}</p>
            </motion.div>
          ))}
        </div>
      </section>

      {/* ── CTA ── */}
      <section className="py-20 px-6 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="max-w-4xl mx-auto text-center rounded-3xl p-12 relative overflow-hidden"
          style={{ background: "rgba(255,255,255,0.02)", border: "1px solid rgba(255,255,255,0.08)" }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-orange-500/10 via-pink-500/10 to-indigo-500/10 pointer-events-none" />
          <div className="relative z-10">
            <h2 className="text-3xl md:text-4xl font-black text-white mb-4">Ready to start your journey?</h2>
            <p className="text-gray-400 mb-8 max-w-xl mx-auto">
              Join thousands of developers who are leveling up their skills, landing jobs, and building products with CodeMentees.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Link
                to="/register"
                className="px-8 py-4 rounded-full font-bold text-gray-900 bg-gradient-to-r from-orange-400 to-pink-400 hover:shadow-[0_0_30px_rgba(249,115,22,0.4)] hover:scale-105 transition-all duration-300"
              >
                Join for Free
              </Link>
              <Link
                to="/events"
                className="px-8 py-4 rounded-full font-bold text-white bg-white/5 border border-white/15 hover:bg-white/10 hover:scale-105 transition-all duration-300"
              >
                View Events
              </Link>
            </div>
          </div>
        </motion.div>
      </section>
    </div>
  );
};

export default About;
