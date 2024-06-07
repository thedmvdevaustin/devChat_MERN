import Messages from '../models/MessagesModel.js'
import Conversations from '../models/ConversationsModel.js'

const postMessage = async (req, res) => {
    const { message } = req.body
    const senderId = req.user._id
    const receiverId = req.params.id
    try {
        const newMessage = await Messages.create({
            senderId: senderId,
            receiverId: receiverId,
            message: message
        })
        if (!newMessage){
            return res.status(400).json({error: "message wasn't stored in message db"})
        }
        //access senderId and receiverId in the conversations db participants
        //array, and add this message to the messages array
        let conversation = await Conversations.findOne({ participants: { $all: [senderId, receiverId]}})
        console.log(conversation)
        if (!conversation){
            conversation = await Conversations.create({
                messages: [newMessage._id],
                participants: [senderId, receiverId]
            })
        } else {
            conversation.messages.push(newMessage._id)
            await conversation.save()
        }
        //use socket.io to actually send the message to the receiverId
        }catch(err){
        console.log(`error in messageController, postMessage - ${err.message}`)
        res.status(400).json({error: "message failed to send"})
    }
    res.status(200).json({message: "message posted"})
}

export { postMessage }