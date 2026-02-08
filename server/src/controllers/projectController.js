const Project = require('../models/projectModels.js')

// Get all Project
const getProjects = async (req, res) => {
    try {
        const projects = await Project.findAll({
            where: { user_id: req.user.id }
        })

        res.status(200).json(projects)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Creaate Project
const createProject = async (req, res) => {
    const { title, color } = req.body

    try {
        const newProject = await Project.create({
            title,
            color,
            user_id: req.user.id
        })

        res.status(201).json(newProject)
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Update Project
const updateProject = async (req, res) => {

    try {
        const project = await Project.findOne({
            where:
            {
                id: req.params.id,
                user_id: req.user.id
            }
        })

        if (!project) {
            return res.status(404).json({ error: "Project not found" })
        }

        await project.update(req.body);
        res.json({ message: "Project updated", project })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Delete Project
const deleteProject = async (req, res) => {
    try {
        const projectDeleted = await Project.destroy({
            where: {
                id: req.params.id,
                user_id: req.user.id
            }
        })

        if (!projectDeleted) {
            return res.status(404).json({ error: "Project not found" })
        }

        res.json({ message: "Project deleted successfully" })
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

module.exports = {
    getProjects, createProject, updateProject, deleteProject
}