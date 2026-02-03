const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/DB.js");

const User = sequelize.define("User", {
    full_name: {
        type: DataTypes.STRING(100), allowNull: false
    },
    email: {
        type: DataTypes.STRING(50), allowNull: false, unique: true, validate: { isEmail: true }
    },
    password_hash: {
        type: DataTypes.STRING(255), allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('free', 'pro', 'premium'),
        defaultValue: 'free'
    },
    avatar_path: {
        type: DataTypes.STRING(255), allowNull: true, defaultValue: "/uploads/avatars/avatar-default.png"
    }, created_at: {
        type: DataTypes.DATE,
        defaultValue: DataTypes.NOW,
    }
}, { tableName: "user", timestamps: false });

module.exports = User;