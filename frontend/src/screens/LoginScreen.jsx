import { FaLock } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { Link, useNavigate } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { useLoginMutation } from '../slices/usersApiSlice'
import { useDispatch, useSelector } from 'react-redux'
import { setCredentials } from '../slices/authSlice'

const LoginScreen = () => {
    const dispatch = useDispatch()
    const [login, { isLoading }] = useLoginMutation()
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const navigate = useNavigate()
    const userInfo = useSelector(state => state.userInfo)

    useEffect(() => {
        if (userInfo){
            navigate("/dashboard")
        }

    },[navigate, userInfo])

    const handleEmail = e => {
        setEmail(e.target.value)
    }

    const handlePassword = e => {
        setPassword(e.target.value)
    }

    const handleSubmit = async e => {
        e.preventDefault()
        try {
            const userData = await login({ email, password }).unwrap()
            dispatch(setCredentials(userData))
            setEmail("")
            setPassword("")
            navigate('/dashboard')
            // toast.success("Login successful!")
        } catch(err){
            // toast.error(err?.data?.message || err.error)
        }
    }

    return (
        <section className="login-container">
            <form onSubmit={handleSubmit} className="login-form">
                <h1>Login</h1>
                <div className="input-container">
                    <input required placeholder="Email" type="text" name="email" className="email" value={email} onChange={handleEmail} />
                    <IoIosMail className="shape" />
                </div>
                <div className="input-container">
                    <input required placeholder="Password" type="password" name="password" className="password" value={password} onChange={handlePassword} />
                    <FaLock className="shape"/>
                </div>
                <div className="button-container">
                    <button type="submit">Login</button>
                </div>
                <div className="toRegister">
                    <p>Need to register? <Link to="/register">Register</Link></p>
                </div>
            </form>
        </section>
    )
}

export default LoginScreen