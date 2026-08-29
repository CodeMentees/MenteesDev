import React, { useEffect, useState } from "react";
import axios from "axios";
import AOS from "aos";
import "aos/dist/aos.css";
import { Briefcase, Link as LinkIcon, ExternalLink, Search, Zap, Clock, TrendingUp } from "lucide-react";
import Loading from "../Components/Helpers/Loading";
import { SkeletonGrid } from "../Components/UI/LoadingSpinner";
import SEOHead from "../seo/SEOHead";


const PlacementSupport = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    AOS.init({ duration: 1000, once: true });
    fetchJobs();
  }, []);

  const fetchJobs = async () => {
    try {
      const response = await axios.get("/api/jobs");
      setJobs(response.data.data);
    } catch (error) {
      console.error("Error fetching jobs:", error);
    } finally {
      setLoading(false);
    }
  };

  const filteredJobs = jobs.filter((job) =>
    job.role.toLowerCase().includes(searchTerm.toLowerCase()) ||
    (job.company && job.company.toLowerCase().includes(searchTerm.toLowerCase()))
  );



  return (
    <div className="min-h-screen bg-dark-box text-white pt-20 pb-12 px-4 sm:px-6 lg:px-8">
      <SEOHead path="/placement-support" />

      {/* Hero Section */}
      <div className="max-w-7xl mx-auto text-center mb-16" data-aos="fade-down">
        <h1 className="text-4xl md:text-6xl font-extrabold mb-6 bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 text-transparent bg-clip-text">
          Live Placement Support
        </h1>
        <p className="text-lg md:text-xl text-gray-400 max-w-3xl mx-auto mb-10">
          Your bridge to top tech opportunities. Hand-picked job openings updated live for the CodeMentees community.
        </p>

        {/* Stats / Features */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto mb-12">
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all">
            <div className="p-3 rounded-xl bg-blue-500/20 text-blue-400 group-hover:scale-110 transition-transform">
              <Zap size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Instant Updates</h3>
              <p className="text-xs text-gray-400">Fresh roles posted live</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all">
            <div className="p-3 rounded-xl bg-purple-500/20 text-purple-400 group-hover:scale-110 transition-transform">
              <TrendingUp size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold">Top Tech Roles</h3>
              <p className="text-xs text-gray-400">Curated for excellence</p>
            </div>
          </div>
          <div className="bg-white/5 backdrop-blur-lg border border-white/10 p-6 rounded-2xl flex items-center gap-4 group hover:bg-white/10 transition-all">
            <div className="p-3 rounded-xl bg-green-500/20 text-green-400 group-hover:scale-110 transition-transform">
              <Clock size={24} />
            </div>
            <div className="text-left">
              <h3 className="font-bold">24/7 Support</h3>
              <p className="text-xs text-gray-400">Always here for you</p>
            </div>
          </div>
        </div>

        {/* Search Bar */}
        <div className="max-w-2xl mx-auto relative group">
          <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 group-focus-within:text-blue-400 transition-colors" />
          <input
            type="text"
            placeholder="Search by role or company..."
            className="w-full bg-white/5 border border-white/10 rounded-full py-4 pl-12 pr-6 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:bg-white/10 transition-all"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      {/* Jobs Grid */}
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center gap-2 mb-8" data-aos="fade-right">
          <div className="w-3 h-3 bg-green-500 rounded-full animate-pulse"></div>
          <h2 className="text-2xl font-bold">Latest Opportunities</h2>
        </div>

        {loading ? (
          <SkeletonGrid count={6} />
        ) : filteredJobs.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredJobs.map((job, index) => (
              <div
                key={job._id}
                className="group relative bg-white/5 backdrop-blur-md border border-white/10 rounded-3xl p-8 hover:bg-white/10 transition-all hover:translate-y--2 duration-300 overflow-hidden"
                data-aos="zoom-in"
                data-aos-delay={index * 100}
              >
                {/* Decorative Gradient Background */}
                <div className="absolute -top-24 -right-24 w-48 h-48 bg-blue-600/10 rounded-full blur-3xl group-hover:bg-blue-600/20 transition-all"></div>
                <div className="absolute -bottom-24 -left-24 w-48 h-48 bg-purple-600/10 rounded-full blur-3xl group-hover:bg-purple-600/20 transition-all"></div>

                <div className="relative z-10">
                  <div className="flex items-start justify-between mb-6">
                    <div className="p-4 bg-gradient-to-br from-blue-500 to-purple-600 rounded-2xl shadow-lg group-hover:rotate-6 transition-transform">
                      <Briefcase size={28} className="text-white" />
                    </div>
                    <span className="text-[10px] uppercase tracking-widest bg-white/10 px-3 py-1 rounded-full border border-white/10 text-gray-400">
                      Posted {new Date(job.postedAt).toLocaleDateString()}
                    </span>
                  </div>

                  <div className="space-y-4 mb-8">
                    <div>
                      <span className="text-xs font-normal text-gray-400 block mb-1">Role:</span>
                      <h3 className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors uppercase leading-tight">
                        {job.role}
                      </h3>
                    </div>
                    <div>
                      <span className="text-xs font-normal text-gray-400 block mb-1">Company:</span>
                      <div className="flex items-center gap-2">
                        <TrendingUp size={16} className="text-purple-400" />
                        <span className="text-lg font-bold text-gray-200 uppercase">{job.company || "Hiring Partner"}</span>
                      </div>
                    </div>
                  </div>

                  <a
                    href={job.applyLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center justify-center gap-2 w-full py-4 bg-white text-dark-box font-bold rounded-2xl hover:bg-blue-500 hover:text-white transition-all transform active:scale-95 group-hover:shadow-[0_0_20px_rgba(59,130,246,0.5)]"
                  >
                    Apply Now
                    <ExternalLink size={18} />
                  </a>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="text-center py-20 bg-white/5 rounded-3xl border border-dashed border-white/10" data-aos="fade-up">
            <p className="text-gray-500 text-lg">No job opportunities found matching your search.</p>
          </div>
        )}
      </div>

      {/* Trust Section */}
      <div className="max-w-4xl mx-auto mt-24 text-center p-12 bg-gradient-to-b from-white/5 to-transparent rounded-3xl border border-white/10" data-aos="fade-up">
        <h2 className="text-2xl font-bold mb-4">Want specialized counseling?</h2>
        <p className="text-gray-400 mb-8">Connect with our mentors to get personalized career guidance and boost your placement chances.</p>
        <a
          href="https://wa.me/918386963382?text=Hi%20I%20want%20career%20counselling%20help.%20Please%20assist%20me%20further"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-block px-8 py-3 bg-blue-600 hover:bg-blue-700 rounded-full font-bold transition-all transform hover:scale-105"
        >
          Contact Career Mentor
        </a>
      </div>
    </div>
  );
};

export default PlacementSupport;
