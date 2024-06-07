import User from '../models/UserModel.js'
import generateToken from '../utils/generateToken.js'

const register = async (req, res) => {
    const { fullName, email, password } = req.body
    try {
        let user = await User.findOne({email: email})
        if (user) {
            return res.status(400).json({error: "User already exists"})
        }
        const newUser = await User.create({
            fullName,
            email,
            password
        })
        if (newUser){
            generateToken(newUser, res)
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email
            })
        } else {
            return res.status(400).json({error: "Failed to create User"})
        }
        
    } catch(err){
        console.log(`error in register controller, ${err.message}`)
        res.status(500).json({error: "Internal server error, "})
    }
}

const login = async (req, res) => {
    const { email, password } = req.body
    try {
        const user = await User.findOne({email: email})
        if (!user) {
            return res.status(400).json({error: "User does not exist"})
        }
        if (await user.matchPasswords(password)){
            generateToken(user, res)
            res.status(200).json({
                _id: user._id,
                fullName: user.fullName,
                email: user.email
            })
        }
    } catch(err){
        console.log(`error in the login controller - ${err.message}`)
        res.status(500).json({error: "Internal server error"})
    }
}

const logout = async (req, res) => {
    //since idk how to delete the cookie logic is to create a new one and have it
    //expire immediately
    res.cookie('jwt', process.env.JWT_SECRET, {
        httpOnly: true,
        maxAge: new Date(0)
    })
    res.status(200).json({message: "User logged out!"})
}

export { register, login, logout }

