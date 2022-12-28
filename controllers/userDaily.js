const UserDaily = require("../models/UserDaily")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middlewares/async")


// @desc    Get all userDailies
// @route   GET /api/v1/userDailies
// @access  Public
exports.getAllUserDailies = asyncHandler(async (req, res, next) =>{
    const userDailies = await UserDaily.find().populate("dailies")

    res.status(200).json({
        success: true, data: userDailies
    })
})

// @desc    Get single userDailies
// @route   GET /api/v1/userDailies/:id
// @access  Public
exports.getUserDailies = asyncHandler(async (req, res, next) =>{
    const userDailies = await UserDaily.findById(req.params.id).populate("dailies")

    console.log(userDailies.createdAt.getDay())

    const date1 = userDailies.createdAt
    const date2 = Date.now()
    const diffTime = Math.abs(date2 - date1);
    let diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24)); 
    console.log(diffDays + " days");    

    res.status(200).json({
        success: true, isFinished: (diffDays < 7 ? false : true) , diffDay: diffDays - 1, data: userDailies
    })
})

// @desc    Create new userDaily
// @route   GET /api/v1/dailies
// @access  Private
exports.createUserDaily = asyncHandler(async (req, res, next) =>{
    let userDailies = await UserDaily.create(req.body)
    userDailies = await userDailies.populate("dailies")
    res.status(201).json({success: true, data: userDailies})        
})


// @desc    Update user daily
// @route   PUT /api/v1/dailies/:id
// @access  Private
exports.updateUserDailies = asyncHandler(async (req, res, next) =>{

    let oldUserDaily = await UserDaily.findById(req.params.id)

    if(!oldUserDaily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }


    let userDailies = oldUserDaily.dailies

    userDailies = req.body.dailies

    console.log(userDailies)

    let userDaily = await UserDaily.findOneAndUpdate(req.params.id,  {$set: {dailies : userDailies}},{
        new:true,
        runValidators:true, 
        upsert: true
    })

    if(!userDaily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }

    userDaily = await userDaily.populate("dailies")

    res.status(200).json({success: true, data: userDaily})
})




// @desc    Delete daily
// @route   DELETE /api/v1/daily/:id
// @access  Private
exports.deleteDaily = asyncHandler(async (req, res, next) =>{
    const daily = await Daily.findByIdAndDelete(req.params.id)

    if(!daily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }

    res.status(200).json({success: true, data: {}})
})
