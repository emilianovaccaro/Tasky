const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const protect = async (req, res, next) => {
  //let JWT
  let token;

  // CHECK AUTHORIZATION HEADERS, 'Bearer jwtoken'
  if (req.headers.authorization && req.headers.authorization.startsWith('Bearer')) {
    try {

      token = req.headers.authorization.split(' ')[1];
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      //Get user by token
      //Exclude password
      req.user = await User.findById(decoded.id).select('-password -teamPassword');
      
      next();

    } catch (error) {
      res.status(401);
      throw new Error('Auth error/Not Authorized');
    }
  }

  if (!token) {
    res.status(401)
    throw new Error('Not authorized, no token')
  }
};


module.exports = { protect };