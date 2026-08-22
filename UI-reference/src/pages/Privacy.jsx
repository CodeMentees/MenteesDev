export default function Privacy() {
  return (
    <section className="surface py-20 md:py-24 fade-in">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Privacy Policy</h1>
          <p className="text-sm text-muted mt-2">Last updated: June 2, 2026</p>
        </div>

        <div className="panel p-6 md:p-8 space-y-8 text-secondary leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">1. Overview</h2>
            <p>
              OnboardAI ("we", "our", or "us") provides a SaaS platform designed to facilitate employee onboarding. This Privacy Policy describes how we collect, use, and safeguard personal and organizational data uploaded to the platform.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">2. Information We Collect</h2>
            <p>
              We collect information necessary to deliver training roadmaps and power our Retrieval-Augmented Generation (RAG) chatbot:
            </p>
            <ul className="list-disc list-inside space-y-2 pl-4">
              <li><strong>User Account Details:</strong> Name, work email, roles, password hashes.</li>
              <li><strong>Company Knowledge Base:</strong> Text files (.txt) and markdown documents (.md) containing corporate policies uploaded by onboarding leads.</li>
              <li><strong>Chat History:</strong> Message logs sent to the AI assistant for contextual reference in conversations.</li>
              <li><strong>Progress Tracking:</strong> Section-level task completion states to compute training percentages.</li>
            </ul>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">3. How Information is Processed</h2>
            <p>
              Company documents uploaded to the Knowledge Base are indexed inside our secure MongoDB database. When users submit prompts to the AI Assistant, relevant excerpts from these documents are retrieved to compile a contextual prompt for the LLM. 
            </p>
            <p>
              We do **not** sell company documents or user details to third-party data brokers. Chat data is processed via secure API endpoints and is not used to train public language models.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">4. Data Security</h2>
            <p>
              We employ strict security measures to protect your data, including HS256 JWT validation, salt-hashed passwords, rate limiting, and secure file size caps on incoming network payloads.
            </p>
          </div>

          <div className="space-y-3 border-t border-default pt-6">
            <h2 className="text-lg font-bold text-primary">Contact Us</h2>
            <p className="text-sm">
              If you have any questions or data deletion requests, contact our compliance officer at{" "}
              <a href="mailto:privacy@onboardai.com" className="text-teal-600 dark:text-teal-400 hover:underline">
                privacy@onboardai.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
