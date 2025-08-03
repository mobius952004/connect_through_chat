import { Router } from "express";
import { query, validationResult, checkSchema , matchedData,body} from "express-validator";
import verifyToken from "../../middleware/verifyjwt.js"
import userController from "./user.controller.js";


const router=Router()

router.get("/profile",verifyToken,userController.userprofile)
router.put("/profile/username",verifyToken,userController.change_username)
router.put("/profile/password",verifyToken,userController.change_password)
router.put("/profile/picture",verifyToken,userController.update_profilepicture)
// router.get("/profile/picture",verifyToken)
// router.put("/profile/status",verifyToken)

export default router