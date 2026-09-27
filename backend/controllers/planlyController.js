import { GoogleGenerativeAI } from "@google/generative-ai";

/**
 * @desc    Generate a personalized placement preparation plan using Gemini AI
 * @route   POST /api/planly/generate
 * @access  Private (student / any authenticated user)
 */
export const generatePlan = async (req, res) => {
  const {
    goal,
    current_level,
    hours_per_day,
    start_date,
    target_date,
    focus_areas,
    weak_topics,
    vacation_days,
  } = req.body;

  // Validate required fields
  if (!goal || !current_level || !hours_per_day || !start_date || !target_date) {
    return res.status(400).json({
      success: false,
      message: "goal, current_level, hours_per_day, start_date, and target_date are required.",
    });
  }

  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    return res.status(500).json({
      success: false,
      message:
        "GEMINI_API_KEY is not configured. Please add it to your backend .env file. " +
        "Get a free key at: https://aistudio.google.com/apikey",
    });
  }

  const prompt = `You are Planly – an expert AI placement preparation planner designed for engineering students preparing for product-based company interviews (inspired by takeUforward / Striver).

Your job is to create a fully personalized, realistic, day-by-day preparation plan.

### User Inputs:
- Goal: ${goal}
- Current Level: ${current_level}
- Hours available per day: ${hours_per_day}
- Start Date: ${start_date}
- Target Date / Duration: ${target_date}
- Focus Areas: ${Array.isArray(focus_areas) ? focus_areas.join(", ") : focus_areas || "DSA, System Design, CS Fundamentals"}
- Weak Topics: ${Array.isArray(weak_topics) ? weak_topics.join(", ") : weak_topics || "None specified"}
- Vacation / Off Days: ${Array.isArray(vacation_days) ? vacation_days.join(", ") : vacation_days || "None"}

### Strict Rules:
1. Structure the plan into clear STAGES (example: Foundation → Core DSA → Advanced DSA → Core Subjects → Aptitude + Company Specific → Mock & Revision).
2. Under each stage, create a day-by-day schedule.
3. Every single day must contain:
   - Exact topics to learn
   - Exact practice tasks (number of problems + difficulty)
   - Estimated time (must fit within the daily hours)
   - Suggested resources
4. Automatically skip or redistribute work around vacation/off days.
5. At the end of every stage include a revision day + a short assessment focused on expected strengths and weaknesses.
6. Keep the plan realistic and progressive according to the user's current level and available hours.
7. Output ONLY valid JSON. Do not add any extra text, markdown, or explanation outside the JSON.

### Required JSON Schema:
{
  "plan_title": "",
  "total_duration_days": 0,
  "stages": [
    {
      "stage_name": "",
      "stage_goal": "",
      "days": [
        {
          "day_number": 1,
          "date": "YYYY-MM-DD",
          "total_hours": 0,
          "is_off": false,
          "tasks": [
            {
              "type": "learn | practice | revise | test",
              "topic": "",
              "description": "",
              "estimated_minutes": 0,
              "resources": []
            }
          ]
        }
      ],
      "stage_end_assessment": {
        "focus_areas": [],
        "suggested_test": ""
      }
    }
  ],
  "adjustment_notes": "How the plan will adapt if days are missed"
}`;

  try {
    const genAI = new GoogleGenerativeAI(apiKey);
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const result = await model.generateContent(prompt);
    const rawText = result.response.text().trim();

    // Strip markdown code fences if present
    let cleaned = rawText;
    if (cleaned.startsWith("```json")) cleaned = cleaned.slice(7);
    else if (cleaned.startsWith("```")) cleaned = cleaned.slice(3);
    if (cleaned.endsWith("```")) cleaned = cleaned.slice(0, -3);

    const plan = JSON.parse(cleaned.trim());

    return res.status(200).json({ success: true, data: plan });
  } catch (error) {
    console.error("Planly AI generation error:", error.message);
    return res.status(500).json({
      success: false,
      message: `Failed to generate plan: ${error.message}`,
    });
  }
};
