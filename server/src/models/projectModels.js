const DataTypes = require("sequelize").DataTypes;
const sequelize = require("../config/DB.js");
const User = require("./userModels.js");

const Project = sequelize.define("Project", {
    title: {
        type: DataTypes.STRING(100), allowNull: false
    },
    color: {
        type: DataTypes.STRING(8), defaultValue: "#000000"
    }
}, { tableName: "project", timestamps: false })

User.hasMany(Project, { foreignKey: "user_id", onDelete: "CASCADE" })
Project.belongsTo(User, { foreignKey: "user_id" })

module.exports = Project