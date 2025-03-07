import asyncHandler from "express-async-handler";
import Event from "../models/event.js";

// Create Event
export const addEvent = asyncHandler(async (req, res) => {
  const { title, description, time, startDate, endDate } = req.body;

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

// Get Single Event
export const getEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  res.json({ data: event, message: "Event fetched successfully" });
});

// Get All Events with Pagination
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

// Update Event
export const updateEvent = asyncHandler(async (req, res) => {
  const { name, description, time, startDate, endDate } = req.body;

  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  event.name = name || event.name;
  event.description = description || event.description;
  event.time = time || event.time;
  event.startDate = startDate || event.startDate;
  event.endDate = endDate || event.endDate;

  const updatedEvent = await event.save();

  res.json({ data: updatedEvent, message: "Event updated successfully" });
});

// Delete Event
export const deleteEvent = asyncHandler(async (req, res) => {
  const event = await Event.findById(req.params.id);

  if (!event) {
    res.status(404).json({ data: null, message: "Event not found" });
    return;
  }

  await event.deleteOne();
  res.json({ data: null, message: "Event deleted successfully" });
});
