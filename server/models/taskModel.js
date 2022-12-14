const mongoose = require('mongoose')

const taskSchema = mongoose.Schema({
    teamId: {
      type: String,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      required: true,
      ref: 'User'
    },
    title: {
      type: String,
      required: [true, 'please add a title']
    },
    status: {
      type: String,
      required: [true, 'please add a status']
    },
    priority: {
      type: String,
      required: [true, 'please add a priority']
    },
    description: {
      type: String,
      default: "",
    },
    assignedTo: {
      type: String,
      default: "",
    },
    deleteStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    comments: [
      {
        id: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
        author: {type: String},
        comment: {type: String},
      }
    ]
  }, 
  {
    timestamps: true
  }
)

module.exports = mongoose.model('Task', taskSchema)