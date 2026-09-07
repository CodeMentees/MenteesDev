import React, { useState, useEffect } from "react";
import api from "../../api/api";
import Toast from "../../Components/UI/Toast";
import { FaInstagram, FaLinkedin, FaTwitter, FaFacebook, FaYoutube, FaDiscord, FaGithub, FaSave } from "react-icons/fa";

const SOCIAL_FIELDS = [
  { key: "instagram",  label: "Instagram",  icon: <FaInstagram />,  placeholder: "https://www.instagram.com/yourhandle" },
  { key: "linkedin",   label: "LinkedIn",   icon: <FaLinkedin />,   placeholder: "https://www.linkedin.com/company/yourcompany" },
  { key: "twitter",    label: "Twitter / X", icon: <FaTwitter />,   placeholder: "https://twitter.com/yourhandle" },
  { key: "facebook",   label: "Facebook",   icon: <FaFacebook />,   placeholder: "https://www.facebook.com/yourpage" },
  { key: "youtube",    label: "YouTube",    icon: <FaYoutube />,    placeholder: "https://www.youtube.com/@yourchannel" },
  { key: "discord",    label: "Discord",    icon: <FaDiscord />,    placeholder: "https://discord.gg/yourserver" },
  { key: "github",     label: "GitHub",     icon: <FaGithub />,     placeholder: "https://github.com/yourorg" },
];

const SocialLinksSettings = () => {
  const [links, setLinks] = useState({
    instagram: "", linkedin: "", twitter: "", facebook: "", youtube: "", discord: "", github: "",
  });
  const [isLoading, setIsLoading] = useState(true);
  const [isSaving, setIsSaving] = useState(false);
  const [toast, setToast] = useState({ visible: false, message: "", type: "success" });

  const showToast = (message, type = "success") => {
    setToast({ visible: true, message, type });
    setTimeout(() => setToast({ visible: false, message: "", type: "success" }), 3000);
  };

  useEffect(() => {
    api.get("/site-settings").then(res => {
      if (res.data?.data?.socialLinks) {
        setLinks({ ...links, ...res.data.data.socialLinks });
      }
    }).catch(() => {
      showToast("Could not load current settings.", "error");
    }).finally(() => setIsLoading(false));
  }, []);

  const handleChange = (key, value) => {
    setLinks(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async (e) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await api.put("/site-settings", { socialLinks: links });
      showToast("Social links saved successfully!", "success");
    } catch (err) {
      showToast(err.response?.data?.message || "Failed to save settings.", "error");
    } finally {
      setIsSaving(false);
    }
  };

  return (
    <section className="p-6 max-w-2xl mx-auto">
      {toast.visible && <Toast message={toast.message} type={toast.type} visible={toast.visible} />}
      <div
        className="rounded-2xl p-8"
        style={{ background: "rgb(var(--dash-panel))", border: "1px solid rgba(var(--dash-border))" }}
      >
        <h2 className="text-2xl font-bold mb-2" style={{ color: "rgb(var(--dash-ink))" }}>
          Social Media Links
        </h2>
        <p className="text-sm mb-8" style={{ color: "rgba(var(--dash-ink), 0.5)" }}>
          Only links with a URL will appear in the footer. Leave blank to hide a platform.
        </p>

        {isLoading ? (
          <div className="space-y-4">
            {[1, 2, 3, 4].map(i => (
              <div key={i} className="h-12 rounded-xl animate-pulse" style={{ background: "rgba(var(--dash-border))" }} />
            ))}
          </div>
        ) : (
          <form onSubmit={handleSave} className="space-y-5">
            {SOCIAL_FIELDS.map(({ key, label, icon, placeholder }) => (
              <div key={key}>
                <label
                  className="flex items-center gap-2 text-xs font-bold tracking-widest uppercase mb-2"
                  style={{ color: "rgba(var(--dash-ink), 0.5)" }}
                >
                  <span style={{ color: "rgb(var(--dash-ink))" }}>{icon}</span>
                  {label}
                </label>
                <input
                  type="url"
                  value={links[key] || ""}
                  onChange={e => handleChange(key, e.target.value)}
                  placeholder={placeholder}
                  className="w-full rounded-xl px-4 py-3 text-sm outline-none transition-all"
                  style={{
                    background: "rgba(var(--dash-border), 0.4)",
                    border: "1px solid rgba(var(--dash-border))",
                    color: "rgb(var(--dash-ink))",
                  }}
                  onFocus={e => e.currentTarget.style.borderColor = "rgb(249,115,22)"}
                  onBlur={e => e.currentTarget.style.borderColor = "rgba(var(--dash-border))"}
                />
              </div>
            ))}

            <button
              type="submit"
              disabled={isSaving}
              className="flex items-center gap-2 px-6 py-3 rounded-xl font-bold text-sm transition-all duration-200 mt-4 disabled:opacity-50"
              style={{ background: "rgb(249,115,22)", color: "#fff" }}
            >
              <FaSave />
              {isSaving ? "Saving..." : "Save Social Links"}
            </button>
          </form>
        )}
      </div>
    </section>
  );
};

export default SocialLinksSettings;
