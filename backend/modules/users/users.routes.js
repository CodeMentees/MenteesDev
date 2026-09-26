import { Router } from "express";
import { createUser, deleteUser, getUser, getUsers, updateUser, bulkDeleteUsers, getUserGrowth, resetInternPasswords } from "../controllers/usersController.js";
import { requirePermission } from "../middlewares/rbacMiddleware.js";

const router = Router(); 

router.use(requirePermission("manage_users"))

// Define routes
router.post("/interns/reset-password", resetInternPasswords);
router.get("/growth", getUserGrowth);
router.get("/", getUsers);
router.get("/:id", getUser);
router.post("/bulk", bulkDeleteUsers);
router.post("/", createUser);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
