const Task = require("../model/Task");
const asyncHandler = require("../middleware/asyncHandler");
const { createCustomError } = require("../utils/createError");

// GET: Get controller
// Desc: Get all task from the db
const getTasksController = asyncHandler(async (req, res, next) => {
  const tasks = await Task.find({});

  if (!tasks) {
    return next(createCustomError("Failed to fetch the data", 404, false));
  }

  res.status(200).json({
    statusCode: 200,
    message: "Successfully fetch the data.",
    ok: true,
    results: tasks,
  });
});

// POST: Create Controller
// Desc: Create new task item
const createTaskController = asyncHandler(async (req, res, next) => {
  const { task } = req.body;

  const newTask = await Task.create({ task });

  if (!newTask) {
    return next(createCustomError("Failed to create a task", 404, false));
  }

  res.status(202).json({
    statusCode: 202,
    message: "Successfully created new task.",
    ok: true,
    task: newTask,
  });
});

// DELETE: delete task controller
// Desc: Delete a in from db
const deleteTaskController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;

  const deletedTask = await Task.findByIdAndDelete(id);

  if (!deleteTaskController) {
    return next(createCustomError("ID does not exist!", 404, false));
  }

  res.status(202).json({
    statusCode: 202,
    message: "Successfully delete a task",
    ok: true,
    deletedTask,
  });
});

// PATCH: update task controller
// Desc: Update the in from db
const updateTaskController = asyncHandler(async (req, res, next) => {
  const { id } = req.params;
  const { task } = req.body;

  const updatedTask = await Task.findByIdAndUpdate(id, { task }, { new: true });

  if (!updatedTask) {
    return next(createCustomError("ID does not exist", 404, false));
  }

  res.status(202).json({
    statusCode: 202,
    message: "Successfully updated the task",
    ok: true,
    updatedTask,
  });
});

module.exports = {
  getTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
};
