const { DataTypes } = require("sequelize");
const sequelize = require("../config/DB");
const User = require("./user");

const Task = sequelize.define("Task", {
    title: {
        type: DataTypes.STRING(100), allowNull: false
    },
    description: {
        type: DataTypes.TEXT, allowNull: true
    },
    status: {
        type: DataTypes.ENUM('pending', 'in_progress', 'completed'), defaultValue: 'pending'
    },
    priority: {
        type: DataTypes.ENUM('low', 'medium', 'high'), defaultValue: 'medium'
    },
    due_date: {
        type: DataTypes.DATEONLY, allowNull: true
    },
    tags: {
        type: DataTypes.STRING(255), allowNull: true
    }
}, { tableName: "task", timestamps: false })

User.hasMany(Task, { foreignKey: "user_id", onDelete: "CASCADE" });
Task.belongsTo(User, { foreignKey: "user_id" });

module.exports = Task;