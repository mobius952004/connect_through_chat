import {Router} from "express";
import messageController from "./message.controller";

const router = Router();

router.post("/:chatId", messageController.sendMessage);
router.get("/:chatId", messageController.getMessage);

export default router;