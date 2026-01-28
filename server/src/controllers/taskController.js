const Task = require('../models/task.js')

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id }
        })

        res.json(tasks)
    } catch (err) {
        res.status(500).json({ message: err.messages })
    }
}

// Get single task
const getTask = async (req, res) => {
    try {
        const task = await Task.findOne({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })

        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }

        res.json(task)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Creaate task
const createTask = async (req, res) => {
    const { title, description, status, priority, due_date, tags } = req.body

    try {
        const newTask = await Task.create({
            title,
            description,
            status,
            priority,
            due_date,
            tags,
            user_id: req.user.id
        })

        res.status(201).json(newTask)
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Update task
const updateTask = async (req, res) => {

    try {
        const task = await Task.findOne({
            where:
            {
                id: req.params.id,
                user_id: req.user.id
            }
        })

        if (!task) {
            res.status(404).json({ message: "Task not found" })
        }

        await task.update(req.body);
        res.json({ message: "Task updated", task })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Delete task
const deleteTask = async (req, res) => {
    try {
        const taskDeleted = await Task.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })

        if (!taskDeleted) {
            res.status(404).json({ message: "Task not found" })
        }

        res.json({ message: "Task deleted succesfuly" })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    getTasks, getTask, createTask, updateTask, deleteTask
}