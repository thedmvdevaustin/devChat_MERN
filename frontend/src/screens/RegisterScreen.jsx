import { IoPersonSharp } from "react-icons/io5"
import { FaLock } from "react-icons/fa"
import { IoIosMail } from "react-icons/io"
import { Link } from 'react-router-dom'
const RegisterScreen = () => {
    return (
        <section className="login-container">
            <form className="login-form">
                <h1>Register</h1>
                <div className="input-container">
                    <input placeholder="Full Name" type="text" name="fullName" className="email" />
                    <IoPersonSharp className="shape" />
                </div>
                <div className="input-container">
                    <input placeholder="Email" type="text" name="email" className="email" />
                    <IoIosMail className="shape" />
                </div>
                <div className="input-container">
                    <input placeholder="Password" type="password" name="password" className="password" />
                    <FaLock className="shape"/>
                </div>
                <div className="button-container">
                    <button type="button">Register</button>
                </div>
                <div className="toRegister">
                    <p>Already Registered? <Link to="/">Login</Link></p>
                </div>
            </form>
        </section>
    )
}

export default RegisterScreen