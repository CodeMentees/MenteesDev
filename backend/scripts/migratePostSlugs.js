/**
 * One-off migration script: generates slug for all existing posts that don't have one.
 * Run once after deploying: node backend/scripts/migratePostSlugs.js
 */
import mongoose from "mongoose";
import dotenv from "dotenv";
import Post from "../models/postModel.js";

import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

dotenv.config({ path: path.join(__dirname, "..", ".env") });

const generateSlug = (title) => {
  const base = title
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9\s-]/g, "")
    .replace(/\s+/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
  return `${base}-${Date.now().toString(36)}`;
};

async function migrate() {
  await mongoose.connect(process.env.MONGODB_URI);
  console.log("Connected to MongoDB");

  const posts = await Post.find({ slug: { $exists: false } });
  console.log(`Found ${posts.length} posts without slugs`);

  let updated = 0;
  for (const post of posts) {
    post.slug = generateSlug(post.title);
    try {
      await post.save();
      updated++;
      console.log(`✅ ${post.title} → ${post.slug}`);
    } catch (err) {
      // Handle duplicate slug by appending post _id
      post.slug = `${generateSlug(post.title)}-${post._id.toString().slice(-4)}`;
      await post.save();
      console.log(`✅ (retry) ${post.title} → ${post.slug}`);
      updated++;
    }
  }

  console.log(`\n✅ Migration complete: ${updated}/${posts.length} posts updated`);
  await mongoose.disconnect();
}

migrate().catch((err) => {
  console.error("Migration failed:", err);
  process.exit(1);
});
