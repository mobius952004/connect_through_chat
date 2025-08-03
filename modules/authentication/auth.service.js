import User from "../user/user.model.js"
import jwtservices from "../../shared/utils/jwt.utils.js"
import { v4 as uuid } from "uuid";
import Device from "../device/device.model.js";
import bcrypt from "bcrypt"
import { sha256 } from "js-sha256";


class AuthServices {

    async usersignup (username,password,email,agent="unknown") {
const hashedpassword= await bcrypt.hash(password,10) 
const newuser=await User.create({username,password:hashedpassword,email})
return this.issueTokens(newuser,agent)
    }


async userlogin(password,email,agent="unknown"){



     const user = await User.findOne({email });
     if (!user) throw new Error("User not found");
    const ok = await bcrypt.compare(password, user.password);
  if (!ok) throw new Error("Wrong password");
  return this.issueTokens(user, agent);//issuing token after conferming the user existance

    } 

async issueTokens(newuser, agent) {
  const deviceId     = uuid();                    // globally unique identifier per install
  const accessToken  = jwtservices.signAccessToken(newuser);
  const refreshToken = jwtservices.signRefreshToken(newuser, deviceId);

  await Device.create({
    userId:      newuser._id,
    deviceId,
    refreshHash: jwtservices.sha256(refreshToken),
    expiresAt:   new Date(Date.now() + jwtservices.toMs(process.env.REFRESH_EXPIRES_IN || "30d")),
    agent,
  });

  return { user: { _id: newuser._id, username: newuser.username }, deviceId, accessToken, refreshToken };
}

// -----------------------------------------------------------------
// refreshTokens() – rotate refresh & access
// -----------------------------------------------------------------

 async  refreshTokens(refreshToken) {
  const payload = jwtservices.verifyRefresh(refreshToken);          // throws if invalid/expired
  const device  = await Device.findOne({ deviceId: payload.deviceId, userId: payload.sub });
  if (!device) throw new Error("Device revoked");
  if (device.refreshHash !== sha256(refreshToken)) throw new Error("Token mismatch");

  // Generate new pair (rotating refresh is safer)
  const user = await User.findById(payload.sub);
  const newAccess  = jwtservices.signAccessToken(user);
  const newRefresh = jwtservices.signRefreshToken(user, device.deviceId);

  device.refreshHash = jwtservices.sha256(newRefresh);
  device.expiresAt   = new Date(Date.now() + jwtservices.toMs(process.env.REFRESH_EXPIRES_IN || "30d"));
  device.lastSeen    = new Date();
  await device.save();

  return { accessToken: newAccess, refreshToken: newRefresh };
}

 async  logout(deviceId) {
  await Device.deleteOne({ deviceId });
}

}





const authServices = new AuthServices

export default authServices