import userServices from "./user.service.js"


class user_controller{

    async userprofile(req,res){
       
      // console.log("user from JWT:", req.user);
        try{
           const userID=req.user.sub
           const user= await userServices.userprofile(userID)
           res.status(200).json(user)

        }catch(err){
            res.status(err.status|| 500).json({message:"un authorized"})
        }
        
    }

    async change_status(req,res){

    const userID=req.user.sub
    const status = req.user.status
    try{
        const user = await userServices.changestatus({userID,status})
        res.status(200).json({message:"Status Updated",user})
    }catch(err){
 res.status(500).json({message: err.message})

    }

}

    async update_profilepicture(){

 const {sub,profilePic}=req.user
 try{
    const user=await userServices.change_profilepicture({userid:sub,profilePic})
    res.json({message:"Profile Picture Updated",user})
 }catch (err){
    res.status(500).json({message:err.essage})
 }

    }


 async change_password(req,res){
   
    const {newpassword,oldpassword}=req.body
    const userid=req.user.sub
    try{
        const user= await userServices.change_password({userid,newpassword,oldpassword})
    res.json(user);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
    
 }

  async change_username(req,res){

const{newUsername}=req.body
const userid =req.user.sub
try{
    const user = await userServices.change_username({userid,newUsername})
    res.json({ message: "Username updated", user });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
  }
}

export default new user_controller()