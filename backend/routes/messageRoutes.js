import { sendMessage, getMessages, getList } from "../controllers/messageController.js";
import { Router } from "express";
const router = Router();

router.post("/send", sendMessage);
router.get("/:groupId", getMessages);
router.get("/group/getList/", getList);

export default router;
