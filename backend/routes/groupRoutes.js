import {createGroup,handleJoinRequest} from "../controllers/groupController.js"
import { Router } from "express";
import isAuthenticated  from "../middlewares/IsAuthenticate.js"
const router = Router();
router.use(isAuthenticated)
router.post('/create', createGroup);
router.post('/handle-request',handleJoinRequest);

export default router;

