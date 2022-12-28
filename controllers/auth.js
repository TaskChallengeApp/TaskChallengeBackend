const User = require("../models/User")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middlewares/async")



// @desc    Register user
// @route   POST /api/v1/auth/register
// @access  Public
exports.register = asyncHandler(async (req, res, next) =>{

   // Create user
   const user = await User.create({})


   res.status(200).json({success:true,data: user})
})


// @desc    Get users
// @route   POST /api/v1/auth
// @access  Private
exports.getUsers = asyncHandler(async (req, res, next) =>{
    const users = await User.find()
    res.status(200).json({success:true,data:users})
})


 // @desc   Get current logged in user
// @route   POST /api/v1/auth/me
// @access  Private
exports.getMe = asyncHandler(async (req, res, next) =>{
    const user = await User.findById(req.user.id)

    res.status(200).json({success:true,data: user})
})


