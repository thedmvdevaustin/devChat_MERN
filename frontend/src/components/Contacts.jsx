import { useGetAllConversationsQuery } from '../slices/conversationsApiSlice'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
    const { data = [], isLoading } = useGetAllConversationsQuery()

    return (
        <div className="contacts-container">
            <ul className="contacts">
            {data && data.map(user => <li key={user._id}>
                <NavLink to="#" className="user">{user.fullName}</NavLink>
            </li>)}
            </ul>
        </div>
    )
}

export default Contacts