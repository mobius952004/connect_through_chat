import chatServices from "./chat.service.js"

class Chat_controller {

  async setChatList(req, res) {
    const userId = req.user.sub
    const otherUserId = req.body.selecteduserId
    const otherUserName = req.body.selectedusername
    console.log("H2")
    console.log(userId)
    console.log(otherUserName)

    try {
      console.log("H3")
      const chat = await chatServices.setChatList(userId, otherUserId, otherUserName)
      // if(!chat){
      //   res.status(500)
      // }
      res.status(200).json(`${chat} created between ${req.user.usernamme}and ${otherUserName}`)
    } catch (err) {
      res.status(404).json({ msg: `chat not created${err}` })
    }

  }

  async getChatList(req, res) {

    const userId = req.user.sub
    try {
      const chatlist = await chatServices.getChatList(userId)
      res.status(200).json(chatlist)

    } catch (err) {
      res.json({ message: err })
    }
  }
}

export default new Chat_controller()