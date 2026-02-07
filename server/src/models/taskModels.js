const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/DB.js");
const Project = require("./projectModels.js");
const User = require("./userModels.js");

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
    },
    starred: {
        type: DataTypes.BOOLEAN, defaultValue: false
    }
}, { tableName: "task", timestamps: false })

User.hasMany(Task, { foreignKey: "user_id", onDelete: "CASCADE" });
Project.hasMany(Task, { foreignKey: "project_id", onDelete: "CASCADE" });

Task.belongsTo(User, { foreignKey: "user_id" });
Task.belongsTo(Project, { foreignKey: "project_id" })

module.exports = Task;