import {Router} from "express";
import messageController from "./message.controller.js";
import verifyToken from "../../middleware/verifyjwt.js";

const router = Router();

// router.post("/:chatId",verifyToken, messageController.sendMessages);
router.get("/:chatId",verifyToken, messageController.getMessages);
router.post("/delete/:chatId",verifyToken, messageController.deleteMessages);

export default router;