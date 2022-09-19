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
   return res.status(400).json({msg: 'Body/Form incomplete'});
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

    res.status(200).json({ task }); 

  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}


// edit tasks
// api/task/:id
// private
const editTask = async (req, res) => {
  try {
    const { title, description, timeLimit, status, priority, assignedTo, deleteStatus, comments } = req.body
    const { id } = req.params
    
    const task = await Task.findById(id);

    if (!task) { return res.status(404).json({ msg: 'Task not found' }) }
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: "You don't have the permissions"})


    task.comments = [...task.comments, { comment: comments, author: req.user.username }]

    task.title = title || task.title
    task.description = description || task.description
    task.timeLimit = timeLimit || task.timeLimit
    task.status = status || task.status
    task.priority = priority || task.priority
    task.assignedTo = assignedTo || task.assignedTo
    task.deleteStatus = deleteStatus || task.deleteStatus
    
    await task.save();

    res.status(200).json(task);
      
  } catch (error) {
    return res.status(500).json({ message: error.message });
  }
}

// delete task
// api/task/:id
// private
const deleteTask = async (req, res) => {
  try{

    const task = await Task.findById(req.params.id);

    if (!task) { return res.status(404).json({ msg: 'Task not found' }) }
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: "You don't have the permissions"})

    if ((task.userId.toString() !== req.user.id) || ((task.teamId.toString() !== req.user.teamId) && !req.user.isAdmin)) {
      return res.status(401).json({ msg: 'Error-User not authorized' });
    }
    
    await task.remove();
    res.status(200).json({ id: req.params.id });

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }
}

const addComment = async(req, res) => {
  try{
    const { body } = req.body

    const task = await Task.findById(req.params.id)
    
    if (!task) return res.status(404).json({ msg: 'Task not found' }) 

    if ((task.userId.toString() !== req.user.id) || ((task.teamId.toString() !== req.user.teamId) && !req.user.isAdmin)) {
      return res.status(401).json({ msg: 'Error-User not authorized' });
    }

    if (!body) return res.status(404).json({ msg: 'Fill in all the fields' }) 
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: "You don't have the permissions"})
    
    task.comments = [...task.comments, { body,author: req.user.username }]

    await task.save()

    res.status(200).json({ task })

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }
}


module.exports = {
  getTasks,
  postTask,
  editTask,
  deleteTask,
  addComment
}
