import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, bulkDeleteUsers, getUserGrowth } from "../controllers/usersController.js";
import isAdmin from "../middlewares/isAdmin.js";

const router = Router(); 

router.use(isAdmin)

// Define routes
router.get("/growth", getUserGrowth);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/bulk", bulkDeleteUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
