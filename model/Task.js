const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  task: {
    type: String,
  },

  isFinished: {
    type: Boolean,
    default: false,
  },

  createAt: {
    type: Date,
    default: Date.now,
  },
});

const Task = mongoose.model("Task", taskSchema);

module.exports = Task;
