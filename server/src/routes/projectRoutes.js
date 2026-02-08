const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth.js');
const { getProjects, createProject, updateProject, deleteProject } = require('../controllers/projectController.js')

// Apply authentication middleware to all task routes
router.use(auth);

// // GET All Project 
router.get("/", getProjects)

// // POST A Project
router.post("/", createProject)

// // UPDATE A Project
router.put("/:id", updateProject)

// // DELETE A Project
router.delete("/:id", deleteProject)

module.exports = router;