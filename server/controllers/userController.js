const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');


//Generate JWT
const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


//description - create a user
//route - POST to api/users
// access Public / any person can register
const registerUser = async (req, res) => {
  const { username, email, password, teamId } = req.body;

  if (!username || !email || !password) {
    res.status(400);
    throw new Error('Please add all fields');
  }

  //validate email
  const emailExists = await User.findOne({ email });
  if (emailExists) {
      res.status(400);
      throw new Error('User already exists');
  }

  //Hash pw
  const salt = bcryptjs.genSaltSync(10);
  const hashedPassword = bcryptjs.hashSync( password, salt );

  
  //Create User instance for db
  const user = await User.create({
    username,
    email,
    teamId,
    password: hashedPassword,
    
  });
  
  //create jwt
  const userToken = generateToken(user._id);
  
  if (user) {
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      teamId: user.teamId,
      token: userToken
    });
  } else {
    res.status(400);
    throw new Error('Invalid User');
  }
}


//description - auth a user
//route - POST to api/users/login
// access Public / any registered user can try to login
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  try{
    const user = await User.findOne({ email });

    //check if there's a user
    if( !user ){
      return res.status(400).json({ msg:'Incorrect email' });
    }

    //Compare passwords
    const isValidPassword = bcryptjs.compareSync( password, user.password );
    if (!isValidPassword) {
      return res.status(400).json({ msg:'Incorrect password' });
    }

    //create jwt
    const userToken = generateToken(user._id);
  
    res.status(201).json({
      _id: user.id,
      username: user.username,
      email: user.email,
      teamId: user.teamId,
      token: userToken
    });

  } catch ( error ) {
    res.status(400);
    throw new Error('Invalid email/password');
  }
};


//description - get user data
//route - GET to api/users/profile
//this controller/route is protected - just the logged in user can access this
const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);

  } catch (error) {
    console.log(error);
    res.status(404);
    throw new Error('Profile error, please contact us');
  }
}



module.exports = {
  registerUser,
  loginUser,
  getUser
}