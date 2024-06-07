import jwt from 'jsonwebtoken'
import User from '../models/UserModel.js'


const protect = async (req, res, next) => {
    const token = req.cookies.jwt
    if (token){
        try {
            const decoded = jwt.verify(token, process.env.JWT_SECRET)
            req.user = await User.findById(decoded.userId).select("-password")
            next()
        } catch(error){
            res.status(401).json({error: 'Not authorized, invalid token'})
        }
    } else {
        return res.status(401).json({error: 'Not authorized, no token'})
    }
}

export default protect