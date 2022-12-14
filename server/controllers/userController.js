const jwt = require('jsonwebtoken')
const bcryptjs = require('bcryptjs')
const User = require('../models/userModel')


//Generate JWT
const generateToken = (id, email, username) => {
  return jwt.sign({ id, email, username }, process.env.JWT_SECRET, {
    expiresIn: '30d',
  })
}


const validateEmail = (email) => {
  let validRegex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/
  return email.match(validRegex)
}

//description - create a user
//route - POST to api/users
// access Public / any person can register

const registerUser = async (req, res) => {
  try {
    const { username, email, password, teamId, isAdmin, role, phone, teamPassword, fullname, profilePhoto } = req.body
    
    if (!username || !phone || !email || !password || !teamId || !role || !teamPassword || !fullname) {
      return res.status(400).json({msg: 'Completa todos los campos'})
    }
   
    if(!validateEmail(email)) return res.status(400).json({msg: 'El correo electrónico es inválido'})
    if(username.length < 4)  return res.status(400).json({msg: 'El nombre de usuario debe tener al menos 4 caracteres'})
    if(fullname.length < 4)  return res.status(400).json({msg: 'El nombre y apellido debe tener al menos 4 caracteres'})
    if(password.length < 6) return res.status(400).json({msg: 'La contraseña debe tener al menos 6 caracteres'})
    if(teamPassword.length < 6) return res.status(400).json({msg: 'La contraseña del equipo debe tener al menos 6 caracteres'})
    if(phone.length < 6) return res.status(400).json({msg: 'El número de teléfono debe tener al menos 6 caracteres'})

    const emailExists = await User.findOne({ email })
    if (emailExists) {
      return res.status(400).json({ msg: 'El correo electrónico ya se encuentra en uso' })
    }

    const usernameExists = await User.findOne({ username })
    if (usernameExists) {
      return res.status(400).json({ msg: 'El nombre de usuario ya se encuentra en uso' })
    }

    const teamIdExist = await User.findOne({ teamId })

    if (isAdmin) {
      if(teamIdExist) {
        return res.status(400).json({ msg: 'El ID del equipo ya existe' })
      }
    } else {
      if(!teamIdExist) {
        return res.status(404).json({ msg: 'El ID del equipo no existe' })
      }

      const isValidPassword = bcryptjs.compareSync( teamPassword, teamIdExist.teamPassword )
      if(!isValidPassword) {
        return res.status(403).json({ msg: 'La contraseña del equipo es incorrecta' })
      }
    }

    const salt = bcryptjs.genSaltSync(10)
    const hashedPassword = bcryptjs.hashSync( password, salt )
    const hashedTeamPassword = bcryptjs.hashSync( teamPassword, salt )
    
    const user  = User({
      username,
      fullname,
      email,
      teamId,
      password: hashedPassword,
      phone,
      role,
      isAdmin,
      teamPassword: hashedTeamPassword,
      profilePhoto
    })

    const newUser = await user.save()
    const userToken = generateToken(newUser._id, email, username)
    
    if (!newUser) {
     return res.status(400).json({ msg: 'Hubo un error al crear el usuario' })
    }

    res.status(201).json({ newUser, userToken })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


//description - auth a user
//route - POST to api/users/login
// access Public / any registered user can try to login
const loginUser = async (req, res) => {
  const { username, password } = req.body

  try{
    const user = await User.findOne({ username })
    
    //check if there's a user
    if( !user ){
      return res.status(404).json({ msg:'Usuario no encontrado' })
    }
    //Compare passwords
    const isValidPassword = bcryptjs.compareSync( password, user.password )
    
    if (!isValidPassword) {
      return res.status(400).json({ msg:'Contraseña incorrecta' })
    }

    //create jwt
    const userToken = generateToken(user._id)

    res.status(201).json({
      userToken
    })

  } catch ( error ) {
    res.status(500).json({ error })
  }
}

//description - get user data
//route - GET to api/users/profile
//this controller/route is protected - just the logged in user can access this
const getUser = async (req, res) => {
  try {
    res.status(200).json(req.user)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const getAllUser = async (req, res) => {
  try {

    const {teamId} = req.user

    const allUsers = await User.find({teamId}).select('-password -teamPassword')
    
    res.status(200).json(allUsers)

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

const updateProfile = async (req, res) => {
  try {

    const {password, newPassword} = req.body
    const user = await User.findById(req.user._id)

    if (!user) return res.status(404).json({ msg: 'Usuario no encontrado' }) 
    if (!password || !newPassword) return res.status(400).json({ msg: 'Complete los campos' }) 


    if(password && newPassword) {
      if(newPassword.length < 6) return res.status(400).json({msg: 'La contraseña del equipo debe tener al menos 6 caracteres'})

      const isValidPassword = bcryptjs.compareSync( password, user.password )
      console.log(isValidPassword)
      if (!isValidPassword) return res.status(400).json({ msg:'Contraseña incorrecta' })
      
      const salt = bcryptjs.genSaltSync(10)
      const hashedPassword = bcryptjs.hashSync( newPassword, salt )

      user.password = hashedPassword ||  user.password
    }

    await user.save()
    return res.status(200).json({msg: 'Usuario actualizado correctamente', user})

  } catch (error) {

    return res.status(500).json({ message: error.message, msg: 'CATCH EN UPDATER' })
  }
}

module.exports = {
  registerUser,
  loginUser,
  getUser,
  getAllUser,
  updateProfile
}


