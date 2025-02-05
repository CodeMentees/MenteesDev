import Message from "../models/message.js";
import Group from "../models/group.js";

export const sendMessage = async (req, res) => {
  const { groupId, senderId, content } = req.body;
  try {
    const message = new Message({ group: groupId, sender: senderId, content });
    await message.save();
    res.status(201).json(message);
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error sending message", error: err.message });
  }
};

export const getMessages = async (req, res) => {
  const { groupId } = req.params;
  const page = parseInt(req.query.page) || 1; // Default to page 1 if not provided
  const limit = 5; // Limit to 30 messages per page

  try {
    // Skip the messages based on the current page and limit
    const messages = await Message.find({ group: groupId })
      .populate("sender", "name")
      .skip((page - 1) * limit) // Skip messages based on the current page
      .limit(limit) // Limit to 30 messages per page
      .sort({ createdAt: -1 }); // Sort messages in descending order to get the latest messages

    res.status(200).json(messages);
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
};


export const getList = async (req, res) => {
  try {
    const groups = await Group.find(); // Fetch all groups from your database
    res.json(groups);
  } catch (error) {
    console.log(error)
    res.status(500).send("Error fetching groups");
  }
};
