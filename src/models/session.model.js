const Sequelize = require("sequelize");
const sequelize = require("../database/connect");

const Session = sequelize.define('tbl_sessions', {
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

module.exports = Session;