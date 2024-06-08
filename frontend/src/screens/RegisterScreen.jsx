import { IoPersonSharp } from "react-icons/io5"
import { FaLock } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useRegisterMutation } from '../slices/usersApiSlice'
import { setCredentials } from '../slices/authSlice'
import { toast } from 'react-toastify'

const RegisterScreen = () => {
    const navigate = useNavigate()
    const dispatch = useDispatch()
    const [fullName, setFullName] = useState("")
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [password2, setPassword2] = useState("")
    const userInfo = useSelector(state => state.userInfo)
    const [register, { isLoading }] = useRegisterMutation()

    useEffect(() => {
        if (userInfo){
            navigate("/dashboard")
        }
    }, [navigate, userInfo])

    const handleFullName = e => {
        setFullName(e.target.value)
    }

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handlePassword2 = e => {
        setPassword2(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        if (password!==password2){
            toast.error("Passwords don't match")
            setPassword("")
            setPassword2("")
            return
        }
        try {
            const user = await register({fullName, email, password})
            console.log(user)
            dispatch(setCredentials(user))
            toast.success("Registered, Welcome to devChat!")
            navigate("/dashboard")
        } catch(err){
            toast.error(err?.data?.message || err.error)
        }
    }
    return (
        <section className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Register</h1>
                <div className="input-container">
                    <input required value={fullName} onChange={handleFullName} placeholder="Full Name" type="text" name="fullName" className="email" />
                    <IoPersonSharp className="shape" />
                </div>
                <div className="input-container">
                    <input required value={email} onChange={handleEmail} placeholder="Email" type="text" name="email" className="email" />
                    <IoIosMail className="shape" />
                </div>
                <div className="input-container">
                    <input required value={password} onChange={handlePassword} placeholder="Password" type="password" name="password" className="password" />
                    <FaLock className="shape"/>
                </div>
                <div className="input-container">
                    <input required value={password2} onChange={handlePassword2} placeholder="Confirm Password" type="password" name="password2" className="password" />
                    <FaLock className="shape"/>
                </div>
                <div className="button-container">
                    <button type="submit">Register</button>
                </div>
                <div className="toRegister">
                    <p>Already Registered? <Link to="/">Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default RegisterScreen