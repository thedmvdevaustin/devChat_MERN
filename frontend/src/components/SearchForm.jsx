import { IoMdSearch } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { useGetAllConversationsQuery, selectAllConversations } from '../slices/conversationsApiSlice'
import { useGetAllUserQuery, selectAllUsers } from '../slices/usersApiSlice'
import { useSelector } from 'react-redux'
import { useNavigate, NavLink } from 'react-router-dom'
import Contacts from './Contacts'
const SearchForm = () => {
    const [search, setSearch] = useState("")
    // const [newConversations, setNewConversations] = useState([])
    const { data: usersData } = useGetAllUserQuery()
    const { data } = useGetAllConversationsQuery()
    const fullContactsInfo = useSelector(selectAllConversations)
    const userInfo = useSelector(state => state.auth.userInfo)
    const idsOfContacts = fullContactsInfo.map(contact => contact.participants[1])

   const listOfUsersContactInfo = useSelector(state => selectAllUsers(state, idsOfContacts))

    const changeSearch = e => {
        setSearch(e.target.value)
    }


    const handleSearch = e => {
        e.preventDefault()
        const res = usersData.find(user => (`${user.firstName} ${user.lastName}`)===search)
        setSearch("")
        // const newConvo = data.filter(user => user._id!==search._id)
        //see if searched user is in our conversation list
        //if it is then remove it from the list(filter it out) and 
        //add it back to the top
        //else add it to the top of conversation list
    }
    return (
        <>
            <div className="searchForm-container">
                <form onSubmit={handleSearch} className="searchForm">
                    <input required onChange={changeSearch} value={search} placeholder="Search..." className="search-input" />
                    <button type="submit"><IoMdSearch /></button>
                </form>
            </div>
            <div className="contacts-container">
                {listOfUsersContactInfo && listOfUsersContactInfo.map(user => <NavLink key={user._id} to={`/dashboard/${user._id}`} className={({ isActive, isPending }) => {
                    return (isActive ? "active" : "inActive")
                }}>
                    <div className="contact">
                        <img src={`https://avatar.iran.liara.run/username?username=${user.firstName}+${user.lastName}`} alt="#" />
                        <span>{user.firstName} {user.lastName}</span>
                    </div>
                </NavLink>)}
            </div>
        </>
    )
    
}
export default SearchForm