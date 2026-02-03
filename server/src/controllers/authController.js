const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/user.js');
require('dotenv').config({ path: './.env.dev' });


const generateToken = (id, expired) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: expired ? expired : process.env.JWT_EXPIRED }
    );
};

// Register User
const registerUser = async (req, res) => {
    const { full_name, email, password, confirm_password } = req.body;

    const formatTitleCase = (str) => {
        return str
            .toLowerCase()
            .split(' ')
            .map(word => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const formattedName = formatTitleCase(full_name);

    try {

        if (!full_name || !email || !password) {
            return res.status(400).json({ message: "All fields must be filled" });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ message: "Passwords do not match" })
        }

        const emailExist = await User.findOne({ where: { email } });

        if (emailExist) {
            return res.status(400).json({ message: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            full_name: formattedName,
            email,
            password_hash: hashedPassword,
            role: "free",
        })

        const token = generateToken(newUser.id)

        res.header('Authorization', token).status(200).json({
            message: "User Registered Successfully",
            user: {
                full_name: newUser.full_name,
                email: newUser.email,
                role: newUser.role
            },
            token: token
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password, jwt_expired } = req.body

    try {
        const user = await User.findOne({ where: { email } })


        if (!user) {
            return res.status(400).json({ message: "Email or Password is wrong" })
        }

        const validPass = await bcrypt.compare(password, user.password_hash)
        if (!validPass) {
            return res.status(400).json({ message: "Email or Password is wrong" })
        }

        const token = generateToken(user.id, jwt_expired)

        res.header('Authorization', token).json({
            message: "Logged in succesfully",
            user: {
                full_name: user.full_name,
                email: user.email,
                role: user.role
            },
            token: token,
        })
    } catch (err) {
        res.status(500).json({ message: err.message })
    }
}

module.exports = {
    registerUser,
    loginUser
};