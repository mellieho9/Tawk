const jwt = require("jsonwebtoken")
const otpGenerator = require("otp-generator")
const crypto = require("crypto")
// 
const User = require("../models/user")
const filterObj = require("../utils/filterObj")
const {promisify} = require("util")
const { emitWarning } = require("process")

const signToken = (userId) => jwt.sign({ userId }, process.env.JWT_SECRET)
// signup -> register - sendOTP - verifyOTP

// https://api.tawk.com/auth/register

// register new user
exports.register = async (req, res, next) => {
    const { firstName, lastName, email, password, verified } = req.body

    const filteredBody = filterObj(req.body, "firstName", "lastName", "password")

    // check if a verified user with given email exists
    const existing_user = await User.findOne({ email: email })

    if (existing_user && existing_user.verified) {
        res.status(400).json({
            status: "error",
            message: "Email is already in use. Please log"
        })
    } else if (existing_user) {
        await User.findOneAndUpdate({ email: email }, filteredBody, { new: true, validateModifiedOnly: true })
        // generate OTP and send email to user
        req.userId = existing_user._id
        next()
    } else {
        // if user record is not available in DB
        const new_user = await User.create(filteredBody)

        // generate OTP and send email to user
        req.userId = new_user._id
        next()
    }
}

exports.sendOTP = async (req, res, next) => {
    const { userId } = req
    const new_otp = otpGenerator(6, { lowerCaseAlphabets: false, upperCaseAlphabets: false, specialChars: false })
    const otp_expiry_time = Date.now() + 10*60*1000 // 10 mins after otp is sent
    await  User.findByIdAndUpdate(userId, {
        otp: new_otp,
        otp_expiry_time,
    })
    // TODO: send mail
    res.status(200).json({
        status: "success",
        message: "OTP sent successfully"
    })
}

exports.verifyOTP = async (req, res, next) => {
// verify OTP and update user record accordingly
    const {email, otp} = req.body
    const user = await User.findOne({
        email,
        otp_expiry_time: {$gt: Date.now() }
    })
    if (!user){
        res.status(400).json({
            status: "error",
            message: "Email is invalid or OTP expired"
        })
    }
    if (!await user.correctOTP(otp, user.otp)){
        res.status(400).json({
            status: "error",
            message: "OTP is incorrect"
        })

    }
    // OTP is correct
    user.verified = true
    user.otp = undefined 
    await user.save({new: true, validateModifiedOnly: true})

    const token = signToken(user._id)

    res.status(200).json({
        status: "success",
        message: "OTP verified successfully!",
        token
    })

}
// login user
exports.login = async (req, res, next) => {
    // 
    const { email, password } = req.body

    if (!email || !password) {
        res.status(400).json({
            status: "error",
            message: "Both email and password are required"
        })
    }


    const userDoc = await User.findOne({ email: email }).select("+password")

    if (!userDoc || !(await userDoc.correctPassword(password, userDoc.password))) {
        res.status(400).json({
            status: "error",
            message: "Email or password is incorrect"
        })
    }

    const token = signToken(userDoc._id)

    res.status(200).json({
        status: "success",
        message: "Logged in successfully",
        token
    })


    

}

exports.protect = async (req, res, next) => {
    // getting token (jwt) and check if it's there
    let token;

    //
    if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")){
        token = req.headers.authorization.split(" ")[1];

    } else if (req.cookies.jwt) {
        token = req.cookies.jwt;
    } else {
        req.status(400).json({
            status: "error",
            message: "You are not logged in! Please log in to get access"
        })
        return;
    }

    // verification of token
    const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET)

    // check if user still exists
    const this_user = await User.findById(decoded.userId)
    if (!this_user){
        res.status(400).json({
            status: "error",
            message: "The user doesn't exist"
        })
    }

    // check if user changed their password after token was issued
    if (this_user.changedPasswordAfter(decoded.iat)){
        res.status(400).json({
            status: "error",
            message: "User recently updated password! Please log in again"
        })

    }
    
    //
    req.user = this_user;
    next();

}   

// type of routes -> protected (only logged in users can access these routes) 

exports.forgotPassword = async(req,res,next) => {
    // get user email
    const user = await User.findOne({ email: req.body.email })
    if (!user){
        res.status(400).json({
            status: "error",
            message: "There is no user with given email address"
        }
        )
    }
    // generate the random reset token
    const resetToken = user.createPasswordResetToken();
    const resetURL = `https://tawk.com/auth/reset-password/?code=${resetToken}`
    try { 

        res.status(200).json({
            status: "success",
            message: "Reset password link sent to email"
        })

    } catch (error){
        user.passwordResetToken = undefined;
        user.passwordResetExpires = undefined;
        await user.save({
            validateBeforeSave: false
        })
        res.status(500).json({
            status:"error",
            message: "There was an error sending the email. Please try again later"
        })
    }
}

exports.resetPassword = async(req,res,next) => {
    // get user based on token
    const hashedToken = crypto.createHash("sha256").update(req.params.token)
    const user = await User.findOne({
        passwordResetToken: hashedToken,
        passwordResetExpires: {$gt: Date.now()},
    })   

    // if token has expired or user is out of time window
    if (!user){
        res.status(400).json({
            status: "error",
            message: "Token is invalid or expired"
        })
    }

    // update users password and set resetToken & expiry to undefined
    user.password = req.body.password
    user.passwordConfirm = req.body.passwordConfirm
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;

    await user.save()

    // log in the user and send new jwt
    // TODO -> Send email to user informing about password reset
    const token = signToken(user._id)
    res.status(200).json({
        status: "success",
        message: "Password reset successfully",
        token
    })
}