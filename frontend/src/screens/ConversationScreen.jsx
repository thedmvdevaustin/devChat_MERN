import { useGetConvoMessagesQuery, useGetUserByIdQuery } from '../slices/conversationsApiSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom'

const ConversationScreen = () => {
    const { id } = useParams()
    const { data: convoMessages } = useGetConvoMessagesQuery(id)
    const { data: receiverId} = useGetUserByIdQuery(id)
    const [postMessage, setPostMessage] = useState("")
    const handleMessage = e => {
        setPostMessage("e.target.value")
    }
    return (
        <>
            <div className="receiver">
                <p>To: {receiverId && receiverId.fullName}</p>
            </div>
            <div className="conversation">
                {convoMessages && convoMessages.map(message => <div className={message.receiverId===id ? "senderMessage" : "receiverMessage"} key={message._id}>
                    <img src="https://avatar.iran.liara.run/username?username=Scott+Wilson" alt="#" />
                    <p>{message.message}</p>
                    <span>12:00</span>
                </div>)}
            </div>
        </>
    )
}

export default ConversationScreen