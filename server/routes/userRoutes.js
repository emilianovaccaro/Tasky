const express = require('express');
const { registerUser, loginUser, getUser, getAllUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);
router.get('/all', protect, getAllUser);

module.exports = router;