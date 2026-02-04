const express = require('express');
const { loginUser, registerUser } = require('../controllers/authController.js');
const auth = require('../middleware/auth.js');

const router = express.Router();

//Verify Route 
router.get('/me', auth, (req, res) => {
    res.status(200).json({
        message: "Token is valid"
    });
});
//Login Route
router.post('/signin', loginUser)

// Register Route 
router.post('/signup', registerUser)

module.exports = router;