import asyncHandler from "express-async-handler";
import SchoolCodingLead from "../models/schoolCodingLead.js";

// @desc    Create a new School Coding Lead
// @route   POST /api/school-coding-leads
// @access  Public
const createLead = asyncHandler(async (req, res) => {
  const { name, email, phoneNumber, courseName } = req.body;

  if (!name || !email || !phoneNumber || !courseName) {
    res.status(400);
    throw new Error("Please fill in all fields");
  }

  const lead = await SchoolCodingLead.create({
    name,
    email,
    phoneNumber,
    courseName,
  });

  if (lead) {
    res.status(201).json({
      success: true,
      message: "Lead submitted successfully! We will contact you soon.",
      data: lead,
    });
  } else {
    res.status(400);
    throw new Error("Invalid lead data");
  }
});

// @desc    Get all School Coding Leads
// @route   GET /api/school-coding-leads
// @access  Private/Admin
const getLeads = asyncHandler(async (req, res) => {
  const leads = await SchoolCodingLead.find({}).sort({ createdAt: -1 });
  res.json(leads);
});

// @desc    Delete a School Coding Lead
// @route   DELETE /api/school-coding-leads/:id
// @access  Private/Admin
const deleteLead = asyncHandler(async (req, res) => {
  const lead = await SchoolCodingLead.findById(req.params.id);

  if (lead) {
    await lead.deleteOne();
    res.json({ message: "Lead removed" });
  } else {
    res.status(404);
    throw new Error("Lead not found");
  }
});

// @desc    Update lead status
// @route   PATCH /api/school-coding-leads/:id/status
// @access  Private/Admin
const updateLeadStatus = asyncHandler(async (req, res) => {
  const { status } = req.body;
  const lead = await SchoolCodingLead.findById(req.params.id);

  if (lead) {
    lead.status = status || lead.status;
    const updatedLead = await lead.save();
    res.json(updatedLead);
  } else {
    res.status(404);
    throw new Error("Lead not found");
  }
});

export { createLead, getLeads, deleteLead, updateLeadStatus };
