import { Router } from "express";
import chatController from "./chat.controller.js";

const router = Router();

router.post("/setChatList", chatController.setChatList);
router.get("/getChatList", chatController.getChatList);

export default router;
