const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs')
const User = require('../models/userModels');
require('dotenv').config({ path: './.env.dev' });


const generateToken = (id, expired) => {
    return jwt.sign(
        { id },
        process.env.JWT_SECRET,
        { expiresIn: expired || process.env.JWT_EXPIRED }
    );
};

// Register User
const registerUser = async (req, res) => {
    const { full_name, email, password, confirm_password } = req.body;

    const formatTitleCase = (str) => {
        return str
            .trim()
            .toLowerCase()
            .split(/\s+/)
            .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
            .join(' ');
    };

    const normalizedEmail = String(email || '').trim().toLowerCase();
    const formattedName = formatTitleCase(String(full_name || ''));

    try {

        if (!formattedName || !normalizedEmail || !password) {
            return res.status(400).json({ error: "All fields must be filled" });
        }

        if (password !== confirm_password) {
            return res.status(400).json({ error: "Passwords do not match" });
        }

        const emailExist = await User.findOne({ where: { email: normalizedEmail } });

        if (emailExist) {
            return res.status(400).json({ error: "Email already exists" })
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = await User.create({
            full_name: formattedName,
            email: normalizedEmail,
            password_hash: hashedPassword,
        });

        const token = generateToken(newUser.id)

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });

        return res.status(201).json({
            message: "User registered successfully",
            user: {
                id: newUser.id,
                full_name: newUser.full_name,
                email: newUser.email,
                role: newUser.role,
                avatar_path: newUser.avatar_path,
                created_at: newUser.created_at,
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

// Login User
const loginUser = async (req, res) => {
    const { email, password, jwt_expired } = req.body;
    const normalizedEmail = String(email || '').trim().toLowerCase();

    try {
        const user = await User.findOne({ where: { email: normalizedEmail } });


        if (!user) {
            return res.status(400).json({ error: "Email or password is wrong" });
        }

        const validPass = await bcrypt.compare(password, user.password_hash);
        if (!validPass) {
            return res.status(400).json({ error: "Email or password is wrong" });
        }

        const token = generateToken(user.id, jwt_expired);

        res.cookie("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
            maxAge: 7 * 24 * 60 * 60 * 1000,
        });
        return res.status(200).json({
            message: "Logged in successfully",
            user: {
                id: user.id,
                full_name: user.full_name,
                email: user.email,
                role: user.role,
                avatar_path: user.avatar_path,
                created_at: user.created_at
            },
        });
    } catch (err) {
        res.status(500).json({ error: err.message })
    }
}

//Logout User
const logoutUser = async (req, res) => {
    res.clearCookie("token", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "lax"
    })

    return res.status(200).json({
        message: "Logged out succesfully"
    })
}

//Verify User
const verifyUser = async (req, res) => {
    try {
        const user = await User.findByPk(req.user.id, {
            attributes: [
                "id",
                "full_name",
                "email",
                "role",
                "avatar_path",
            ],
        });

        if (!user) {

            return res.status(404).json({
                message: "User not found",
            });
        }

        return res.status(200).json({
            user
        });

    } catch (error) {
        console.error(error);

        return res.status(500).json({
            message: "Internal server error",
        });
    }
};


module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    verifyUser
};