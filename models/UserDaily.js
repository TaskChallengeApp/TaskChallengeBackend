const mongoose = require('mongoose')

const UserDaily = new mongoose.Schema({

    user:{
        type: mongoose.Schema.ObjectId,
        ref: 'User',
        required: true
    },
    daily:{
        type: mongoose.Schema.ObjectId,
        ref: 'Daily',
        required: true
    },

  createdAt: {
      type: Date,
      default: Date.now
  }
})

module.exports = mongoose.model("UserDaily",UserDaily)
