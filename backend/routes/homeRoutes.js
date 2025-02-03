import { Router } from "express";
import Home from "../models/home.js"
const router = Router();

// Define routes
router.get("/", async(req,res)=>{
    try {
        const siteData = await Home.find();
        res.send({data:siteData,message:"Site details get successfully ! "})
    } catch (error) {
        res.send({message:"error while getting data "})
    }
});

export default router;
