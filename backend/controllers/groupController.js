import Group from "../models/group.js";

/**
 * @swagger
 * tags:
 *   name: Group
 *   description: API for managing groups
 */

/**
 * @swagger
 * /api/groups/join-request:
 *   post:
 *     summary: Handle a join request (accept/reject)
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *               action:
 *                 type: string
 *                 enum: [accept, reject]
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Request handled successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Group not found
 */
export const handleJoinRequest = async (req, res) => {
  const { groupId, userId, action, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(adminId)) {
      return res.status(403).json({
        message: "Unauthorized: Only admins can handle join requests",
      });
    }

    if (action === "accept" && !group.members.includes(userId)) {
      group.members.push(userId);
    }
    group.pendingRequests = group.pendingRequests.filter(
      (id) => id.toString() !== userId
    );
    await group.save();

    res.status(200).json({ message: `Request ${action}ed`, group });
  } catch (err) {
    res.status(500).json({ message: "Error handling request", error: err.message });
  }
};

/**
 * @swagger
 * /api/groups:
 *   post:
 *     summary: Create a new group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *     responses:
 *       201:
 *         description: Group created successfully
 *       500:
 *         description: Error creating group
 */
export const createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    if (!req.userId) {
      return res.status(401).json({ message: "Unauthorized: User ID missing" });
    }

    const adminId = req.userId;
    const group = new Group({ name, admins: [adminId], members: [adminId] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    res.status(500).json({ message: "Error creating group", error: err.message });
  }
};

/**
 * @swagger
 * /api/groups/add-admin:
 *   post:
 *     summary: Add an admin to a group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin added successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Group not found
 */
export const addAdmin = async (req, res) => {
  const { groupId, userId, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(adminId)) {
      return res.status(403).json({ message: "Unauthorized: Only admins can add admins" });
    }

    if (!group.admins.includes(userId)) {
      group.admins.push(userId);
      await group.save();
    }

    res.status(200).json({ message: "Admin added successfully", group });
  } catch (err) {
    res.status(500).json({ message: "Error adding admin", error: err.message });
  }
};

/**
 * @swagger
 * /api/groups/remove-admin:
 *   post:
 *     summary: Remove an admin from a group
 *     tags: [Group]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               groupId:
 *                 type: string
 *               userId:
 *                 type: string
 *               adminId:
 *                 type: string
 *     responses:
 *       200:
 *         description: Admin removed successfully
 *       403:
 *         description: Unauthorized action
 *       404:
 *         description: Group not found
 */
export const removeAdmin = async (req, res) => {
  const { groupId, userId, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    if (!group.admins.includes(adminId)) {
      return res.status(403).json({ message: "Unauthorized: Only admins can remove admins" });
    }

    group.admins = group.admins.filter((id) => id.toString() !== userId);
    await group.save();

    res.status(200).json({ message: "Admin removed successfully", group });
  } catch (err) {
    res.status(500).json({ message: "Error removing admin", error: err.message });
  }
};
