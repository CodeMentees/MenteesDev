import { Router } from "express";
import Home from "../models/home.js"
import { requirePermission } from "../middlewares/rbacMiddleware.js";
const router = Router();

// Define routes
router.get("/", async(req,res)=>{
    try {
        const siteData = await Home.findOne();
        res.send({data:siteData,message:"Site details get successfully ! "})
    } catch (error) {
        res.send({message:"error while getting data "})
    }
});

router.use(requirePermission("manage_site"))

router.post("/", async (req, res) => {
    try {
        const { siteName, carasouls, contactNumber, features } = req.body;

        const siteData = await Home.findOneAndUpdate(
            {}, // Find the first document (since there's only one)
            { siteName, carasouls, contactNumber, features }, // Update fields
            { new: true, upsert: true } // Create if not found, return updated document
        );

        res.send({ data: siteData, message: "Site details updated successfully!" });
    } catch (error) {
        console.log(error)
        res.status(500).send({ message: "Error while updating data" });
    }
});


export default router;
