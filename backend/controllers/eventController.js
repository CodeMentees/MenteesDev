import asyncHandler from "express-async-handler";
import Event from "../models/event.js";

/**
 * @swagger
 * tags:
 *   name: Event
 *   description: API for managing events
 */

/**
 * @swagger
 * /api/events:
 *   post:
 *     summary: Create a new event
 *     tags: [Event]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               time:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       201:
 *         description: Event added successfully
 *       400:
 *         description: Invalid input data
 */
export const addEvent = asyncHandler(async (req, res) => {
  const { title, description, time, startDate, endDate } = req.body;

  if (!title || !startDate || !endDate) {
    res.status(400);
    throw new Error("Title, Start Date, and End Date are required");
  }

  const newEvent = new Event({
    title,
    description,
    time,
    startDate,
    endDate,
  });

  const addedEvent = await newEvent.save();

  res.status(201).json({
    data: addedEvent,
    message: "Event added successfully",
  });
});

/**
 * @swagger
 * /api/events/{id}:
 *   get:
 *     summary: Get a single event by ID
 *     tags: [Event]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event fetched successfully
 *       404:
 *         description: Event not found
 */
export const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  res.json({ data: event, message: "Event fetched successfully" });
});

/**
 * @swagger
 * /api/events:
 *   get:
 *     summary: Get all events with pagination
 *     tags: [Event]
 *     parameters:
 *       - name: page
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 1
 *       - name: limit
 *         in: query
 *         required: false
 *         schema:
 *           type: integer
 *           default: 10
 *     responses:
 *       200:
 *         description: Events fetched successfully
 */
export const getAllEvents = asyncHandler(async (req, res) => {
  let { page = 1, limit = 10 } = req.query;

  page = parseInt(page);
  limit = parseInt(limit);

  const totalEvents = await Event.countDocuments();
  const skip = (page - 1) * limit;
  const events = await Event.find().skip(skip).limit(limit);

  res.json({
    data: events,
    currentPage: page,
    totalPages: Math.ceil(totalEvents / limit),
    totalEvents,
    message: "Events fetched successfully",
  });
});

/**
 * @swagger
 * /api/events/{id}:
 *   put:
 *     summary: Update an existing event
 *     tags: [Event]
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
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *               time:
 *                 type: string
 *               startDate:
 *                 type: string
 *                 format: date
 *               endDate:
 *                 type: string
 *                 format: date
 *     responses:
 *       200:
 *         description: Event updated successfully
 *       404:
 *         description: Event not found
 */
export const updateEvent = asyncHandler(async (req, res) => {
  const { title, description, time, startDate, endDate } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  event.title = title || event.title;
  event.description = description || event.description;
  event.time = time || event.time;
  event.startDate = startDate || event.startDate;
  event.endDate = endDate || event.endDate;

  const updatedEvent = await event.save();

  res.json({ data: updatedEvent, message: "Event updated successfully" });
});

/**
 * @swagger
 * /api/events/{id}:
 *   delete:
 *     summary: Delete an event by ID
 *     tags: [Event]
 *     parameters:
 *       - name: id
 *         in: path
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Event deleted successfully
 *       404:
 *         description: Event not found
 */
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  await event.deleteOne();
  res.json({ data: null, message: "Event deleted successfully" });
});
