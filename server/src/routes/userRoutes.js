const express = require('express');
const { loginUser, registerUser, logoutUser, verifyUser } = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

//Verify Route 
router.get('/me', auth, verifyUser);

//Login Route
router.post('/signin', loginUser)

// Register Route 
router.post('/signup', registerUser)

// Logout Route
router.post('/signout', logoutUser)

module.exports = router;