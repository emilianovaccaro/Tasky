const express = require('express');
const router = express.Router();
const { 
  getTasks,
  postTask,
  putTask,
  deleteTask
} = require('../controllers/taskController');
const { protect } = require('../middlewares/auth');


router.get('/', protect, getTasks);
router.post('/', protect, postTask);
router.put('/:id', protect, putTask);
router.delete('/:id', protect, deleteTask);


module.exports = router;