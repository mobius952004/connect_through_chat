import authservices from "./auth.service.js"
import User from "../user/user.model.js"
import { query, validationResult, checkSchema, matchedData, body } from "express-validator";



class AuthController {

  async usersignup(req, res, next) {
    const error = validationResult(req)
    const UserData = matchedData(req)
    const { username, password, email } = UserData
    if (!error.isEmpty()) return res.status(422).json(error.array().map((er => er.msg)))

    const existingUsername = await User.findOne({ username });
    if (existingUsername) {
      return res.status(409).json("User with Username Or email Already Exists");
    }

    const alreadyexists = await User.findOne({ email })

    if (alreadyexists) return res.status(409).json("User with Username Or email Already Exists")

    try {
      const user = await authservices.usersignup(username, password, email, req.headers["user-agent"])
      console.log(user)
      console.log("congratulations u are now signedup ")
      res.status(200).json(user)
    } catch (err) {
      console.error(err);
      return res.status(500).json("Something went wrong")
    }



  }



  async userlogin(req, res, next) {

    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const UserData = matchedData(req);
    const {  password, email } = UserData

    try {

      const result = await authservices.userlogin( password, email, req.headers["user-agent"])
      res.status(200).send(result)
    } catch (err) {

      res.status(401).json("user not found")
    }

  }

  refresh = async (req, res, next) => {
    try {
      const { refreshToken } = req.body;  // client sends only the long‑lived token
      const out = await authservices.refreshTokens(refreshToken);
      res.json(out);
    } catch (e) { next(e); }
  };


  logout = async (req, res, next) => {
    try {
      const { deviceId } = req.body;      // which installation to log out
      await authSvc.logout(deviceId);
      res.json({ msg: "Logged out" });
    } catch (e) { next(e); }


  }









}


export default new AuthController();