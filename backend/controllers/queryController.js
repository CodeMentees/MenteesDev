import Query from "../models/query.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: Queries
 *   description: API endpoints for managing user queries
 */

/**
 * @swagger
 * /api/queries:
 *   post:
 *     summary: Create a new query
 *     tags: [Queries]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               courseName:
 *                 type: string
 *     responses:
 *       201:
 *         description: Query created successfully
 *       400:
 *         description: Error creating query
 */
const createQuery = asyncHandler(async (req, res) => {
  try {
    const { name, email, phoneNumber, courseName, message } = req.body;

    if (!name || !email || !phoneNumber || !courseName) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const query = new Query({ name, email, phoneNumber, courseName, message });
    const createdQuery = await query.save();

    res.status(201).json({ data: createdQuery, message: "Query created successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/queries/{id}:
 *   delete:
 *     summary: Delete a query by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Query removed successfully
 *       404:
 *         description: Query not found
 */
const deleteQuery = asyncHandler(async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    await query.deleteOne();
    res.json({ message: "Query removed successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/queries/{id}:
 *   get:
 *     summary: Get a single query by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Query retrieved successfully
 *       404:
 *         description: Query not found
 */
const getQuery = asyncHandler(async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    res.json({ data: query, message: "Query retrieved successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/queries/{id}:
 *   put:
 *     summary: Update a query by ID
 *     tags: [Queries]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *               email:
 *                 type: string
 *               phoneNumber:
 *                 type: string
 *               courseName:
 *                 type: string
 *     responses:
 *       200:
 *         description: Query updated successfully
 *       404:
 *         description: Query not found
 */
const updateQuery = asyncHandler(async (req, res) => {
  try {
    const query = await Query.findById(req.params.id);
    if (!query) {
      return res.status(404).json({ message: "Query not found" });
    }

    query.name = req.body.name || query.name;
    query.email = req.body.email || query.email;
    query.phoneNumber = req.body.phoneNumber || query.phoneNumber;
    query.courseName = req.body.courseName || query.courseName;

    const updatedQuery = await query.save();
    res.json({ data: updatedQuery, message: "Query updated successfully" });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

/**
 * @swagger
 * /api/queries:
 *   get:
 *     summary: Get a paginated list of queries
 *     tags: [Queries]
 *     parameters:
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1)
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *         description: The number of queries per page (default is 10)
 *     responses:
 *       200:
 *         description: Queries retrieved successfully
 */
const getQueries = asyncHandler(async (req, res) => {
  try {
    let { page = 1, limit = 10 } = req.query;
    page = parseInt(page);
    limit = parseInt(limit);
    const skip = (page - 1) * limit;

    const queries = await Query.find().sort({ createdAt: -1 }).skip(skip).limit(limit);
    const totalQueries = await Query.countDocuments();

    res.json({
      data: queries,
      currentPage: page,
      totalPages: Math.ceil(totalQueries / limit),
      totalQueries,
      message: "Queries retrieved successfully",
    });
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

export { createQuery, deleteQuery, getQuery, getQueries, updateQuery };
