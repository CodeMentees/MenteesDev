import React, { useState } from "react";
import { FaMapMarkerAlt, FaPhoneAlt, FaEnvelope } from "react-icons/fa";
import { useQueryAPI } from "../../api/queryApi";

const Contact = () => {
  const { createQuery } = useQueryAPI();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    mobile: "",
    program: "",
    message: ""
  });
  const [status, setStatus] = useState({ type: "", message: "" });
  const [isSubmitting, setIsSubmitting] = useState(false);

  React.useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setStatus({ type: "", message: "" });

    try {
      // Map frontend fields to backend fields
      const payload = {
        name: formData.name,
        email: formData.email,
        phoneNumber: formData.mobile,
        courseName: formData.program,
        message: formData.message
      };

      await createQuery(payload);
      setStatus({ type: "success", message: "Thank you! Your message has been sent successfully." });
      setFormData({ name: "", email: "", mobile: "", program: "", message: "" });
    } catch (error) {
      console.error("Form Submission Error:", error);
      setStatus({
        type: "error",
        message: error.message || "Failed to send message. Please try again later."
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-dark-background text-dark-text font-sans">
      {/* Header Section */}
      <div className="bg-gradient-to-r from-blue-900 to-purple-900 py-16 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">Contact Us</h1>
        <p className="text-gray-300 text-lg">We'd love to hear from you. Reach out to us!</p>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-12 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

          {/* Left Column: Contact Info */}
          <div className="space-y-8">
            <div>
              <h2 className="text-3xl font-bold text-white mb-6">Get in Touch</h2>
              <p className="text-gray-400 mb-8 leading-relaxed">
                Have questions about our courses or training programs?
                Contact us directly or visit our office. We are here to help you build your career in tech.
              </p>
            </div>

            {/* Contact Cards */}
            <div className="space-y-6">
              {/* Visit Us */}
              <div className="bg-dark-card p-6 rounded-xl shadow-lg border border-gray-800 flex items-start gap-4 hover:border-blue-500 transition-colors">
                <div className="bg-blue-500/20 p-3 rounded-full text-blue-500 text-2xl">
                  <FaMapMarkerAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Visit Us</h3>
                  <p className="text-gray-400">
                    Vishesh Khand Gomti Nagar<br />
                    Lucknow, Uttar Pradesh, 226010
                  </p>
                </div>
              </div>

              {/* Call Us */}
              <div className="bg-dark-card p-6 rounded-xl shadow-lg border border-gray-800 flex items-start gap-4 hover:border-green-500 transition-colors">
                <div className="bg-green-500/20 p-3 rounded-full text-green-500 text-2xl">
                  <FaPhoneAlt />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Call Us</h3>
                  <p className="text-gray-400 font-medium">+91 8386963382</p>
                </div>
              </div>

              {/* Email Us */}
              <div className="bg-dark-card p-6 rounded-xl shadow-lg border border-gray-800 flex items-start gap-4 hover:border-red-500 transition-colors">
                <div className="bg-red-500/20 p-3 rounded-full text-red-500 text-2xl">
                  <FaEnvelope />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white mb-2">Email Us</h3>
                  <p className="text-gray-400">codementees@gmail.com</p>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column: Contact Form */}
          <div className="bg-dark-card p-8 rounded-2xl shadow-xl border border-gray-800">
            <h2 className="text-2xl font-bold text-white mb-6">Send us a Message</h2>

            {status.message && (
              <div className={`mb-6 p-4 rounded-lg text-sm ${status.type === "success" ? "bg-green-500/20 text-green-400 border border-green-500/50" : "bg-red-500/20 text-red-400 border border-red-500/50"
                }`}>
                {status.message}
              </div>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Full Name</label>
                  <input
                    type="text"
                    name="name"
                    placeholder="John Doe"
                    value={formData.name}
                    onChange={handleChange}
                    className="w-full bg-[#1e2736] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Email Address</label>
                  <input
                    type="email"
                    name="email"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={handleChange}
                    className="w-full bg-[#1e2736] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Phone Number</label>
                  <input
                    type="tel"
                    name="mobile"
                    placeholder="+91 98765 43210"
                    value={formData.mobile}
                    onChange={handleChange}
                    className="w-full bg-[#1e2736] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  />
                </div>
                <div>
                  <label className="block text-gray-400 mb-2 text-sm">Interested Program</label>
                  <select
                    name="program"
                    value={formData.program}
                    onChange={handleChange}
                    className="w-full bg-[#1e2736] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                    required
                  >
                    <option value="">Select a Course</option>
                    <optgroup label="Programming Languages">
                      <option value="Python Programming">Python Programming</option>
                      <option value="JavaScript">JavaScript</option>
                      <option value="C / C++">C / C++</option>
                      <option value="Java">Java</option>
                    </optgroup>
                    <optgroup label="Data Structures & Algorithms">
                      <option value="DSA with C++">DSA with C++</option>
                      <option value="DSA with Java">DSA with Java</option>
                      <option value="DSA with Python">DSA with Python</option>
                    </optgroup>
                    <optgroup label="Web Development">
                      <option value="Full Stack Development">Full Stack Development</option>
                      <option value="Frontend Development (React)">Frontend Development (React)</option>
                      <option value="Backend Development (Node.js)">Backend Development (Node.js)</option>
                      <option value="MERN Stack">MERN Stack</option>
                    </optgroup>
                    <optgroup label="Other Programs">
                      <option value="Machine Learning & AI">Machine Learning & AI</option>
                      <option value="Data Science">Data Science</option>
                      <option value="System Design">System Design</option>
                      <option value="Spring Bootcamp">Spring Bootcamp</option>
                      <option value="Summer Training">Summer Training</option>
                      <option value="Winter Training">Winter Training</option>
                      <option value="Other">Other</option>
                    </optgroup>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-gray-400 mb-2 text-sm">Your Message</label>
                <textarea
                  name="message"
                  rows="4"
                  placeholder="Tell us more about your query..."
                  value={formData.message}
                  onChange={handleChange}
                  className="w-full bg-[#1e2736] border border-gray-700 rounded-lg px-4 py-3 text-white focus:outline-none focus:border-blue-500 focus:ring-1 focus:ring-blue-500 transition-all"
                  required
                ></textarea>
              </div>

              <button
                type="submit"
                disabled={isSubmitting}
                className={`w-full bg-gradient-to-r from-red-500 to-orange-500 text-white font-bold py-3 rounded-lg shadow-md hover:shadow-lg hover:from-red-600 hover:to-orange-600 transition-all transform hover:-translate-y-1 ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
              >
                {isSubmitting ? "Sending..." : "Send Message"}
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="w-full h-96 mt-12 mb-[-2rem] filter grayscale hover:grayscale-0 transition-all duration-500">
        <iframe
          title="Code Mentees Location"
          src="https://maps.google.com/maps?q=Code+Mentees+Lucknow&t=&z=13&ie=UTF8&iwloc=&output=embed"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
        ></iframe>
      </div>
    </div>
  );
};

export default Contact;