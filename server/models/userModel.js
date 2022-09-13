const mongoose = require('mongoose');

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
      default: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQzEX0krKR0Zcts31p4wHdlgbYk94A8JjO7aCPpdAkgOhIv5sd-CiJPimPp1BeaV4iAu1I&usqp=CAU'
    },
  }, 
  {
    timestamps: true
  }
)

userSchema.methods.setImgUrl = function setImgUrl (filename) {
  const host = process.env.HOST
  const port = process.env.PORT

  this.profilePhoto = `${host}:${port}/public/${filename}`
}

module.exports = mongoose.model('User', userSchema);