const mongoose = require('mongoose')

const DailySchema = new mongoose.Schema({
    message: {
      type: String,
      required: [true, "Please add a message"]
    },
    isChecked: {
        type: Boolean,
        default: false
    },
    isCompleted: {
        type: Boolean,
        default: false
    },
    createdAt: {
      type: Date,
      default: Date.now
    }
})

module.exports = mongoose.model("Daily",DailySchema)
