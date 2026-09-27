import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * Helper to strip markdown JSON code block markers (```json ... ```)
 */
function cleanJsonResponse(rawText) {
  let cleaned = rawText.trim();
  if (cleaned.startsWith("```json")) {
    cleaned = cleaned.substring(7);
  } else if (cleaned.startsWith("```")) {
    cleaned = cleaned.substring(3);
  }
  if (cleaned.endsWith("```")) {
    cleaned = cleaned.substring(0, cleaned.length - 3);
  }
  return cleaned.trim();
}

/**
 * Generate course JSON via Gemini AI
 */
export async function generateCourseFromAI({ title, categoryId, categoryName = "Web Development" }) {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add it to your backend .env file. " +
      "Get a free key at: https://aistudio.google.com/apikey"
    );
  }

  {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are an expert curriculum designer and developer instructor.
Create a complete, professional course JSON object for the course title: "${title}".
The course belongs to the category: "${categoryName}".

Return STRICTLY valid JSON with NO additional commentary, adhering EXACTLY to this JSON structure:
{
  "name": "${title}",
  "price": 1499,
  "image": "https://res.cloudinary.com/placehold/course-banner.png",
  "features": [
    "1:1 Live Mentorship & Code Reviews",
    "Real-World Production Projects",
    "Dedicated Doubt Resolution & Slack Support",
    "Job Placement Assistance & Mock Interviews"
  ],
  "tags": ["Online"],
  "category": "${categoryId || ""}",
  "description": "Comprehensive hands-on course covering all concepts from fundamentals to advanced production deployment.",
  "modules": [
    { "icon": "🚀", "title": "Module 1: Foundations & Core Concepts" },
    { "icon": "⚡", "title": "Module 2: Advanced Architecture & Best Practices" },
    { "icon": "💻", "title": "Module 3: Hands-on Capstone Project" },
    { "icon": "🎯", "title": "Module 4: Performance, Testing & Deployment" }
  ],
  "details": [
    {
      "id": "overview",
      "label": "Overview",
      "content": [
        {
          "title": "Course Overview",
          "description": "Master ${title} through practical projects, expert 1-on-1 code reviews, and industry-aligned curriculum."
        }
      ]
    },
    {
      "id": "curriculum",
      "label": "Curriculum Details",
      "content": [
        {
          "title": "Phase 1: Concepts & Setup",
          "description": "In-depth breakdown of essential principles and setting up modern environment tools."
        },
        {
          "title": "Phase 2: Project Implementation",
          "description": "Build full-featured production applications with live feedback from senior engineers."
        }
      ]
    }
  ],
  "seo": {
    "metaTitle": "${title} | CodeMentees Course",
    "metaDescription": "Enroll in ${title} course at CodeMentees. Master top industry skills with 1:1 mentorship.",
    "keywords": "${title}, Web Development, Coding Course, CodeMentees"
  }
}`;

      const result = await model.generateContent(prompt);
      const rawResponse = result.response.text();
      const cleanedJson = cleanJsonResponse(rawResponse);
      const parsed = JSON.parse(cleanedJson);
      return parsed;
    } catch (error) {
      console.error("Gemini AI API call failed:", error.message);
      throw new Error(`Gemini AI failed to generate course: ${error.message}`);
    }
  }
}

/**
 * Generate blog post JSON via Gemini AI
 */
export async function generateBlogFromAI(topic, category = "Technology") {
  const apiKey = process.env.GEMINI_API_KEY;

  if (!apiKey) {
    throw new Error(
      "GEMINI_API_KEY is not configured. Please add it to your backend .env file. " +
      "Get a free key at: https://aistudio.google.com/apikey"
    );
  }

  const slug = topic
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-") + "-" + Date.now().toString().slice(-4);

  {
    try {
      const genAI = new GoogleGenerativeAI(apiKey);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = `You are a technical blog writer for CodeMentees educational developer blog.
Write an engaging, highly informative, and well-structured Markdown blog article on the topic: "${topic}".
Category: "${category}".

Return STRICTLY valid JSON with NO extra commentary, adhering EXACTLY to this JSON structure:
{
  "title": "${topic}",
  "slug": "${slug}",
  "content": "# ${topic}\\n\\nWriting detailed technical markdown content with subheadings, code examples, best practices, and actionable insights...",
  "image": "https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=1200&q=80",
  "categories": ["${category}", "Software Engineering"],
  "seo": {
    "metaTitle": "${topic} | CodeMentees Blog",
    "metaDescription": "Explore detailed insights on ${topic}. Learn best practices, real-world examples, and expert developer tips.",
    "keywords": "${topic}, Web Development, Coding, Tech Blog"
  }
}`;

      const result = await model.generateContent(prompt);
      const rawResponse = result.response.text();
      const cleanedJson = cleanJsonResponse(rawResponse);
      const parsed = JSON.parse(cleanedJson);
      return parsed;
    } catch (error) {
      console.error("Gemini AI API blog generation error:", error.message);
      throw new Error(`Gemini AI failed to generate blog: ${error.message}`);
    }
  }
}
