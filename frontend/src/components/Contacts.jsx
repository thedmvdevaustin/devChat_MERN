import { useGetAllConversationsQuery } from '../slices/conversationsApiSlice'
import { NavLink } from 'react-router-dom'

const Contacts = () => {
    const { data = [], isLoading } = useGetAllConversationsQuery()

    return (
        <div className="contacts-container">
            {data && data.map(user => <NavLink key={user._id} to="#" className="user">
                <div className="contact">
                    <img src="https://avatar.iran.liara.run/username?username=Scott+Wilson" alt="#" />
                    <span>{user.fullName}</span>
                </div>
            </NavLink>)}
        </div>
    )
}
{/* <ul className="contacts">
{data && data.map(user => <li key={user._id}>
    <NavLink to="#" className="user">{user.fullName}</NavLink>
</li>)}
</ul> */}

export default Contacts