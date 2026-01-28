const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const { getTasks, getTask, createTask, updateTask, deleteTask } = require('../controllers/taskController.js')

// Apply authentication middleware to all task routes
router.use(auth);

// GET All Task 
router.get("/", getTasks)

// GET A SINGLE TASK 
router.get("/:id", getTask)

// POST A TASK
router.post("/", createTask)

// UPDATE A TASK
router.put("/:id", updateTask)

// DELETE A TASK
router.delete("/:id", deleteTask)

module.exports = router;