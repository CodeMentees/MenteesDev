import JobOpportunity from "../models/jobModel.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: Job
 *   description: API for managing job opportunities (Placement Support)
 */

/**
 * @swagger
 * /api/jobs:
 *   post:
 *     summary: Create a new job opportunity
 *     tags: [Job]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               role:
 *                 type: string
 *               applyLink:
 *                 type: string
 *               company:
 *                 type: string
 *     responses:
 *       201:
 *         description: Job created successfully
 */
const createJob = asyncHandler(async (req, res) => {
  const { role, applyLink, company, expirationDate } = req.body;

  if (!role || !applyLink) {
    res.status(400);
    throw new Error("Role and Apply Link are required");
  }

  const job = new JobOpportunity({
    role,
    applyLink,
    company: company || "Hiring Partner",
    expirationDate: expirationDate || null,
  });

  const createdJob = await job.save();

  res.status(201).json({
    data: createdJob,
    message: "Job opportunity posted successfully",
  });
});

/**
 * @swagger
 * /api/jobs:
 *   get:
 *     summary: Get all job opportunities
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: Jobs fetched successfully
 */
const getJobs = asyncHandler(async (req, res) => {
  try {
    let query = {};
    if (req.query.admin !== 'true') {
      query = {
        $or: [
          { expirationDate: { $gt: new Date() } },
          { expirationDate: null },
          { expirationDate: { $exists: false } }
        ]
      };
    }
    
    const jobs = await JobOpportunity.find(query).sort({ postedAt: -1 });

    res.json({
      data: jobs,
      message: "Job opportunities fetched successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/jobs/{id}:
 *   put:
 *     summary: Update a job opportunity
 *     tags: [Job]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job updated successfully
 */
const updateJob = asyncHandler(async (req, res) => {
  const job = await JobOpportunity.findById(req.params.id);

  if (!job) {
    res.status(404).json({ data: null, message: "Job not found" });
    return;
  }

  job.role = req.body.role || job.role;
  job.applyLink = req.body.applyLink || job.applyLink;
  job.company = req.body.company || job.company;
  if (req.body.expirationDate !== undefined) {
    job.expirationDate = req.body.expirationDate;
  }

  const updatedJob = await job.save();
  res.json({ data: updatedJob, message: "Job opportunity updated successfully" });
});

/**
 * @swagger
 * /api/jobs/{id}:
 *   delete:
 *     summary: Delete a job opportunity
 *     tags: [Job]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Job deleted successfully
 */
const deleteJob = asyncHandler(async (req, res) => {
  try {
    const job = await JobOpportunity.findById(req.params.id);
    if (!job) {
      return res.status(404).json({ success: false, message: "Job not found" });
    }

    await job.deleteOne();
    res.status(200).json({ success: true, message: "Job opportunity deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to delete job" });
  }
});

/**
 * @swagger
 * /api/jobs/bulk:
 *   post:
 *     summary: Bulk delete job opportunities
 *     tags: [Job]
 *     responses:
 *       200:
 *         description: Jobs deleted successfully
 */
const bulkDeleteJobs = asyncHandler(async (req, res) => {
  const { ids } = req.body;
  if (!ids || !Array.isArray(ids)) {
    return res.status(400).json({ success: false, message: "No job IDs provided" });
  }

  try {
    await JobOpportunity.deleteMany({ _id: { $in: ids } });
    res.status(200).json({ success: true, message: "Jobs deleted successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message || "Failed to delete jobs" });
  }
});

export {
  createJob,
  getJobs,
  updateJob,
  deleteJob,
  bulkDeleteJobs,
};
