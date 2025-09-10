import Chat from "./chat.model";

class chat_Services {

async setCHatList(userId,){

try{

}

}



    async getChatList(userId) {


        try {
            const chatlist = await Chat.find({users:userId}).populate("users" , "username  profilePic  status isonline ")
            return chatlist
            
        }catch(err){
            throw new Error(err)
    
        }
    }
}

export default new chat_Services

