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
      req.user = await User.findById(decoded.id).select('-password');
      
      next();

    } catch (error) {
      res.status(500).json(error)
    }
  }

  if (!token) {
    res.status(401).json({msg: 'you must log in first'})
  }
};

module.exports = { protect };