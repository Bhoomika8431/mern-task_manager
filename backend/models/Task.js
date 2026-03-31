const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },

  completed: {
    type: Boolean,
    default: false
  },

  status: {
    type: String,
    enum: ["Pending", "In Progress", "Completed"],
    default: "Pending"
  },

  dueDate: {
    type: Date
  }

});

module.exports = mongoose.model("Task", taskSchema);