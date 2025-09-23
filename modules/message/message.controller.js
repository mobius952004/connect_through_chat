import messageService from "./message.service.js";

class MessageController {
  async sendMessages(req, res) {
    try {
      const { chatId } = req.params;
      const { from, content } = req.body;

      const msg = await messageService.sendMessage({
        chatId,
        from,
        content,
      });

      res.status(201).json(msg);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }

  async getMessages(req, res) {
    try {
      const { chatId } = req.params;
      console.log(chatId)
      const messages = await messageService.getMessages(chatId);
      // console.log(messages)
      res.status(200).json(messages);
    } catch (error) {
      res.status(500).json({ error: error.message });
    }
  }
}

export default new MessageController();