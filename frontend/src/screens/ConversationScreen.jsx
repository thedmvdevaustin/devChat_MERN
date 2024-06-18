import { useGetConvoMessagesQuery, usePostMessageMutation } from '../slices/messagesApiSlice'
import { selectUsersById } from '../slices/usersApiSlice'
import { useState } from 'react'
import { useParams } from 'react-router-dom'
import { IoMdHand, IoIosSend } from 'react-icons/io'
import { LuMessagesSquare } from "react-icons/lu";
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { useSocketContext } from '../socket/SocketContextProvider'

const ConversationScreen = () => {
    const { id } = useParams()
    const user = useSelector(state => state.auth.userInfo)

    const { data: allMessages } = useGetConvoMessagesQuery(id)
    const receiverId = useSelector(state => selectUsersById(state, id))
    const [ postMessageFunction ] = usePostMessageMutation()
    const [postMessage, setPostMessage] = useState("")

    const { socket } = useSocketContext()
    const handleMessage = e => {
        setPostMessage(e.target.value)
    }

    const submitMessage = async e => {
        e.preventDefault()
        try {
            await postMessageFunction({message: postMessage, id: id})
            setPostMessage("")
        } catch(err){
            toast.error(err?.data?.message || err.message)
        }
    }
    return (
        
        <>
            <div className="receiver">
                <p>To: {receiverId && receiverId.firstName} {receiverId && receiverId.lastName}</p>
            </div>
            {allMessages && allMessages.participants[0]===user?._id && allMessages.participants[1]===id ?
            <>
                <div className="conversation">
                    {allMessages.messages.map(message => <div className={message.receiverId===id ? "senderMessage" : "receiverMessage"} key={message._id}>
                        <img src={`https://avatar.iran.liara.run/username?username=${message.receiverId===id ? user?.firstName : receiverId.firstName}+${message.receiverId===id ? user?.lastName : receiverId.lastName}`} alt="#" />
                        <p>{message.message}</p>
                        <span>12:00</span>
                    </div>)}
                </div>
                <div className="sendMessage-container">
                    <form onSubmit={submitMessage} className="sendMessage-form">
                        <input required placeholder="Send a Message" type="text" onChange={handleMessage} value={postMessage} />
                        <button type="submit"><IoIosSend /></button>
                    </form>
                </div>
            </>
            :
            <>
                <div className="noConvo-display">
                    <p>Hello <IoMdHand /> {user?.firstName} {user?.lastName}</p>
                    <p>Send a message to start a conversation</p>
                    <LuMessagesSquare />
                </div>
                <div className="sendMessage-container">
                    <form className="sendMessage-form">
                        <input placeholder="Send a Message" type="text" onChange={handleMessage} value={postMessage} />
                        <button type="button"><IoIosSend /></button>
                    </form>
                </div>
            </>
            }
            
        </>
    )
}

export default ConversationScreen