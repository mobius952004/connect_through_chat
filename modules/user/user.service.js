import User from "./user.model.js";
import bcrypt from "bcrypt"

class user_services{

 async userprofile(userID){

    // console.log("Searching for user with ID:", userID);
   
    const user = await User.findById(String(userID))
   if(!user){
    const error = new Error("user not found")
    error.status(404)
    throw error
   }
   return user

}
 async changestatus({userID,newstatus}){
   
  const user = await User.findByIdAndUpdate(
    userID,
    { status:newstatus },
    { new: true }
  )

  return user;

 }

async change_profilepicture({userid,profilepic}){

const user=await User.findByIdAndUpdate(userid,{profilePic:profilepic},{new:true})

return user
}


async change_password({userid,newpassword,oldpassword}){

const user=User.findById(userid)
if(!user) throw new Error("user not found")

const ismatch= await bcrypt.compare(oldpassword,user.password)
if(!ismatch) throw new Error("password is incorrect") 

const hashed = await bcrypt.hash(newpassword,10)
user.password=hashed

 return { message: "Password updated successfully" }

}


async change_username({userid,newUsername}){

    const user= await User.findByIdAndUpdate({_id:userid},{username:newUsername},{new:true}).select("-password")
    console.log("Updating user", userid, "to", newUsername);

  if (!user) throw new Error("User not found");

    return user
}











}
export default new user_services()