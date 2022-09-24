const express = require('express')
const { registerUser, loginUser, getUser, getAllUser, updateProfile } = require('../controllers/userController')
const { protect } = require('../middlewares/auth')
const router = express.Router()

router.post('/register', registerUser)
router.post('/login', loginUser)
router.get('/profile', protect, getUser)
router.patch('/profile', protect, updateProfile)
router.get('/all', protect, getAllUser)

module.exports = router