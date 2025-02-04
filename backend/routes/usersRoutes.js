import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser } from "../controllers/usersController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router(); 

// Define routes
router.get("/", getUsers);
router.get("/:id", getUser);
router.use(isAdmin)
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router; 
