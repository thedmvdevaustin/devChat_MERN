import SearchForm from '../components/SearchForm'
import Contacts from '../components/Contacts'
import { CiLogout } from "react-icons/ci"
import { useLogoutMutation } from '../slices/usersApiSlice'
import { logout } from '../slices/authSlice'
import { useDispatch } from 'react-redux'
import { useNavigate, Outlet } from 'react-router-dom'
import { toast } from 'react-toastify'

const DashboardScreen = () => {
    const dispatch = useDispatch()
    const navigate = useNavigate()
    const [logoutUser, { isLoading }] = useLogoutMutation()

    const handleLogout = async e => {
        e.preventDefault()
        try {
            await logoutUser()
            dispatch(logout())
            navigate("/")
            toast.success("Logged out!")
        } catch(err){
            toast.error(err?.data?.message || err.message)
        }
    }

    return (
        <section className="dashboard-container">
            <div className="dashboard-left">
                <SearchForm />
                <Contacts />
                <div className="logout">
                    <form onSubmit={handleLogout}>
                        <button data-tool-tip="Logout" type="submit">
                            <CiLogout />
                        </button>
                    </form>
                </div>
            </div>
            <div className="dashboard-right">
                <Outlet />
            </div>
        </section>
    )
}

export default DashboardScreen