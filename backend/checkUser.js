import User from "./models/userModel.js";
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const checkUser = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);
        const email = process.argv[2];
        if (!email) {
            console.log("Please provide an email as an argument");
            process.exit(1);
        }
        const user = await User.findOne({ email });
        console.log("User found:", JSON.stringify(user, null, 2));
        mongoose.connection.close();
    } catch (error) {
        console.error("Error:", error);
        process.exit(1);
    }
};

checkUser();
