const mongoose = require("mongoose")
const bcrypt = require("bcryptjs")
const crypto = require("crypto")

const userSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: [true, "First name is required"]
    },
    lastName: {
        type: String,
        required: [true, "Last name is required"]
    },
    avatar: {
        type: String,
    },
    email: {
        type: String,
        required: [true, "Email is required"],
        validate: {
            validator: function (email) {
                return String(email).toLowerCase().match("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$")
            },
            message: (props) => `Email (${props.value}) is invalid`
        }
    },
    password: {
        type: String
    },
    passwordConfirm:{
        type: String,
    }
    ,
    passwordChangedAt: {
        type: Date,
    },
    passwordResetToken: {
        type: String,
    },
    passwordResetExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
    },
    updatedAt: {
        type: Date,
    },
    verified: {
        type: Boolean,
        default: false,
    },
    otp: {
        type: Number,
    },
    otp_expiry_time: {
        type: Date
    }
})

userSchema.pre("save", async function(next){
    // only run this function if OTP is modified
    if (!this.isModified("otp")) return next()
    // hash the OTP with the cost of 12
    this.otp = await bcryptjs.hash(this.otp, 12 )
    next()
})


userSchema.pre("save", async function(next){
    // only run this function if OTP is modified
    if (!this.isModified("password")) return next()
    // hash the OTP with the cost of 12
    this.password = await bcryptjs.hash(this.password, 12 )
    next()
})

userSchema.methods.correctOTP = async function (
    candidateOTP, 
    userOTP
){
    return await bcrypt.compare(candidateOTP, userOTP)
}



userSchema.methods.correctPassword = async function (
    candidatePassword, 
    userPassword
){
    return await bcrypt.compare(candidatePassword, userPassword)
}

userSchema.methods.createPasswordResetToken = function(){
    const resetToken = crypto.randomBytes(32).toString("hex")
    this.passwordResetToken = crypto.createHash("sha256").update(resetToken).digest("hex")
    this.passwordResetExpires = Date.now() + 10*60*1000;
    
    return resetToken

}

userSchema.methods.changePasswordAfter = function (timestamp){
    return timestamp < this.passwordChangedAt;
}

const User = new mongoose.model("User", userSchema)

module.exports = User