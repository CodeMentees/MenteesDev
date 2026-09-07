import mongoose from "mongoose";

/**
 * SiteSettings model — a singleton document that stores site-wide config.
 * Social links: only store URL if the platform is active. Empty string = not shown.
 */
const siteSettingsSchema = new mongoose.Schema({
  socialLinks: {
    instagram:  { type: String, default: "https://www.instagram.com/codementees?igsh=MW41cHdnYmN2YnJ0Nw==" },
    linkedin:   { type: String, default: "https://www.linkedin.com/company/codementees/" },
    twitter:    { type: String, default: "" },
    facebook:   { type: String, default: "" },
    youtube:    { type: String, default: "" },
    discord:    { type: String, default: "" },
    github:     { type: String, default: "" },
  },
}, { timestamps: true });

const SiteSettings = mongoose.model("SiteSettings", siteSettingsSchema);

export default SiteSettings;
