const express = require('express');
const { registerUser, loginUser, getUser, getAllUser, updateProfile } = require('../controllers/userController');
const { protect } = require('../middlewares/auth');
const multer = require('multer');
const router = express.Router();
const path = require('path');

const storage = multer.diskStorage({
  destination: function (req, file , cb) {
    cb(null, './server/uploads/')
  },
  filename: function (req, file, cb) {
    cb(null, `${file.fieldname}-${Date.now()}.png`)
  }
})

const upload = multer({storage})

router.post('/register', upload.single('file'),  registerUser);
router.post('/login', loginUser);
router.get('/profile', protect, getUser);
router.patch('/profile', protect, upload.single('file'), updateProfile);
router.get('/all', protect, getAllUser);

module.exports = router;