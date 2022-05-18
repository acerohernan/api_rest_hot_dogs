const Sequelize = require("sequelize");
const sequelize = require("../database/connect");

const Fav = sequelize.define('tbl_favorites', {
    id_fav:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_dog:{
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    id_dog_fav: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    created_date: {
        type: Sequelize.DATE,
        allowNull: false
    },
}, {
    timestamps: false,
    freezeTableName: true
}); 

module.exports = Fav;