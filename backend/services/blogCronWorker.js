import cron from "node-cron";
import BlogTopicQueue from "../models/blogTopicQueue.js";
import Post from "../models/postModel.js";
import { generateBlogFromAI } from "./geminiService.js";

/**
 * Executes one cycle of checking the queue and publishing the next topic
 */
export async function processNextQueuedBlog() {
  try {
    const pendingItem = await BlogTopicQueue.findOne({ status: "pending" }).sort({ createdAt: 1 });
    if (!pendingItem) {
      return null;
    }

    console.log(`🤖 [AI Blog Scheduler] Found pending topic: "${pendingItem.topic}". Generating article via Gemini AI...`);
    pendingItem.status = "processing";
    await pendingItem.save();

    const blogData = await generateBlogFromAI(pendingItem.topic, pendingItem.category);
    const newPost = new Post(blogData);
    await newPost.save();

    console.log(`✅ [AI Blog Scheduler] Successfully published article: "${newPost.title}" (slug: ${newPost.slug})`);

    // Remove published topic from queue table
    await BlogTopicQueue.findByIdAndDelete(pendingItem._id);
    return newPost;
  } catch (error) {
    console.error("❌ [AI Blog Scheduler] Error processing blog queue item:", error.message);
  }
}

/**
 * Initializes the recurring 2-hour cron job
 */
export function initBlogCronWorker() {
  console.log("⏰ [AI Blog Scheduler] Initializing automated cron job (runs every 2 hours: '0 */2 * * *')");

  // Cron schedule: Every 2 hours
  cron.schedule("0 */2 * * *", async () => {
    console.log("⏰ [AI Blog Scheduler] Cron tick triggered — checking for queued topics...");
    await processNextQueuedBlog();
  });
}
