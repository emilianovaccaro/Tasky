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
    const { username, email, password, teamId, isAdmin, role, phone, teamPassword } = req.body;

    if (!username || !phone || !email || !password || !teamId || !role || !teamPassword) {
      return res.status(400).json({msg: 'Fill in all the fields'})
    }
   
    if(!validateEmail(email)) return res.status(400).json({msg: 'The email is invalid'})
    if(username.length < 6)  return res.status(400).json({msg: 'The username must have more than 6 characters'})
    if(password.length < 6) return res.status(400).json({msg: 'The password must have more than 6 characters'})
    if(teamPassword.length < 6) return res.status(400).json({msg: 'The teamPassword must have more than 6 characters'})
    if(phone.length < 6) return res.status(400).json({msg: 'The number phone must have more than 6 characters'})

    const emailExists = await User.findOne({ email });
    if (emailExists) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    const usernameExists = await User.findOne({ username });
    if (usernameExists) {
      return res.status(400).json({ msg: 'Username already exists' });
    }

    const teamIdExist = await User.findOne({ teamId });

    if(isAdmin) {
      if(teamIdExist) {
        return res.status(400).json({ msg: 'TeamId already exists' })
      }
    } else {
      if(!teamIdExist) return res.status(404).json({ msg: 'TeamId not exists' })

      const isValidPassword = bcryptjs.compareSync( teamPassword, teamIdExist.teamPassword );
      if(!isValidPassword) return res.status(403).json({ msg: 'Incorrect teamPassword' })
    }

    const salt = bcryptjs.genSaltSync(10);
    const hashedPassword = bcryptjs.hashSync( password, salt );
    const hashedTeamPassword = bcryptjs.hashSync( teamPassword, salt );
    
    const user  = {
      username,
      email,
      teamId,
      password: hashedPassword,
      phone,
      role,
      isAdmin,
      teamPassword: hashedTeamPassword
    }

    const newUser = await User.create(user);
    const userToken = generateToken(newUser._id, email, username);
    
    if (!newUser) {
     return res.status(400).json({ msg: 'there was an error creating the user' });
    } 

    res.status(201).json({ newUser, userToken });

  } catch (error) {
    return res.status(500).json({ message: error.message })
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
      user, userToken
    });

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }
};


//description - get user data
//route - GET to api/users/profile
//this controller/route is protected - just the logged in user can access this
const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user);

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}



module.exports = {
  registerUser,
  loginUser,
  getUser
 }