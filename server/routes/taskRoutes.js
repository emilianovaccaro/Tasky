const express = require('express');
const router = express.Router();
const { 
  getTasks,
  postTask,
  putTask,
  deleteTask,
  addComment
} = require('../controllers/taskController');
const { protect } = require('../middlewares');


router.get('/', protect, getTasks);
router.post('/', protect, postTask);
router.put('/:id', protect, putTask);
router.post('/comment/:id', protect, addComment);
router.delete('/:id', protect, deleteTask);



module.exports = router;