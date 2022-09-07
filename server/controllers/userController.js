const jwt = require('jsonwebtoken');
const bcryptjs = require('bcryptjs');
const User = require('../models/userModel');
const e = require('express');


//Generate JWT
const generateToken = (id, email, username) => {
  return jwt.sign({ id, email, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  });
};


const validateEmail = (email) => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
  return email.match(validRegex)
}

//description - create a user
//route - POST to api/users
// access Public / any person can register
const registerUser = async (req, res) => {
  try {
    const { username, email, password, teamId, isAdmin, role, phone } = req.body;

    if (!username || !email || !password || !teamId || !role || !phone) {
      return res.status(400).json({msg: 'The username must have more than 4 characters'})
    }
   
    if(!validateEmail(email)) return res.status(400).json({msg: 'The email is invalid'})
    if(username.length < 4)  return res.status(400).json({msg: 'The username must have more than 4 characters'})
    if(password.length < 4) return res.status(400).json({msg: 'The password must have more than 4 characters'})

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({msg: 'User already exists'});
    }

    const teamIdExist = await User.findOne({ teamId });
    if(isAdmin) {
      if(teamIdExist) return res.status(400).json({msg: 'TeamId already exists'});
    } else {
      if(!teamIdExist) return res.status(404).json({msg: 'TeamId not exists'});
    }

    //Hash pw
    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync( password, salt );

    const user  = {
      username,
      email,
      teamId,
      password: hashedPassword,
      phone,
      role,
      isAdmin
    }

    const newUser = await User.create(user);
    const userToken = generateToken(newUser._id, email, username);
    
    if (!newUser) {
     return res.status(400).json({msg: 'there was an error creating the user'});
    } 

    res.status(201).json({ newUser, userToken });

  } catch (error) {
    res.status(500).json({msg: error});
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