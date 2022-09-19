const express = require('express');
const router = express.Router();
const { 
  getTasks,
  postTask,
  editTask,
  deleteTask,
  addComment
} = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');


router.get('/', protect, getTasks);
router.post('/', protect, postTask);
router.patch('/:id', protect, editTask);
router.post('/comment/:id', protect, addComment);
router.delete('/:id', protect, deleteTask);



module.exports = router;