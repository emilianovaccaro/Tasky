const mongoose = require('mongoose');

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
    timeLimit: {
      type: Date,
      default: "",
    },
    deleteStatus: {
      type: Boolean,
      required: true,
      default: false,
    },
    comments: [
      {
        id: {type: mongoose.Schema.Types.ObjectId},
        author: {type: String},
        body: {type: String},
      }
    ]
  }, 
  {
    timestamps: true
  }
);

module.exports = mongoose.model('Task', taskSchema);