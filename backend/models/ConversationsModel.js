import mongoose from "mongoose"

const ConversationsSchema = mongoose.Schema({
    messages: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'Messages',
            default: []
        }
    ],
    participants: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User'
        }
    ]
}, {
    timestamps: true
})

const Conversations = mongoose.model("Conversations", ConversationsSchema)

export default Conversations