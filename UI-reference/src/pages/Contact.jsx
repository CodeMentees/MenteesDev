import { useState } from "react";
import { toast } from "../utils/toast";

export default function Contact() {
  const [form, setForm] = useState({ name: "", email: "", subject: "", message: "" });
  const [submitting, setSubmitting] = useState(false);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitting(true);
    
    // Simulate contact submission
    setTimeout(() => {
      toast.success("🎉 Your support request has been received! Our Onboarding team will get back to you shortly.");
      setForm({ name: "", email: "", subject: "", message: "" });
      setSubmitting(false);
    }, 1200);
  };

  return (
    <section className="surface py-20 md:py-28 fade-in">
      <div className="max-w-6xl mx-auto px-6 space-y-12">
        {/* HEADER */}
        <div className="text-center max-w-2xl mx-auto space-y-4">
          <span className="badge-soft text-xs uppercase tracking-wider font-bold">Get In Touch</span>
          <h1 className="text-4xl font-bold tracking-tight">Onboarding Support Desk</h1>
          <p className="text-secondary leading-relaxed">
            Have questions about your setup, IT provisioning, or company policies? Send us a message and our support leads will assist you.
          </p>
        </div>

        {/* CONTENT SPLIT */}
        <div className="grid lg:grid-cols-12 gap-8 items-start">
          {/* CONTACT INFO CARD */}
          <div className="lg:col-span-5 space-y-6">
            <div className="panel p-6 space-y-6 bg-gradient-to-br from-teal-500/5 to-transparent">
              <h2 className="text-2xl font-bold">Contact Directory</h2>
              <p className="text-sm text-secondary">
                For urgent technical setup issues, please reach out via internal Slack or call the local IT hotline.
              </p>

              <div className="space-y-4 text-sm">
                <div className="flex gap-4 items-start">
                  <span className="text-2xl">✉</span>
                  <div>
                    <h4 className="font-bold">Email Support</h4>
                    <a href="mailto:support@onboardai.com" className="text-teal-600 dark:text-teal-400 hover:underline">
                      support@onboardai.com
                    </a>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-2xl">📞</span>
                  <div>
                    <h4 className="font-bold">IT Hotline</h4>
                    <p className="text-secondary">+1 (555) 302-9900 (ext. 4)</p>
                    <p className="text-xs text-muted mt-0.5">Mon-Fri, 9am - 6pm EST</p>
                  </div>
                </div>

                <div className="flex gap-4 items-start">
                  <span className="text-2xl">📍</span>
                  <div>
                    <h4 className="font-bold">Corporate Headquarters</h4>
                    <p className="text-secondary">
                      OnboardAI Technologies Inc.<br />
                      500 Innovation Way, Suite 100<br />
                      Boston, MA 02110
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* CONTACT FORM */}
          <div className="lg:col-span-7">
            <div className="panel p-6 md:p-8">
              <h2 className="text-2xl font-bold mb-6">Send Message</h2>
              
              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid sm:grid-cols-2 gap-4">
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary uppercase">Full Name</label>
                    <input
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      className="input w-full"
                      value={form.name}
                      onChange={handleChange}
                      required
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold text-secondary uppercase">Work Email</label>
                    <input
                      name="email"
                      type="email"
                      placeholder="jane.doe@company.com"
                      className="input w-full"
                      value={form.email}
                      onChange={handleChange}
                      required
                    />
                  </div>
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary uppercase">Subject</label>
                  <input
                    name="subject"
                    type="text"
                    placeholder="e.g., VPN Access Setup Issue"
                    className="input w-full"
                    value={form.subject}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="space-y-1.5">
                  <label className="text-xs font-bold text-secondary uppercase">Message Details</label>
                  <textarea
                    name="message"
                    rows="5"
                    placeholder="Describe the issue or query in detail..."
                    className="input w-full"
                    value={form.message}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={submitting}
                  className="w-full dash-cta flex items-center justify-center gap-2 cursor-pointer disabled:opacity-50"
                >
                  {submitting ? "Sending..." : "Submit Support Request"}
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
