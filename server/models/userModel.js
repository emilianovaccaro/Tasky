const mongoose = require('mongoose')

const userSchema = mongoose.Schema({
    username: {
      type: String,
      unique: true,
      required: [true, 'Please add a username'] 
    },
    fullname: {
      type: String,
      required: [true, 'Please add your fullname']
    },
    email: {
      type: String,
      required: [true, 'Please add an email'],
      unique: true,
    },
    teamId: {
      type: String,
      required: true,
    },
    teamPassword: {
      type: String,
      required: [true, 'Please add a teamPassword']
    },
    password: {
      type: String,
      required: [true, 'Please add a password']
    },
    isAdmin: {
      type: Boolean,
      default: false,
    },
    role: {
      type: String,
    },
    phone: {
      type: String
    },
    profilePhoto: {
      type: String,
      default: undefined,
    },
  }, 
  {
    timestamps: true
  }
)


module.exports = mongoose.model('User', userSchema)