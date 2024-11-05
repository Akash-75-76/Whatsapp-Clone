import Conversation from "../model/Conversation.js";

export const newConversation = async (request, response) => {
  try {
    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;

    // Check if the conversation already exists
    const exist = await Conversation.findOne({
      members: { $all: [receiverId, senderId] },
    });

    if (exist) {
      return response.status(200).json('Conversation already exists');
    }

    // Create a new conversation instance
    const conversation = new Conversation({
      members: [senderId, receiverId],
    });

    // Save the new conversation
    await conversation.save();

    return response.status(200).json('Conversation saved successfully');
  } catch (error) {
    return response.status(500).json(error.message);
  }
};
export const getConversation=async(request,response)=>{
  try {

    const senderId = request.body.senderId;
    const receiverId = request.body.receiverId;
    
    let conversation= await Conversation.findOne({members:{$all:[receiverId,senderId] }})
    return response.status(200).json(conversation);
  } catch (error) {
    return response.status(500).json(error.message);
  }
}