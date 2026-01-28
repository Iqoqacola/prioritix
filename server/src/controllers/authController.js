const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user.js');

const generateToken = (_id) => {
    return jwt.sign(
        { _id },
        process.env.JWT_SECRET,
        { expiresIn: '3d' }
    );
};

// Register User
const registerUser = async (req, res) => {
    const { full_name, email, password } = req.body;

    try {
        const emailExist = await User.findOne({ where: { email } });

        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            full_name,
            email,
            password_hash: hashedPassword,
            role: "free",
        })

        res.status(200).json({
            message: "User Registered Successfully", user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.full_name
            }
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password } = req.body

    try {
        const user = await User.findOne({ where: { email } })

        if (!user) {
            return res.status(400).json({ message: "Email or Password is wrong" })
        }

        const validPass = await bcrypt.compare(password, user.password_hash)
        if (!validPass) {
            return res.status(400).json({ message: "Email or Password is wrong" })
        }

        const token = generateToken(user._id)

        res.header('Authorization', token).json({
            message: "Logged in succesfully",
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    registerUser,
    loginUser
};