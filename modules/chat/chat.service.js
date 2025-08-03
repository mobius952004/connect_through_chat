import chat from './chat.model.js';

export const findorCreateChat = async (userId) => {
    let chat = await Chat.findOne({ users: { $all}})    
}
