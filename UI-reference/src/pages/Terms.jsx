export default function Terms() {
  return (
    <section className="surface py-20 md:py-24 fade-in">
      <div className="max-w-4xl mx-auto px-6 space-y-10">
        <div>
          <h1 className="text-4xl font-bold tracking-tight">Terms of Service</h1>
          <p className="text-sm text-muted mt-2">Last updated: June 2, 2026</p>
        </div>

        <div className="panel p-6 md:p-8 space-y-8 text-secondary leading-relaxed">
          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">1. Agreement to Terms</h2>
            <p>
              By accessing or using OnboardAI, you agree to comply with and be bound by these Terms of Service. If your organization has signed a custom enterprise agreement, the terms of that agreement shall take precedence where there is a conflict.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">2. User Account Responsibilities</h2>
            <p>
              Users must keep credentials confidential. Account creation requires valid corporate email addresses. Organizations are responsible for managing roles and offboarding users when they leave the organization.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">3. Acceptable Use Policy</h2>
            <p>
              The platform is designed to store corporate documents and train users. Uploading malicious payloads, indexing illegal assets, or attempts to bypass rate limits and JWT verification protocols are strictly prohibited.
            </p>
          </div>

          <div className="space-y-3">
            <h2 className="text-xl font-bold text-primary">4. Intellectual Property</h2>
            <p>
              OnboardAI owns the codebase, frontend layouts, styles, and trademarks. Users own the materials, courses, and documents they upload or publish to the platform.
            </p>
          </div>

          <div className="space-y-3 border-t border-default pt-6">
            <h2 className="text-lg font-bold text-primary">Contact Us</h2>
            <p className="text-sm">
              If you have any questions or data deletion requests, contact our support team at{" "}
              <a href="mailto:support@onboardai.com" className="text-teal-600 dark:text-teal-400 hover:underline">
                support@onboardai.com
              </a>.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
