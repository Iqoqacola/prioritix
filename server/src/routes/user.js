const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController.js');

const router = express.Router();

//Login Route
router.post('/signin', loginUser)

// Register Route 
router.post('/signup', registerUser)

module.exports = router;