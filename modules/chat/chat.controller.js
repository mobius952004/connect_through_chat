class Chat_controller {
  async setChatList(req, res) {
    const userId = req.user.sub;

    try {
      const chatlist = await chatServices.setchatlist(userId);
      if (!chatlist) {
        res.status(500);
      }
      res.status(200);
    } catch (err) {
      res.json({ msg: err });
    }
  }

  async getChatList(req, res) {
    const userId = req.user.sub;
    try {
      const chatlist = await chatServices.getChatList(userId);
      res.status(200).json(chatlist);
    } catch (err) {
      res.json({ message: err });
    }
  }
}

export default new Chat_controller();
