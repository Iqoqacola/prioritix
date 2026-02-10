const Task = require('../models/taskModels.js')

// Get all tasks
const getTasks = async (req, res) => {
    try {
        const tasks = await Task.findAll({
            where: { user_id: req.user.id }
        })

        res.status(200).json(tasks)
    } catch (err) {
        res.status(500).json({ error: err.message })
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
            return res.status(404).json({ error: "Task not found" })
        }

        res.json(task)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Creaate task
const createTask = async (req, res) => {
    const { title, project_id, description, status, priority, due_date, tags, starred } = req.body

    try {
        const newTask = await Task.create({
            title,
            project_id,
            description,
            status,
            priority,
            due_date,
            tags,
            starred,
            user_id: req.user.id
        })

        res.status(201).json(newTask)
    } catch (err) {
        res.status(500).json({ error: err.message })
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
            return res.status(404).json({ error: "Task not found" })
        }

        await task.update(req.body);
        res.json({ message: "Task updated", task })
    } catch (err) {
        res.status(500).json({ error: err.message })
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
            return res.status(404).json({ error: "Task not found" })
        }

        res.json({ message: "Task deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//Delete task by project
const deleteTaskByProject = async (req, res) => {
    try {
        const taskDeleted = await Task.destroy({
            where: {
                user_id: req.user.id,
                project_id: req.project_id,
            }
        })

        if (!taskDeleted) {
            return res.status(404).json({ error: "Task not found" })
        }

        res.json({ message: "Task deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getTasks, getTask, createTask, updateTask, deleteTask
}