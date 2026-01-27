const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");

const User = sequelize.define("User", {
    username: {
        type: DataTypes.STRING(50), allowNull: false, unique: true
    },
    email: {
        type: DataTypes.STRING(50), allowNull: false, unique: true, validate: { isEmail: true }
    },
    password_hash: {
        type: DataTypes.STRING(255), allowNull: false,
    },
    role: {
        type: DataTypes.ENUM('free', 'pro', 'admin'),
        defaultValue: 'free'
    }
}, { tableName: "user", timestamps: false });

module.exports = User;