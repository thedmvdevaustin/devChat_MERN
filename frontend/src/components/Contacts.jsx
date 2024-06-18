import { useGetAllConversationsQuery } from '../slices/conversationsApiSlice'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
    const { data } = useGetAllConversationsQuery()
    return (
        <div className="contacts-container">
            {data && data.map(user => <NavLink key={user._id} to={`/dashboard/${user._id}`} className={({ isActive, isPending }) => {
                return isActive ? "active" : "inActive"
            }}>
                <div className="contact">
                    <img src={`https://avatar.iran.liara.run/username?username=${user.firstName}+${user.lastName}`} alt="#" />
                    <span>{user.firstName} {user.lastName}</span>
                </div>
            </NavLink>)}
        </div>
    )
}

export default Contacts