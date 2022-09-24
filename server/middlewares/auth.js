const jwt = require('jsonwebtoken')
const User = require('../models/userModel')


const protect = async (req, res, next) => {
  //let JWT
  let token

  // CHECK AUTHORIZATION HEADERS, 'Bearer jwtoken'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1]

      if (!token || token.length < 1) {
        return res.status(500).json({msg: 'USER UNAUTHORIZED - Invalid token'})
      }

      if(token === null) {
        return (res.status(500).json({msg: 'USER UNAUTHORIZED - Invalid token'}))
      }

      
      const decoded = jwt.verify(token, process.env.JWT_SECRET)
      
      //Get user by token
      //Exclude password
      req.user = await User.findById(decoded.id).select('-password -teamPassword')

      if(!req.user){
        return res.status(500).json({msg: 'USER UNAUTHORIZED - Invalid token'})
      }


      next()

    } catch (error) {
      return res.status(500).json({msg: 'USER UNAUTHORIZED - Invalid token'})
    }
  }

  if (!token) {
    return res.status(500).json({msg: 'USER UNAUTHORIZED - Invalid token'})
  }
}

module.exports = { protect }