import {createGroup,handleJoinRequest} from "../controllers/groupController.js"
import { Router } from "express";
const router = Router();

router.post('/create', createGroup);
router.post('/handle-request',handleJoinRequest);

export default router;

