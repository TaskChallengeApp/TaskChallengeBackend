const Daily = require("../models/Daily")
const ErrorResponse = require("../utils/errorResponse")
const asyncHandler = require("../middlewares/async")


// @desc    Get all dailies
// @route   GET /api/v1/dailies
// @access  Public
exports.getDailies = asyncHandler(async (req, res, next) =>{
    const dailies = await Daily.find({"isBase":true})

    res.status(200).json({
        success: true, data: dailies
    })
})

// @desc    Get single daily
// @route   GET /api/v1/dailies/:id
// @access  Public
exports.getDaily = asyncHandler(async (req, res, next) =>{
    const daily = await Daily.findById(req.params.id)

    if(!daily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }

    res.status(200).json({success: true, data: daily})
})

// @desc    Create new daily
// @route   GET /api/v1/dailies
// @access  Private
exports.createDaily = asyncHandler(async (req, res, next) =>{
    const daily = await  Daily.create(req.body)
    res.status(201).json({success: true, data: daily})        
})

// @desc    Update daily
// @route   PUT /api/v1/dailies/:id
// @access  Private
exports.updateDaily = asyncHandler(async (req, res, next) =>{

    console.log(req.body)

    const daily = await Daily.findByIdAndUpdate(req.params.id, req.body,{
        new:true,
        runValidators:true
    })

    if(!daily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }

    res.status(200).json({success: true, data: daily})
})


// @desc    Delete daily
// @route   DELETE /api/v1/daily/:id
// @access  Private
exports.deleteDaily = asyncHandler(async (req, res, next) =>{

    const daily = await Daily.findByIdAndDelete(req.params.id)

    if(!daily){
        return next(new ErrorResponse(`Daily not found with id of ${req.params.id}`,404))
    }

    res.status(200).json({success: true, data : daily})
})
