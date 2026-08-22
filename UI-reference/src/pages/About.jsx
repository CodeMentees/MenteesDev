export default function About() {
  return (
    <section className="surface py-20 md:py-28 fade-in">
      <div className="max-w-6xl mx-auto px-6 space-y-16">
        
        {/* HERO SECTION */}
        <div className="text-center max-w-3xl mx-auto space-y-4">
          <span className="badge-soft text-xs uppercase tracking-wider font-bold">Our Vision</span>
          <h1 className="text-4xl md:text-5xl font-bold tracking-tight">
            Streamlining Onboarding with{" "}
            <span className="bg-gradient-to-r from-teal-500 to-blue-600 bg-clip-text text-transparent">
              Artificial Intelligence
            </span>
          </h1>
          <p className="text-lg text-secondary leading-relaxed">
            OnboardAI is a modern SaaS platform designed to transform how new employees integrate into organizations. We bridge the gap between static documents and operational readiness.
          </p>
        </div>

        {/* DETAILS SECTION */}
        <div className="grid md:grid-cols-2 gap-12 items-center">
          <div className="space-y-6">
            <h2 className="text-3xl font-bold">Why OnboardAI?</h2>
            <p className="text-secondary leading-relaxed">
              Traditional corporate onboarding is slow, scattered, and demanding on HR and engineering leads. New hires spend days asking repetitive questions or searching through outdated wikis.
            </p>
            <p className="text-secondary leading-relaxed">
              OnboardAI centralizes company information. By combining structured training pathways with **Retrieval-Augmented Generation (RAG)**, we enable new hires to receive verified, company-specific answers to setup and policy questions instantly.
            </p>
            <div className="flex gap-4">
              <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/40 border border-default rounded-xl">
                <span className="text-2xl">⚡</span>
                <h4 className="font-bold text-sm mt-2">Instant Setup</h4>
                <p className="text-xs text-muted mt-1">Ramp up in hours, not weeks, with self-paced roadmaps.</p>
              </div>
              <div className="flex-1 p-4 bg-slate-50 dark:bg-slate-800/40 border border-default rounded-xl">
                <span className="text-2xl">🤖</span>
                <h4 className="font-bold text-sm mt-2">No Hallucinations</h4>
                <p className="text-xs text-muted mt-1">AI answers are backed strictly by company documentation.</p>
              </div>
            </div>
          </div>
          
          <div className="relative p-8 bg-gradient-to-br from-teal-500/10 via-blue-500/5 to-transparent rounded-3xl border border-teal-500/20 overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-teal-500/10 rounded-full blur-2xl" />
            <div className="absolute bottom-0 left-0 w-32 h-32 bg-blue-500/10 rounded-full blur-2xl" />
            
            <h3 className="font-bold text-lg mb-4 text-teal-800 dark:text-teal-400">Platform Features</h3>
            <ul className="space-y-4">
              <li className="flex items-start gap-3 text-sm">
                <span className="text-teal-600 font-bold">✔</span>
                <div>
                  <strong>Interactive Learning Path Builders</strong>
                  <p className="text-xs text-muted mt-0.5">Managers create checklists, embed instructional videos, and attach setup scripts.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-teal-600 font-bold">✔</span>
                <div>
                  <strong>Custom RAG Document Index</strong>
                  <p className="text-xs text-muted mt-0.5">Upload .txt or .md files. Documents are indexed and retrieved using database-backed keyword matching.</p>
                </div>
              </li>
              <li className="flex items-start gap-3 text-sm">
                <span className="text-teal-600 font-bold">✔</span>
                <div>
                  <strong>Admin Monitoring & Metrics</strong>
                  <p className="text-xs text-muted mt-0.5">Keep track of user growth, pathway popularity, and enrollment metrics.</p>
                </div>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}