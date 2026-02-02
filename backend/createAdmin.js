
import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./models/userModel.js";
import path from "path";
import { fileURLToPath } from "url";

// Config setups
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
dotenv.config({ path: path.join(__dirname, ".env") });

const makeAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB");

        if (!process.env.ADMIN_EMAIL || !process.env.ADMIN_PASSWORD) {
            console.error("ADMIN_EMAIL and ADMIN_PASSWORD must be set in .env file");
            process.exit(1);
        }

        const email = process.env.ADMIN_EMAIL;
        const password = process.env.ADMIN_PASSWORD;
        const name = process.env.ADMIN_NAME || "Admin User";

        let user = await User.findOne({ email });

        if (user) {
            user.isAdmin = true;
            await user.save();
            console.log(`User ${email} is now an Admin.`);
        } else {
            user = await User.create({
                name,
                email,
                password,
                isAdmin: true,
            });
            console.log(`Admin user created: ${email}`);
        }

        mongoose.disconnect();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

makeAdmin();
