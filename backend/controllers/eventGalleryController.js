import asyncHandler from "express-async-handler";
import { v2 as cloudinary } from 'cloudinary';

/**
 * @swagger
 * /api/events/gallery:
 *   get:
 *     summary: Get all event images from Cloudinary Events folder
 *     tags: [Event]
 *     responses:
 *       200:
 *         description: Images fetched successfully
 */
export const getEventGallery = asyncHandler(async (req, res) => {
    try {
        const result = await cloudinary.search
            .expression('folder:Events')
            .sort_by('created_at', 'desc')
            .max_results(50)
            .execute();
            
        const images = result.resources.map(r => r.secure_url);
        
        res.json({
            success: true,
            images,
            message: "Gallery images fetched successfully"
        });
    } catch (error) {
        console.error("Cloudinary fetch error:", error);
        res.status(500).json({ success: false, message: "Failed to fetch gallery images" });
    }
});
