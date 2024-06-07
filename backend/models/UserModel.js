import mongoose from 'mongoose'
import bcrypt from 'bcryptjs'

const UserSchema = mongoose.Schema({
    fullName: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },

}, {
    timestamps: true
})

//on a save method call, right before it is stored in the db,
//performs an async function that checks if the password wasn't modified
//if it wasn't we move on but if it was then we hash the password then save it
UserSchema.methods.matchPasswords = async function(enteredPassword){
    return await bcrypt.compare(enteredPassword, this.password)
}

UserSchema.pre('save', async function() {
    if (!this.isModified("password")){
        next()
    }
    const salt = await bcrypt.genSalt(10)
    this.password = await bcrypt.hash(this.password, salt)
})

const User = mongoose.model("User", UserSchema)

export default User
