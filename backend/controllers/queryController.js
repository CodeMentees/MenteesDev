import Query from "../models/query.js";
import asyncHandler from "express-async-handler";

// Create query
const createQuery = asyncHandler(async (req, res) => {
    try {
        const query = new Query({
            name: req.body.name,
            email: req.body.email,
            phoneNumber: req.body.phoneNumber,
            courseName: req.body.course
        });
        const createdQuery = await query.save();
        res.status(201).json({
            data: createdQuery,
            message: "Query created successfully"
        });
    } catch (error) {
        res.status(400).json({ data: null, message: error.message });
    }
});

// Delete query
const deleteQuery = asyncHandler(async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (query) {
            // Use .deleteOne() or .delete() instead of .remove()
            await query.deleteOne(); // or await Query.deleteOne({ _id: req.params.id });
            res.json({ data: null, message: "Query removed" });
        } else {
            res.status(404).json({ data: null, message: "Query not found" });
        }
    } catch (error) {
        res.status(400).json({ data: null, message: error.message });
    }
});
// Get single query
const getQuery = asyncHandler(async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (query) {
            res.json({ data: query, message: "Query retrieved successfully" });
        } else {
            res.status(404).json({ data: null, message: "Query not found" });
        }
    } catch (error) {
        res.status(400).json({ data: null, message: error.message });
    }
});

// Update query
const updateQuery = asyncHandler(async (req, res) => {
    try {
        const query = await Query.findById(req.params.id);
        if (query) {
            query.name = req.body.name || query.name;
            query.email = req.body.email || query.email;
            query.phoneNumber = req.body.phoneNumber || query.phoneNumber;
            query.courseName = req.body.courseName || query.courseName;

            const updatedQuery = await query.save();
            res.json({ data: updatedQuery, message: "Query updated successfully" });
        } else {
            res.status(404).json({ data: null, message: "Query not found" });
        }
    } catch (error) {
        res.status(400).json({ data: null, message: error.message });
    }
});

// Get all queries
const getQueries = asyncHandler(async (req, res) => {
    try {
        const queries = await Query.find({}).limit(10);
        res.json({ data: queries, message: "Queries retrieved successfully" });
    } catch (error) {
        res.status(400).json({ data: null, message: error.message });
    }
});

export { createQuery, deleteQuery, getQuery, getQueries, updateQuery };
