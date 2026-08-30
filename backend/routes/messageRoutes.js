import { sendMessage, getMessages, getList } from "../controllers/messageController.js";
import isAuthenticated from "../middlewares/IsAuthenticate.js";
import { Router } from "express";
const router = Router();

// All message routes require authentication
router.use(isAuthenticated);

router.post("/send", sendMessage);
router.get("/:groupId", getMessages);
router.get("/group/getList/", getList);

export default router;
