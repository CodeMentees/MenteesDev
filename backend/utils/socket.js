import { Server as SocketIo } from "socket.io";
import Message from "../models/message.js";
import Group from "../models/group.js";

let io;

export const init = (server) => {
  io = new SocketIo(server, {
    cors: {
      origin: "*", // Change this to your frontend URL for better security
      methods: ["GET", "POST"],
    },
  });

  io.on("connection", (socket) => {
    console.log("A user connected:", socket.id);

    // Join group
    socket.on("join-group", async ({ groupId, userId }) => {
      console.log("group is join",userId,groupId)
      if (!groupId || !userId) {
        io.to(socket.id).emit("error", { message: "Invalid group or user ID" });
        return;
      }

      socket.join(groupId);
      console.log(`User ${userId} joined group ${groupId}`);

      // Send previous messages to the user who joined the group
      try {
        const messages = await Message.find({ group: groupId }).populate(
          "sender",
          "username"
        );
        io.to(socket.id).emit("previous-messages", messages);
      } catch (err) {
        console.error("Error fetching messages:", err);
        io.to(socket.id).emit("error", { message: "Error fetching messages" });
      }
    });

    // Send message
    socket.on("send-message", async ({ groupId, senderId, content }) => {
      if (!groupId || !senderId || !content) {
        io.to(socket.id).emit("error", { message: "Invalid message data" });
        return;
      }

      try {
        const message = new Message({
          group: groupId,
          sender: senderId,
          content,
        });
        await message.save();
        console.log("Message saved and emitting to group:", groupId);
        console.log("group id ",groupId)
        // Emit the message to everyone in the group
        io.to(groupId).emit("receive-message", message);
      } catch (err) {
        console.error("Error sending message:", err);
        io.to(socket.id).emit("error", { message: "Error sending message" });
      }
    });

    // Handle group join requests
    socket.on(
      "handle-join-request",
      async ({ groupId, userId, action, adminId }) => {
        try {
          if (!groupId || !userId || !adminId || !action) {
            io.to(socket.id).emit("error", { message: "Invalid request data" });
            return;
          }

          const group = await Group.findById(groupId);
          if (!group) {
            io.to(socket.id).emit("error", { message: "Group not found" });
            return;
          }

          // Check if the requester is an admin
          if (!group.admins.includes(adminId)) {
            io.to(socket.id).emit("error", {
              message: "Unauthorized: Only admins can handle requests",
            });
            return;
          }

          if (action === "accept") {
            group.members.push(userId);
          }
          group.pendingRequests = group.pendingRequests.filter(
            (id) => id.toString() !== userId
          );
          await group.save();

          // Notify all users in the group about the updated member list
          io.to(groupId).emit("group-updated", group);
          io.to(socket.id).emit("join-request-handled", { action, group });
        } catch (err) {
          console.error("Error handling join request:", err);
          io.to(socket.id).emit("error", {
            message: "Error handling join request",
          });
        }
      }
    );

    // Fetch all groups
    socket.on("get-groups", async () => {
      try {
        const groups = await Group.find();
        io.to(socket.id).emit("groups-list", groups);
      } catch (err) {
        console.error("Error fetching groups:", err);
        io.to(socket.id).emit("error", { message: "Error fetching groups" });
      }
    });

    // Disconnect user
    socket.on("disconnect", () => {
      console.log("User disconnected:", socket.id);
    });
  });
};

export const getIo = () => io;
