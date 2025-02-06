import Group from "../models/group.js";

export const handleJoinRequest = async (req, res) => {
  const { groupId, userId, action, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the requester is an admin
    if (!group.admins.includes(adminId)) {
      return res.status(403).json({
        message: "Unauthorized: Only admins can handle join requests",
      });
    }

    if (action === "accept") {
      group.members.push(userId);
    }
    group.pendingRequests = group.pendingRequests.filter(
      (id) => id.toString() !== userId
    );
    await group.save();
    res.status(200).json({ message: `Request ${action}ed`, group });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error handling request", error: err.message });
  }
};

export const createGroup = async (req, res) => {
  const { name } = req.body;
  try {
    console.log(req.userId)
    const adminId = req.userId;
    console.log(adminId)
    const group = new Group({ name, admins: [adminId], members: [adminId] });
    await group.save();
    res.status(201).json(group);
  } catch (err) {
    console.log(err)
    res
      .status(500)
      .json({ message: "Error creating group", error: err.message });
  }
};

export const addAdmin = async (req, res) => {
  const { groupId, userId, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the requester is an admin
    if (!group.admins.includes(adminId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can add admins" });
    }

    // Add the user as an admin
    if (!group.admins.includes(userId)) {
      group.admins.push(userId);
      await group.save();
    }
    res.status(200).json({ message: "Admin added successfully", group });
  } catch (err) {
    res.status(500).json({ message: "Error adding admin", error: err.message });
  }
};

export const removeAdmin = async (req, res) => {
  const { groupId, userId, adminId } = req.body;
  try {
    const group = await Group.findById(groupId);
    if (!group) return res.status(404).json({ message: "Group not found" });

    // Check if the requester is an admin
    if (!group.admins.includes(adminId)) {
      return res
        .status(403)
        .json({ message: "Unauthorized: Only admins can remove admins" });
    }

    // Remove the user as an admin
    group.admins = group.admins.filter((id) => id.toString() !== userId);
    await group.save();
    res.status(200).json({ message: "Admin removed successfully", group });
  } catch (err) {
    res
      .status(500)
      .json({ message: "Error removing admin", error: err.message });
  }
};
