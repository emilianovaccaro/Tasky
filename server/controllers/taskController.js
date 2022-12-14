const Task = require('../models/taskModel')
const User = require('../models/userModel')


// get all tasks
// get api/task
// private access - userId, teamId
const getTasks = async (req,res) => {
  try {
    const tasks = await Task.find({ teamId: req.user.teamId })
    res.status(200).json(tasks)
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// post task
// post api/task
// access private
const postTask = async (req, res) => {
  const { title, priority, description, status, assignedTo, deleteStatus } = req.body

  //validate body
  if (!title || !priority || !status) {
   return res.status(400).json({msg: 'Formulario incompleto'})
  }

  try {
    const task = await Task.create({
      title,
      priority,
      status,
      description,
      assignedTo,
      deleteStatus,
      teamId: req.user.teamId,
      userId: req.user.id,
    })

    res.status(200).json({ task })

  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}


// edit tasks
// api/task/:id
// private
const editTask = async (req, res) => {
  try {
    const { title, description, status, priority, assignedTo, deleteStatus, comments } = req.body
    const { id } = req.params

    const task = await Task.findById(id)

    if (!task) { return res.status(404).json({ msg: 'Tarea no encontrada' }) }
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: "No tienes los permisos"})


    if (comments?.length > 0) {
      task.comments = [...task.comments, { comment: comments, author: req.user.username }]
    }

    if (deleteStatus === false) {
      task.deleteStatus = false
    } else if (deleteStatus === true) {
      task.deleteStatus = true
    }


    task.title = title || task.title
    task.description = description || task.description
    task.status = status || task.status
    task.priority = priority || task.priority
    task.assignedTo = assignedTo || task.assignedTo
    
    await task.save()

    res.status(200).json(task)
      
  } catch (error) {
    return res.status(500).json({ message: error.message })
  }
}

// delete task
// api/task/:id
// private
const deleteTask = async (req, res) => {
  try{

    console.log(req.user._id)
    console.log(req.user.teamId)
    console.log(req.user.isAdmin)
    
    const task = await Task.findById(req.params.id)
    console.log(task.userId)
    console.log(task.teamId.toString())

    
    if (!task) { return res.status(404).json({ msg: 'Tarea no encontrada' }) }
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: 'No tienes los permisos'})

    if ((task.userId.toString() !== req.user.id) &&  !req.user.isAdmin) {
      return res.status(401).json({ msg: 'Usuario no autorizado' })
    }

    if(!task.deleteStatus) {
      return res.status(404).json({ msg: 'Error, la tarea no esta en papelera' })
    }
    
    await task.remove()
    res.status(200).json({ id: req.params.id })

  } catch ( error ) {
    return res.status(500).json({ message: error.message })
  }
}

const addComment = async(req, res) => {
  try{
    const { body } = req.body

    const task = await Task.findById(req.params.id)
    
    if (!task) return res.status(404).json({ msg: 'Tarea no encontrada' }) 

    if ((task.userId.toString() !== req.user.id) || ((task.teamId.toString() !== req.user.teamId) && !req.user.isAdmin)) {
      return res.status(401).json({ msg: 'Usuario no autorizado' })
    }

    if (!body) return res.status(404).json({ msg: 'Usuario no autorizado' }) 
    if (task.teamId !== req.user.teamId) return res.status(403).json({msg: 'No tienes los permisos'})
    
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
