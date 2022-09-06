const express = require('express');
const { registerUser, loginUser, getUser } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const router = express.Router();


router.post('/register', registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);

module.exports = router;