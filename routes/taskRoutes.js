const express = require("express");
const router = express.Router();
const {
  getTasksController,
  createTaskController,
  deleteTaskController,
  updateTaskController,
} = require("../controller/taskController");

router.get("/", getTasksController);
router.post("/", createTaskController);
router.delete("/:id", deleteTaskController);
router.patch("/:id", updateTaskController);

module.exports = router;
