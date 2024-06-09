import { IoMdSearch } from 'react-icons/io'
import { useState, useEffect } from 'react'
import { useGetAllUserQuery } from '../slices/conversationsApiSlice'
import { useSelector } from 'react-redux'
const SearchForm = () => {
    const [search, setSearch] = useState("")

    const { data: usersData } = useGetAllUserQuery()


    const changeSearch = e => {
        setSearch(e.target.value)
    }
    return (
        <div className="searchForm-container">
            <form className="searchForm">
                <input onChange={changeSearch} value={search} placeholder="Search..." className="search-input" />
                <button type="button"><IoMdSearch /></button>
            </form>
        </div>
    )
}
export default SearchForm