import Conversations from '../models/ConversationsModel.js'
import User from '../models/UserModel.js'
import Messages from '../models/MessagesModel.js'

const getConversation = async(req, res) => {
    const receiverId = req.params.id
    try {
        const conversation = await Conversations.findOne({
            participants: { $all: [req.user._id, receiverId]}
        }).populate("messages")
        // if (!conversation){
        //     return res.status(400).json({error: "no conversation found"})
        // } else {
        //     const convo = await Promise.all(conversation.messages.map(async x => {
        //         return await Messages.findOne(x)
        //     }))
        // this was the logic i used before i learned about populate
        // returns everything that is inside of the messages array alone
        res.status(200).json(conversation)
    } catch(err){
        console.log(`error, conversationController, getConversation - ${err.message}`)
    }
}

const getAllConversations = async(req, res) => {
    //logic is to get an array of the receivers information from the user db
    //this way i have the data to create a sidebar with all the conversations
    try {
        //gets all the conversations that the sender has
        const conversations = await Conversations.find({
            participants: { $all: [req.user._id]}
        })
        if (!conversations){
            return res.status(400).json({error: "no conversations found"})
        } else {
            //creates an array of an array of users, these users are the receivers without the password
            // const senderConversations = await Promise.all(conversations.map(async x => {
            //     if (x.participants[1].equals(req.user._id)) {
            //         return await User.find(x.participants[0]).select("-password")
            //     } else {
            //         return await User.find(x.participants[1]).select("-password")
            //     }
            // }))

            res.status(200).json(conversations)
        }
    } catch(err){
        console.log(`error, conversationsController getAllConversations - ${err.message}`)
    }
}

const getAllUsers = async (req, res) => {
    try{
        const users = await User.find().select("-password")
        if (!users){
            return res.status(400).json({error: "There are no users"})
        }
        res.status(200).json(users)
    } catch(err){
        console.log(`error, userController, getAllUsers - ${err.message}`)
    }
}

const getUserById = async (req, res) => {
    
    try{
        const user = await User.findById(req.params.id)
        if (!user){
            return res.status(400).json({error: "User does not exist"})
        }
        res.status(200).json(user)
    } catch(err){
        console.log(`error, conversationController, getUserById - ${err.message}`)
        res.status(400).json({error: "couldn't get user from db"})
    }
}

export { getConversation, getUserById, getAllConversations, getAllUsers}