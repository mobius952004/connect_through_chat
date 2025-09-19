import { Router } from "express";
import chatController from "./chat.controller.js";
import verifyToken from "../../middleware/verifyjwt.js";

const router = Router();

router.post("/setChatList",verifyToken, chatController.setChatList);
router.get("/getChatList",verifyToken, chatController.getChatList);

export default router;
