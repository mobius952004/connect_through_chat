import { Router } from "express";
import { query, validationResult, checkSchema , matchedData,body} from "express-validator";
import authcontroller from "./auth.controller.js";
import { signinValidation , loginValidation} from "../../middleware/validation.schema.js";

const router= Router()


router.post("/user/signup",checkSchema(signinValidation),authcontroller.usersignup)

router.post("/user/login",checkSchema(loginValidation),authcontroller.userlogin)

router.post("/user/Log-out",authcontroller.logout)

router.post("/user/refresh",authcontroller.refresh)



export default router
