import React, { useState, useEffect } from "react";
import { Helmet } from "react-helmet-async";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

const techStacksData = [
  {
    title: "Full Stack Web Development (React + Node.js)",
    icon: "🌐",
    description: "Master the MERN stack and build scalable web applications. Learn frontend architecture, backend APIs, and database management. Transform ideas into production-ready full-stack projects.",
    color: "from-blue-500 to-cyan-400"
  },
  {
    title: "Python & Django Backend Development",
    icon: "🐍",
    description: "Dive deep into robust backend systems with Python and Django. Build secure, fast, and scalable REST APIs. Master database modeling, authentication, and deployment strategies.",
    color: "from-green-500 to-emerald-400"
  },
  {
    title: "Data Structures & Algorithms (C++ / Python / Java)",
    icon: "🧠",
    description: "Crack the coding interviews of top MNCs. Master complex algorithms, optimize time/space complexity, and build strong problem-solving skills that define elite engineers.",
    color: "from-purple-500 to-pink-500"
  },
  {
    title: "C++ Programming & Competitive Coding",
    icon: "⚡",
    description: "Elevate your coding speed and logic. Learn advanced C++ STL, graph theory, and dynamic programming to dominate coding contests and technical rounds.",
    color: "from-indigo-500 to-blue-500"
  },
  {
    title: "Python for Data Science",
    icon: "📊",
    description: "Extract hidden insights from raw data. Master Pandas, NumPy, and Data Visualization tools. Learn statistical analysis and build predictive models to solve real business problems.",
    color: "from-yellow-500 to-orange-400"
  },
  {
    title: "Artificial Intelligence",
    icon: "🤖",
    description: "Step into the future of technology. Build intelligent agents, understand neural networks, and implement smart search algorithms that mimic human cognitive functions.",
    color: "from-red-500 to-rose-400"
  },
  {
    title: "Machine Learning",
    icon: "📈",
    description: "Train models that learn from data. Master Regression, Classification, and Clustering algorithms using Scikit-Learn. Deploy models that power modern recommendation engines.",
    color: "from-teal-500 to-emerald-500"
  },
  {
    title: "Deep Learning & Generative AI",
    icon: "🌌",
    description: "Build the next ChatGPT. Dive into CNNs, RNNs, and Transformers using TensorFlow/PyTorch. Create models capable of generating original text, images, and creative content.",
    color: "from-fuchsia-500 to-purple-600"
  },
  {
    title: "Flutter Mobile Development",
    icon: "📱",
    description: "Build beautiful, natively compiled applications for iOS and Android from a single codebase. Master Dart, state management, and custom UI animations.",
    color: "from-cyan-400 to-blue-500"
  },
  {
    title: "UI/UX Design (Figma)",
    icon: "🎨",
    description: "Design pixel-perfect, user-centric interfaces. Master wireframing, prototyping, and interaction design in Figma. Learn the psychology behind products users love.",
    color: "from-pink-500 to-rose-400"
  },
  {
    title: "DevOps & Cloud (Docker + AWS)",
    icon: "☁️",
    description: "Automate and deploy like a pro. Master containerization with Docker, CI/CD pipelines, and cloud infrastructure management on AWS to ensure high availability.",
    color: "from-orange-500 to-red-500"
  },
  {
    title: "Full Stack MERN + Generative AI",
    icon: "🚀",
    description: "The ultimate modern tech combination. Build full-stack applications and integrate powerful LLMs via APIs to create intelligent, AI-driven SaaS products.",
    color: "from-violet-500 to-fuchsia-500"
  }
];

function SummerInternship() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    college: "",
    techStack: "",
    resume: null,
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");

  // Referral states
  const [referralCode, setReferralCode] = useState("");
  const [adminCodeInput, setAdminCodeInput] = useState("");
  const [generatedLink, setGeneratedLink] = useState("");
  const [copied, setCopied] = useState(false);

  useEffect(() => {
    if (user) {
      setFormData((prev) => ({ ...prev, email: user.email || "" }));
    }
  }, [user]);

  // Extract referral code on page load
  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    const code = queryParams.get("ref") || queryParams.get("code");
    if (code) {
      setReferralCode(code.trim().toUpperCase());
    }
  }, [location.search]);

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "resume") {
      setFormData({ ...formData, [name]: files[0] });
    } else {
      setFormData({ ...formData, [name]: value });
    }
  };

  const handleGenerateLink = (e) => {
    e.preventDefault();
    if (!adminCodeInput.trim()) return;
    const cleanCode = adminCodeInput.trim().toUpperCase();
    const link = `${window.location.origin}${window.location.pathname}?ref=${cleanCode}`;
    setGeneratedLink(link);
    setCopied(false);
  };

  const handleCopyLink = () => {
    navigator.clipboard.writeText(generatedLink);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    try {
      const submitData = new FormData();
      const finalName = referralCode ? `${formData.name}-${referralCode}` : formData.name;
      submitData.append("name", finalName);
      submitData.append("email", formData.email);
      submitData.append("phone", formData.phone);
      submitData.append("college", formData.college);
      submitData.append("techStack", formData.techStack);
      if (formData.resume) {
        submitData.append("resume", formData.resume);
      }

      await axios.post("/api/internships/apply", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setFormData({
        name: "",
        email: user ? user.email : "",
        phone: "",
        college: "",
        techStack: "",
        resume: null,
      });
      const fileInput = document.getElementById("resume");
      if (fileInput) fileInput.value = "";
    } catch (error) {
      console.error(error);
      setStatus("error");
      setErrorMessage(error.response?.data?.message || "Failed to submit application. Please try again.");
    }
  };

  return (
    <div className="bg-[#0B0F19] min-h-screen text-gray-100 overflow-hidden relative selection:bg-purple-500/30">
      <Helmet>
        <title>Summer Training & Internships - CodeMentees</title>
        <meta name="description" content="Apply for our Summer Training and Internship program. Choose from 12+ tech stacks including AI, Data Science, MERN, and more!" />
      </Helmet>

      {/* Decorative background blurs */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-purple-600/20 blur-[120px] rounded-full pointer-events-none opacity-50" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-blue-600/10 blur-[120px] rounded-full pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 relative z-10">
        
        {/* Hero Section */}
        <div className="text-center max-w-4xl mx-auto mb-20">
          <div className="inline-block mb-4 px-4 py-1.5 rounded-full border border-purple-500/30 bg-purple-500/10 text-purple-300 font-medium text-sm tracking-wide">
            APPLICATIONS NOW OPEN FOR 2026
          </div>
          <h1 className="text-5xl md:text-7xl font-extrabold mb-6 tracking-tight text-white">
            Summer <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Internships</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 font-light leading-relaxed">
            Kickstart your career with our immersive industrial training programs. Build real-world projects, master in-demand technologies, and get industry-ready.
          </p>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-3xl">🏆</span> Exclusive Benefits
            </h3>
            <p className="text-gray-300 text-lg">
              Get <strong className="text-purple-400">Government Authorised Certifications</strong> and a <strong className="text-purple-400">Letter of Recommendation</strong> upon finishing the complete Industrial Training!
            </p>
          </div>
        </div>

        {/* Tech Tracks Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Choose Your Path</h2>
            <p className="text-gray-400 text-lg">12 specialized tech tracks curated by industry experts.</p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {techStacksData.map((track, idx) => (
              <div 
                key={idx} 
                className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-300 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                
                <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 origin-bottom-left">
                  {track.icon}
                </div>
                <h3 className="text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors">
                  {track.title}
                </h3>
                <p className="text-gray-400 text-sm leading-relaxed flex-grow">
                  {track.description}
                </p>
              </div>
            ))}
          </div>
        </div>

        {/* Admin Referral Generator Section */}
        {user?.isAdmin && (
          <div className="max-w-3xl mx-auto mb-12 bg-gradient-to-r from-purple-950/40 to-blue-950/40 backdrop-blur-2xl border border-purple-500/30 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
            {/* Top glowing bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-purple-500 to-pink-500" />
            
            <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-6">
              <div>
                <span className="inline-block mb-3 px-3 py-1 rounded-full border border-purple-500/40 bg-purple-500/10 text-purple-300 font-bold text-xs tracking-wider uppercase">
                  Admin Control
                </span>
                <h2 className="text-2xl md:text-3xl font-extrabold text-white">
                  Referral Link Generator
                </h2>
                <p className="text-gray-400 mt-2 text-sm leading-relaxed">
                  Create custom referral codes for marketing and track applicant origins. Applications submitted with these links automatically append the code to the applicant's name.
                </p>
              </div>
              <div className="text-5xl hidden md:block select-none">🔗</div>
            </div>

            <form onSubmit={handleGenerateLink} className="space-y-4">
              <div className="flex flex-col sm:flex-row gap-3">
                <div className="relative flex-grow">
                  <span className="absolute inset-y-0 left-0 pl-4 flex items-center text-gray-500">
                    #
                  </span>
                  <input
                    type="text"
                    required
                    value={adminCodeInput}
                    onChange={(e) => setAdminCodeInput(e.target.value.toUpperCase().replace(/\s+/g, ""))}
                    placeholder="E.G. AMBASSADOR10"
                    className="w-full bg-[#131825] border border-gray-700 rounded-xl pl-9 pr-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors uppercase font-mono tracking-wider"
                  />
                </div>
                <button
                  type="submit"
                  className="px-6 py-3.5 bg-purple-600 hover:bg-purple-500 text-white font-bold rounded-xl shadow-lg transition-all active:scale-95 flex items-center justify-center gap-2 whitespace-nowrap"
                >
                  Generate Link
                </button>
              </div>
            </form>

            {generatedLink && (
              <div className="mt-6 p-4 rounded-xl bg-purple-950/20 border border-purple-500/20 space-y-3">
                <label className="block text-xs font-semibold text-purple-300 uppercase tracking-wider">
                  Your Referral Link
                </label>
                <div className="flex flex-col sm:flex-row gap-2">
                  <input
                    type="text"
                    readOnly
                    value={generatedLink}
                    className="flex-grow bg-black/40 border border-purple-500/10 rounded-lg px-3 py-2 text-sm text-purple-200 font-mono focus:outline-none"
                  />
                  <button
                    onClick={handleCopyLink}
                    className={`px-4 py-2 text-xs font-bold rounded-lg transition-all flex items-center justify-center gap-1.5 shrink-0 ${
                      copied
                        ? "bg-green-600 text-white"
                        : "bg-white text-black hover:bg-gray-200"
                    }`}
                  >
                    {copied ? (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M5 13l4 4L19 7" />
                        </svg>
                        Copied!
                      </>
                    ) : (
                      <>
                        <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8 5H6a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2v-1M8 5a2 2 0 002 2h2a2 2 0 002-2m0 0h2a2 2 0 012 2v3m2 4H10m0 0l3-3m-3 3l3 3" />
                        </svg>
                        Copy Link
                      </>
                    )}
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Application Form Section */}
        <div id="apply-section" className="max-w-3xl mx-auto">
          <div className="bg-gray-900/80 backdrop-blur-2xl border border-gray-700/50 rounded-3xl p-8 md:p-12 shadow-2xl relative overflow-hidden">
            {/* Top glowing bar */}
            <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Submit Your Application</h2>
              <p className="text-gray-400">Secure your spot for the upcoming batch.</p>
            </div>

            {!user ? (
              <div className="text-center py-12 px-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Authentication Required</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Please create an account or sign in to submit your internship application safely.</p>
                <Link 
                  to="/login"
                  state={{ from: location.pathname }}
                  className="inline-block px-8 py-3.5 bg-white text-black hover:bg-gray-200 font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.2)] hover:shadow-[0_0_30px_rgba(255,255,255,0.4)] transform hover:-translate-y-1 transition-all"
                >
                  Sign In to Apply
                </Link>
              </div>
            ) : status === "success" ? (
              <div className="text-center py-10 px-4 bg-green-500/10 border border-green-500/20 rounded-2xl">
                <div className="w-20 h-20 bg-green-500/20 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="text-green-400 text-4xl">✓</span>
                </div>
                <h3 className="text-2xl font-bold text-white mb-2">Application Received!</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Thank you for applying. Our admissions team will review your profile and get back to you shortly.</p>
                <button
                  onClick={() => setStatus("idle")}
                  className="px-8 py-3 bg-gray-800 hover:bg-gray-700 text-white font-semibold rounded-xl transition-colors border border-gray-600"
                >
                  Submit Another
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                {referralCode && (
                  <div className="p-4 bg-purple-950/30 border border-purple-500/40 rounded-xl text-purple-200 text-sm flex items-center gap-3 animate-pulse">
                    <span className="text-lg">🎉</span>
                    <div>
                      Referral Applied: <strong className="text-purple-300 font-mono">#{referralCode}</strong>. Your referral code will be appended to your application name.
                    </div>
                  </div>
                )}
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Full Name *</label>
                    <input required type="text" name="name" value={formData.name} onChange={handleChange} className="w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-600" placeholder="John Doe" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Email Address *</label>
                    <input required readOnly type="email" name="email" value={formData.email} className="w-full bg-black/40 border border-gray-800 rounded-xl px-4 py-3.5 text-gray-500 cursor-not-allowed focus:outline-none transition-colors" placeholder="john@example.com" />
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">Phone Number *</label>
                    <input required type="tel" name="phone" value={formData.phone} onChange={handleChange} className="w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-600" placeholder="+91 9876543210" />
                  </div>
                  <div className="space-y-2">
                    <label className="block text-sm font-medium text-gray-300">College / University *</label>
                    <input required type="text" name="college" value={formData.college} onChange={handleChange} className="w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-600" placeholder="Your College Name" />
                  </div>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Preferred Tech Stack *</label>
                  <select required name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select a Tech Track...</option>
                    {techStacksData.map((track, idx) => (
                      <option key={idx} value={track.title}>{track.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Upload Resume (Optional)</label>
                  <label htmlFor="resume" className="flex flex-col items-center justify-center w-full h-36 border-2 border-gray-700 border-dashed rounded-xl cursor-pointer bg-[#131825]/50 hover:bg-[#131825] hover:border-purple-500/50 transition-all group">
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg className="w-8 h-8 mb-4 text-gray-500 group-hover:text-purple-400 transition-colors" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
                        <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2" />
                      </svg>
                      <p className="mb-2 text-sm text-gray-400 group-hover:text-gray-300 transition-colors"><span className="font-semibold text-white">Click to upload</span> or drag and drop</p>
                      <p className="text-xs text-gray-500">PDF, DOC, DOCX (MAX. 5MB)</p>
                    </div>
                    <input id="resume" name="resume" type="file" className="hidden" accept=".pdf,.doc,.docx" onChange={handleChange} />
                  </label>
                  {formData.resume && (
                    <div className="mt-3 flex items-center gap-2 text-sm text-green-400 bg-green-500/10 py-2 px-3 rounded-lg border border-green-500/20">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                      {formData.resume.name}
                    </div>
                  )}
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading"}
                  className="w-full py-4 px-6 bg-white text-black hover:bg-gray-200 text-lg font-bold rounded-xl shadow-[0_0_20px_rgba(255,255,255,0.15)] hover:shadow-[0_0_30px_rgba(255,255,255,0.3)] transform hover:-translate-y-1 transition-all focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 focus:ring-offset-gray-900 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none flex justify-center items-center gap-2"
                >
                  {status === "loading" ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-black" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                      Submitting...
                    </>
                  ) : (
                    "Submit Application"
                  )}
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default SummerInternship;
