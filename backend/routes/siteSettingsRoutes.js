import express from "express";
import SiteSettings from "../models/siteSettings.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";
import { cachePublic } from "../middlewares/cacheMiddleware.js";

const router = express.Router();

// GET /api/site-settings — public, returns social links
router.get("/", cachePublic(60, 300), async (req, res) => {
  try {
    let settings = await SiteSettings.findOne();
    if (!settings) {
      // Auto-create with defaults on first access
      settings = await SiteSettings.create({});
    }
    res.json({ data: settings, success: true });
  } catch (error) {
    console.error("Error fetching site settings:", error);
    res.status(500).json({ message: "Error fetching site settings", success: false });
  }
});

// PUT /api/site-settings — restricted to manage_site permission
router.put("/", requirePermission("manage_site"), async (req, res) => {
  try {
    const { socialLinks } = req.body;

    const settings = await SiteSettings.findOneAndUpdate(
      {},
      { socialLinks },
      { new: true, upsert: true }
    );

    res.json({ data: settings, success: true, message: "Site settings updated successfully." });
  } catch (error) {
    console.error("Error updating site settings:", error);
    res.status(500).json({ message: "Error updating site settings", success: false });
  }
});

export default router;
