import Course from "../models/course.js";
import Post from "../models/postModel.js";
import BlogTopicQueue from "../models/blogTopicQueue.js";
import CourseCategory from "../models/courseCategory.js";
import { generateCourseFromAI, generateBlogFromAI } from "../services/geminiService.js";

/**
 * @desc    Generate course JSON structure using Gemini AI
 * @route   POST /api/ai/generate-course
 * @access  Private/Admin
 */
export const generateCourse = async (req, res) => {
  try {
    const { title, categoryId } = req.body;
    if (!title) {
      return res.status(400).json({ success: false, message: "Course title is required" });
    }

    let categoryName = "Web Development";
    if (categoryId) {
      const cat = await CourseCategory.findById(categoryId);
      if (cat) categoryName = cat.name;
    }

    const courseData = await generateCourseFromAI({ title, categoryId, categoryName });
    res.status(200).json({
      success: true,
      data: courseData,
    });
  } catch (error) {
    console.error("Error generating course with AI:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Save AI-generated or manually edited course to DB
 * @route   POST /api/ai/save-course
 * @access  Private/Admin
 */
export const saveCourse = async (req, res) => {
  try {
    const coursePayload = req.body;
    if (!coursePayload.name || !coursePayload.category) {
      return res.status(400).json({
        success: false,
        message: "Course name and category are required",
      });
    }

    const newCourse = new Course(coursePayload);
    await newCourse.save();

    res.status(201).json({
      success: true,
      message: "Course successfully saved to database!",
      data: newCourse,
    });
  } catch (error) {
    console.error("Error saving course to database:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Get all queued blog topics
 * @route   GET /api/ai/blog-queue
 * @access  Private/Admin
 */
export const getBlogQueue = async (req, res) => {
  try {
    const queue = await BlogTopicQueue.find().sort({ createdAt: -1 });
    res.status(200).json({
      success: true,
      count: queue.length,
      data: queue,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Add topic(s) to blog queue
 * @route   POST /api/ai/blog-queue
 * @access  Private/Admin
 */
export const addToBlogQueue = async (req, res) => {
  try {
    const { topic, category } = req.body;
    if (!topic || !topic.trim()) {
      return res.status(400).json({ success: false, message: "Topic name is required" });
    }

    const newQueueItem = new BlogTopicQueue({
      topic: topic.trim(),
      category: category || "Technology",
      status: "pending",
    });

    await newQueueItem.save();

    res.status(201).json({
      success: true,
      message: "Topic added to AI blog schedule queue!",
      data: newQueueItem,
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Delete topic from queue
 * @route   DELETE /api/ai/blog-queue/:id
 * @access  Private/Admin
 */
export const deleteFromBlogQueue = async (req, res) => {
  try {
    const { id } = req.params;
    await BlogTopicQueue.findByIdAndDelete(id);
    res.status(200).json({
      success: true,
      message: "Topic removed from queue",
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

/**
 * @desc    Manually trigger AI blog generation and auto-publish immediately
 * @route   POST /api/ai/blog-queue/trigger-now
 * @access  Private/Admin
 */
export const triggerBlogPublishNow = async (req, res) => {
  try {
    const { topicId } = req.body;
    let targetTopic;

    if (topicId) {
      targetTopic = await BlogTopicQueue.findById(topicId);
    } else {
      targetTopic = await BlogTopicQueue.findOne({ status: "pending" }).sort({ createdAt: 1 });
    }

    if (!targetTopic) {
      return res.status(404).json({
        success: false,
        message: "No pending topics found in queue to publish.",
      });
    }

    targetTopic.status = "processing";
    await targetTopic.save();

    // Generate blog article via Gemini AI
    const blogData = await generateBlogFromAI(targetTopic.topic, targetTopic.category);

    // Save blog post to Post collection
    const newPost = new Post(blogData);
    await newPost.save();

    // Remove topic from queue upon publishing (as requested by user)
    await BlogTopicQueue.findByIdAndDelete(targetTopic._id);

    res.status(200).json({
      success: true,
      message: `Successfully generated and published blog on "${targetTopic.topic}"!`,
      data: newPost,
    });
  } catch (error) {
    console.error("Error publishing AI blog post:", error);
    res.status(500).json({ success: false, message: error.message });
  }
};
