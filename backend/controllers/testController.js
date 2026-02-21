import test from "../models/test.js";
import asyncHandler from "express-async-handler";

/**
 * @swagger
 * tags:
 *   name: test
 *   description: API for managing tests
 */

/**
 * @swagger
 * /api/test:
 *   get:
 *     summary: Get paginated list of tests
 *     tags: [test]
 *     parameters:
 *       - name: page
 *         in: query
 *         description: Page number
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         description: Number of items per page
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: List of tests
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 total:
 *                   type: integer
 *                   description: Total number of tests
 *                 page:
 *                   type: integer
 *                   description: Current page number
 *                 limit:
 *                   type: integer
 *                   description: Number of items per page
 *                 data:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/test'
 */
export const gettests = asyncHandler(async (req, res) => {
  const page = parseInt(req.query.page) || 1;
  const limit = parseInt(req.query.limit) || 10;
  const skip = (page - 1) * limit;

  const total = await test.countDocuments();
  const tests = await test.find().skip(skip).limit(limit);

  res.json({ total, page, limit, data: tests });
});

/**
 * @swagger
 * /api/test/{id}:
 *   get:
 *     summary: Get a single test by ID
 *     tags: [test]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: A test object
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/test'
 *       404:
 *         description: test not found
 */
export const gettestById = asyncHandler(async (req, res) => {
  const item = await test.findById(req.params.id);
  if (item) {
    res.json(item);
  } else {
    res.status(404).json({ message: "test not found" });
  }
});

/**
 * @swagger
 * /api/test:
 *   post:
 *     summary: Create a new test
 *     tags: [test]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/test'
 *     responses:
 *       201:
 *         description: Created test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/test'
 */
export const createtest = asyncHandler(async (req, res) => {
  const item = new test(req.body);
  const savedItem = await item.save();
  res.status(201).json(savedItem);
});

/**
 * @swagger
 * /api/test/{id}:
 *   put:
 *     summary: Update a test by ID
 *     tags: [test]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/test'
 *     responses:
 *       200:
 *         description: Updated test
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/test'
 *       404:
 *         description: test not found
 */
export const updatetest = asyncHandler(async (req, res) => {
  const item = await test.findById(req.params.id);
  if (item) {
    Object.assign(item, req.body);
    const updatedItem = await item.save();
    res.json(updatedItem);
  } else {
    res.status(404).json({ message: "test not found" });
  }
});

/**
 * @swagger
 * /api/test/{id}:
 *   delete:
 *     summary: Delete a test by ID
 *     tags: [test]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: test deleted successfully
 *       404:
 *         description: test not found
 */
export const deletetest = asyncHandler(async (req, res) => {
  const item = await test.findById(req.params.id);
  if (item) {
    await item.deleteOne();
    res.json({ message: "test deleted successfully" });
  } else {
    res.status(404).json({ message: "test not found" });
  }
});
