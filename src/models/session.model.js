const Sequelize = require("sequelize");
const sequelize = require("../database/connect");

const User = sequelize.define('tbl_users', {
    id_session:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    userAgent: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    },
}, {
    timestamps: false,
    freezeTableName: true
}); 

module.exports = User;