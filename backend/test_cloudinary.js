import { v2 as cloudinary } from 'cloudinary';
import dotenv from 'dotenv';
dotenv.config();

cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

async function getImages() {
    try {
        const result = await cloudinary.search
            .expression('folder:Events')
            .sort_by('created_at', 'desc')
            .max_results(30)
            .execute();
        console.log(result.resources.map(r => r.secure_url));
    } catch (err) {
        console.error(err);
    }
}
getImages();
