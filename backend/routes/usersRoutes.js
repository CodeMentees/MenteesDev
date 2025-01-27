import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/usersController.js";

const router = Router(); 

// Define routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; 
