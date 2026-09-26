import React, { useState, useEffect } from "react";
import axios from "axios";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";
import ReactMarkdown from "react-markdown";

function Careers() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = useSelector((state) => state.auth);

  const [careers, setCareers] = useState([]);
  const [loadingCareers, setLoadingCareers] = useState(true);

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    phone: "",
    college: "",
    techStack: "",
    resume: null,
  });

  const [status, setStatus] = useState("idle");
  const [errorMessage, setErrorMessage] = useState("");
  const [isApplyModalOpen, setIsApplyModalOpen] = useState(false);
  const [myApplications, setMyApplications] = useState([]);
  const [copiedJob, setCopiedJob] = useState("");
  const [acknowledged, setAcknowledged] = useState(false);

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

  useEffect(() => {
    const fetchCareers = async () => {
      try {
        const response = await axios.get("/api/careers");
        const activeCareers = response.data.data.filter(c => c.isActive);
        setCareers(activeCareers);

        // Check if there's a direct job link in URL
        const queryParams = new URLSearchParams(window.location.search);
        const jobParam = queryParams.get("job");
        if (jobParam) {
          const matchedJob = activeCareers.find(c => c.title.toLowerCase() === jobParam.toLowerCase());
          if (matchedJob) {
            setTimeout(() => {
              const elementId = `job-${matchedJob.title.replace(/\s+/g, '-').toLowerCase()}`;
              const element = document.getElementById(elementId);
              if (element) {
                element.scrollIntoView({ behavior: "smooth", block: "center" });
                // Flash highlight effect
                element.classList.add("ring-2", "ring-purple-500", "ring-offset-4", "ring-offset-[#0B0F19]", "scale-[1.02]", "shadow-[0_0_30px_rgba(168,85,247,0.3)]");
                setTimeout(() => {
                  element.classList.remove("ring-2", "ring-purple-500", "ring-offset-4", "ring-offset-[#0B0F19]", "scale-[1.02]", "shadow-[0_0_30px_rgba(168,85,247,0.3)]");
                }, 2000);
              }
            }, 500);
          }
        }
      } catch (error) {
        console.error("Failed to fetch careers:", error);
      } finally {
        setLoadingCareers(false);
      }
    };
    fetchCareers();
  }, []);

  useEffect(() => {
    if (user) {
      const fetchMyApps = async () => {
        try {
          const res = await axios.get("/api/careers/my-applications");
          setMyApplications(res.data.data);
        } catch (error) {
          console.error("Failed to fetch user applications", error);
        }
      };
      fetchMyApps();
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

  const handleCopyJobLink = (trackTitle, e) => {
    e.stopPropagation();
    const link = `${window.location.origin}${window.location.pathname}?job=${encodeURIComponent(trackTitle)}`;
    navigator.clipboard.writeText(link);
    setCopiedJob(trackTitle);
    setTimeout(() => setCopiedJob(""), 2000);
  };

  const handleApplyClick = (trackTitle) => {
    if (!user) {
      navigate("/login", { state: { from: location.pathname + "?job=" + encodeURIComponent(trackTitle) } });
      return;
    }
    setFormData(prev => ({ ...prev, techStack: trackTitle }));
    setIsApplyModalOpen(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setStatus("loading");
    setErrorMessage("");

    // Resume is mandatory
    if (!formData.resume) {
      setStatus("error");
      setErrorMessage("Resume is required. Please upload your resume (PDF, DOC, or DOCX).");
      return;
    }

    try {
      // Submit the application
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

      await axios.post("/api/careers/apply", submitData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      setStatus("success");
      setFormData({
        name: user ? user.name : "",
        email: user ? user.email : "",
        phone: "",
        college: "",
        techStack: "",
        resume: null,
      });
      setAcknowledged(false);
      setTimeout(() => {
        setIsApplyModalOpen(false);
        setStatus("idle");
        // Re-fetch applications
        axios.get("/api/careers/my-applications").then(res => setMyApplications(res.data.data)).catch(console.error);
      }, 3000);
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
            <span className="bg-clip-text text-transparent bg-gradient-to-r from-purple-400 via-pink-500 to-red-500">Careers</span>
          </h1>
          <p className="text-xl md:text-2xl text-gray-400 mb-10 font-light leading-relaxed">
            Kickstart your career with our open opportunities. Join our team, master in-demand technologies, and build real-world projects.
          </p>
          
          <div className="bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl p-6 shadow-2xl transform hover:scale-[1.02] transition-all duration-300 mx-auto max-w-2xl">
            <h3 className="text-2xl font-bold text-white mb-2 flex items-center justify-center gap-3">
              <span className="text-yellow-400 text-3xl">🏆</span> Grow With Us
            </h3>
            <p className="text-gray-300 text-lg">
              Enjoy a <strong className="text-purple-400">collaborative environment</strong> and <strong className="text-purple-400">continuous learning</strong> as part of our core team!
            </p>
          </div>
        </div>

        {/* Tech Tracks Section */}
        <div className="mb-24">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-white mb-4">Available Positions</h2>
            <p className="text-gray-400 text-lg">Explore open roles and find your perfect fit.</p>
          </div>
          
          {loadingCareers ? (
            <div className="text-center text-gray-400 py-10">Loading positions...</div>
          ) : careers.length === 0 ? (
            <div className="text-center text-gray-400 py-10">No open positions available at the moment. Check back later!</div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {careers.map((track, idx) => (
                <div 
                  key={idx} 
                  id={`job-${track.title.replace(/\s+/g, '-').toLowerCase()}`}
                  className="group relative bg-gray-900/40 backdrop-blur-sm border border-gray-800 rounded-2xl p-6 hover:border-gray-600 transition-all duration-500 hover:shadow-[0_0_30px_rgba(168,85,247,0.15)] flex flex-col h-full"
                >
                  <div className={`absolute inset-0 bg-gradient-to-br ${track.color} opacity-0 group-hover:opacity-5 rounded-2xl transition-opacity duration-300`} />
                  
                  <div className="text-4xl mb-4 transform group-hover:scale-110 group-hover:-rotate-3 transition-transform duration-300 origin-bottom-left">
                    {track.icon}
                  </div>
                  <div className="flex items-center gap-3 mb-3">
                    <h3 className="text-xl font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-colors m-0">
                      {track.title}
                    </h3>
                    <span className="px-2.5 py-1 bg-white/10 text-gray-300 rounded-md text-[10px] font-bold uppercase tracking-wider border border-white/5 shadow-sm">
                      {track.jobType || "Internship"}
                    </span>
                  </div>
                  <div className="text-gray-400 text-sm leading-relaxed flex-grow">
                    <ReactMarkdown
                      components={{
                        p: ({node, ...props}) => <p className="mb-2 last:mb-0" {...props} />,
                        ul: ({node, ...props}) => <ul className="list-disc pl-5 mb-2 space-y-1 marker:text-purple-500" {...props} />,
                        ol: ({node, ...props}) => <ol className="list-decimal pl-5 mb-2 space-y-1 marker:text-purple-500" {...props} />,
                        li: ({node, ...props}) => <li className="text-gray-300" {...props} />,
                        strong: ({node, ...props}) => <strong className="font-bold text-gray-100" {...props} />,
                        em: ({node, ...props}) => <em className="italic text-gray-300" {...props} />,
                        h1: ({node, ...props}) => <h1 className="text-lg font-bold text-white mb-2" {...props} />,
                        h2: ({node, ...props}) => <h2 className="text-md font-bold text-white mb-2" {...props} />,
                        h3: ({node, ...props}) => <h3 className="text-base font-bold text-white mb-2" {...props} />,
                        a: ({node, ...props}) => <a className="text-purple-400 hover:underline" {...props} />
                      }}
                    >
                      {track.description}
                    </ReactMarkdown>
                  </div>
                  {track.preferredBackground && (
                    <div className="mt-2 text-xs font-semibold text-gray-300 bg-gray-800/50 px-3 py-1.5 rounded-lg border border-gray-700/50 inline-block w-fit">
                      🎓 Background: {track.preferredBackground}
                    </div>
                  )}
                  {track.stipend && (
                    <div className="mt-4 inline-flex items-center gap-2 bg-purple-500/10 text-purple-300 border border-purple-500/20 px-3 py-1.5 rounded-lg text-xs font-semibold w-fit">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
                      Stipend: {track.stipend}
                    </div>
                  )}
                  
                  <div className="mt-6 pt-4 border-t border-gray-800 flex gap-2">
                    {myApplications.some(app => app.techStack === track.title) ? (
                      <button 
                        disabled
                        className="flex-grow py-3 px-2 sm:px-4 bg-gray-800 text-gray-400 text-sm sm:text-base font-bold rounded-xl flex justify-center items-center gap-1 sm:gap-2 cursor-not-allowed border border-gray-700 whitespace-nowrap"
                      >
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                        Already Applied
                      </button>
                    ) : (
                      <button 
                        onClick={() => handleApplyClick(track.title)}
                        className="flex-grow py-3 px-2 sm:px-4 bg-purple-600 hover:bg-purple-500 text-white text-sm sm:text-base font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center gap-1 sm:gap-2 whitespace-nowrap"
                      >
                        Apply Now
                        <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3" /></svg>
                      </button>
                    )}
                    <button
                      onClick={(e) => handleCopyJobLink(track.title, e)}
                      title="Copy direct link to this job"
                      className="py-3 px-0 bg-gray-800 hover:bg-gray-700 text-gray-300 font-bold rounded-xl shadow-lg transition-all transform hover:-translate-y-1 active:scale-95 flex justify-center items-center border border-gray-700 w-12 sm:w-14 flex-shrink-0 relative group"
                    >
                      {copiedJob === track.title ? (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5 text-green-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" /></svg>
                      ) : (
                        <svg className="w-4 h-4 sm:w-5 sm:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13.828 10.172a4 4 0 00-5.656 0l-4 4a4 4 0 105.656 5.656l1.102-1.101m-.758-4.899a4 4 0 005.656 0l4-4a4 4 0 00-5.656-5.656l-1.1 1.1" /></svg>
                      )}
                      
                      {/* Tooltip */}
                      <span className="absolute -top-10 left-1/2 -translate-x-1/2 bg-black text-white text-[10px] px-2 py-1 rounded opacity-0 group-hover:opacity-100 transition-opacity whitespace-nowrap pointer-events-none">
                        {copiedJob === track.title ? "Copied!" : "Copy Link"}
                      </span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          )}
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

        {/* Application Modal */}
        {isApplyModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/80 backdrop-blur-sm overflow-y-auto">
            <div className="relative w-full max-w-3xl animate-in fade-in zoom-in-95 duration-200 mt-20 mb-10">
              <button 
                onClick={() => setIsApplyModalOpen(false)}
                className="absolute -top-12 right-0 md:-right-12 text-gray-400 hover:text-white p-2 focus:outline-none"
              >
                <svg className="w-8 h-8" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" /></svg>
              </button>
              
              <div className="bg-gray-900 border border-gray-700/50 rounded-3xl p-8 md:p-10 shadow-2xl relative overflow-hidden">
                {/* Top glowing bar */}
                <div className="absolute top-0 left-0 w-full h-1.5 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold text-white mb-3">Submit Your Application</h2>
              <p className="text-gray-400">Secure your spot for the upcoming batch.</p>
            </div>

            {!user && false ? (
              // Hiding the auth block since we allow unregistered users to apply now
              <div className="text-center py-12 px-4 bg-black/20 rounded-2xl border border-white/5">
                <div className="w-20 h-20 bg-purple-500/20 rounded-full flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(168,85,247,0.3)]">
                  <svg className="w-10 h-10 text-purple-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"></path></svg>
                </div>
                <h3 className="text-2xl font-bold text-white mb-3">Authentication Required</h3>
                <p className="text-gray-400 mb-8 max-w-md mx-auto">Please create an account or sign in to submit your career application safely.</p>
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
                <p className="text-gray-400 mb-8 max-w-md mx-auto">
                  {user 
                    ? "Thank you for applying. Our hiring team will review your profile and get back to you shortly."
                    : "Application submitted! We have also created an account for you. Please check your email to verify your account."}
                </p>
                {/* Submit Another removed based on feedback */}
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
                    <input required readOnly={!!user} type="email" name="email" value={formData.email} onChange={handleChange} className={`w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors placeholder-gray-600 ${user ? 'opacity-50 cursor-not-allowed' : ''}`} placeholder="john@example.com" />
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
                  <label className="block text-sm font-medium text-gray-300">Role / Career Track *</label>
                  <select required name="techStack" value={formData.techStack} onChange={handleChange} className="w-full bg-[#131825] border border-gray-700 rounded-xl px-4 py-3.5 text-white focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors appearance-none cursor-pointer">
                    <option value="" disabled>Select a Role...</option>
                    {careers.map((track, idx) => (
                      <option key={idx} value={track.title}>{track.title}</option>
                    ))}
                  </select>
                </div>

                <div className="space-y-2">
                  <label className="block text-sm font-medium text-gray-300">Upload Resume <span className="text-red-400">*</span></label>
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

                <div className="flex items-start gap-3 mt-4">
                  <div className="flex items-center h-5">
                    <input
                      id="acknowledge"
                      type="checkbox"
                      checked={acknowledged}
                      onChange={(e) => setAcknowledged(e.target.checked)}
                      className="w-5 h-5 rounded border-gray-600 text-purple-600 focus:ring-purple-500 bg-[#131825] cursor-pointer"
                      required
                    />
                  </div>
                  <label htmlFor="acknowledge" className="text-sm text-gray-400 cursor-pointer leading-relaxed">
                    I acknowledge that the information provided above is accurate, and I have read all the requirements and details for this role on the careers page. I understand that submitting false information may result in disqualification.
                  </label>
                </div>

                {status === "error" && (
                  <div className="p-4 bg-red-900/30 border border-red-500/50 rounded-xl text-red-200 text-sm flex items-start gap-3">
                    <svg className="w-5 h-5 shrink-0 text-red-400 mt-0.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
                    {errorMessage}
                  </div>
                )}

                <button
                  type="submit"
                  disabled={status === "loading" || !acknowledged}
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
        )}
      </div>
    </div>
  );
}

export default Careers;
