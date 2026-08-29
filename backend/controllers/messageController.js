import Message from "../models/message.js";
import Group from "../models/group.js";

/**
 * @swagger
 * tags:
 *   name: Messages
 *   description: API for sending and retrieving messages in groups
 */

/**
 * @swagger
 * /api/messages:
 *   post:
 *     summary: Send a message to a group
 *     tags: [Messages]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               senderId:
 *                 type: string
 *               content:
 *                 type: string
 *     responses:
 *       201:
 *         description: Message sent successfully
 *       400:
 *         description: Group does not exist
 *       500:
 *         description: Error sending message
 */
export const sendMessage = async (req, res) => {
  const { groupId, senderId, content } = req.body;
  
  try {
    // Validate if the group exists
    const group = await Group.findById(groupId);
    if (!group) {
      return res.status(400).json({ message: "Group does not exist" });
    }

    const message = new Message({ group: groupId, sender: senderId, content });
    await message.save();

    res.status(201).json({ message: "Message sent successfully", data: message });
  } catch (err) {
    res.status(500).json({ message: "Error sending message", error: err.message });
  }
};

/**
 * @swagger
 * /api/messages/{groupId}:
 *   get:
 *     summary: Get messages from a specific group
 *     tags: [Messages]
 *     parameters:
 *       - in: path
 *         name: groupId
 *         required: true
 *         schema:
 *           type: string
 *         description: The group ID to fetch messages from
 *       - in: query
 *         name: page
 *         schema:
 *           type: integer
 *         description: The page number for pagination (default is 1)
 *     responses:
 *       200:
 *         description: Messages retrieved successfully
 *       500:
 *         description: Error fetching messages
 */
export const getMessages = async (req, res) => {
  const { groupId } = req.params;
  const page = parseInt(req.query.page) || 1;
  const limit = 30;

  try {
    const messages = await Message.find({ group: groupId })
      .populate("sender", "name")
      .skip((page - 1) * limit)
      .limit(limit)
      .sort({ createdAt: -1 });

    res.status(200).json({ message: "Messages retrieved successfully", data: messages });
  } catch (err) {
    res.status(500).json({ message: "Error fetching messages", error: err.message });
  }
};

/**
 * @swagger
 * /api/groups:
 *   get:
 *     summary: Get a list of all groups
 *     tags: [Messages]
 *     responses:
 *       200:
 *         description: List of groups retrieved successfully
 *       500:
 *         description: Error fetching groups
 */
export const getList = async (req, res) => {
  try {
    const groups = await Group.find();
    res.status(200).json({ message: "Groups retrieved successfully", data: groups });
  } catch (error) {
    res.status(500).json({ message: "Error fetching groups", error: error.message });
  }
};
