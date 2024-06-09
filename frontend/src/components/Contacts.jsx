import { useGetAllConversationsQuery } from '../slices/conversationsApiSlice'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
    const { data, isLoading } = useGetAllConversationsQuery()
    return (
        <div className="contacts-container">
            {data && data.map(user => <NavLink key={user._id} to={`/dashboard/${user._id}`} className="user">
                <div className="contact">
                    <img src="https://avatar.iran.liara.run/username?username=Scott+Wilson" alt="#" />
                    <span>{user.fullName}</span>
                </div>
            </NavLink>)}
        </div>
    )
}

export default Contacts