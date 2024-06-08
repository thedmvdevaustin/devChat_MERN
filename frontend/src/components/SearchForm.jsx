import { IoMdSearch } from 'react-icons/io'
import { useState } from 'react'
 
const SearchForm = () => {
    const [search, setSearch] = useState("")

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