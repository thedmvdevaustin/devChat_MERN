import { IoMdHand } from 'react-icons/io'
import { LuMessagesSquare } from "react-icons/lu";
import { useSelector } from 'react-redux'
const NoConvoDisplay = () => {
    const user = useSelector(state => state.auth.userInfo)
    return (
        <div className="noConvo-display">
                <p>Welcome <IoMdHand /> {user.firstName} {user.lastName}</p>
                <p>Select a chat to start messaging</p>
                <LuMessagesSquare />
            </div>
    )
}

export default NoConvoDisplay