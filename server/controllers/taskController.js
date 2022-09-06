const Task = require('../models/taskModel');
const User = require('../models/userModel');


// get all tasks
// get api/task
// private access - userId, teamId
const getTasks = async (req,res) => {
  try {
    const tasks = await Task.find({ user: req.user.teamId });
    res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// post task
// post api/task
// access private
const postTask = async (req, res) => {
  const { title, priority, description, status, assignedTo, timeLimit, deleteStatus } = req.body;
  //validate body
  if (!title || !priority || !status) {
    res.status(400);
    throw new Error('Body/Form incomplete');
  }

  try {
    const task = await Task.create({
      title,
      priority,
      status,
      description,
      assignedTo,
      timeLimit,
      deleteStatus,
      teamId: req.user.teamId,
      userId: req.user.id,
    });

    res.status(200).json(task);

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// edit tasks
// api/task/:id
// private
const putTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task Not Found');
  }
  
  //check for user 
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if userid and task.user do not match, 400
  if ((task.userId.toString() !== req.user.id) || ((task.teamId !== req.user.teamId) && !req.user.isAdmin)) {
    res.status(401);
    throw new Error('User not authorized to do this');
  }

  try {
    const updateTask = await Task.findByIdAndUpdate(req.params.id, req.body, {
      new: true
    });

    res.status(200).json(updateTask);
    
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// delete task
// api/task/:id
// private
const deleteTask = async (req, res) => {
  const task = await Task.findById(req.params.id);

  if (!task) {
    res.status(400);
    throw new Error('Task Not Found');
  }

  //check for user 
  if (!req.user) {
    res.status(401);
    throw new Error('User not found');
  }

  //if userid and task.user do not match, 400
  if ((task.userId.toString() !== req.user.id) || ((task.teamId.toString() !== req.user.teamId) && !req.user.isAdmin)) {
    res.status(401).json({ msg: 'Error-User not authorized' });
    throw new Error('User not authorized to do this');
  }

  try{
    await task.remove();
    res.status(200).json({ id: req.params.id });

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }

}


module.exports = {
  getTasks,
  postTask,
  putTask,
  deleteTask
}