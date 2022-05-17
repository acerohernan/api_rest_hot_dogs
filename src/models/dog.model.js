const Sequelize = require("sequelize");
const sequelize = require("../database/connect");

const Dog = sequelize.define('tbl_dogs', {
    id_dog:{
        type: Sequelize.INTEGER,
        autoIncrement: true,
        primaryKey: true,
        allowNull: false,
    },
    id_user: {
        type: Sequelize.STRING,
        allowNull: false
    },
    first_name: {
        type: Sequelize.STRING,
        allowNull: false
    },
    age: {
        type: Sequelize.INTEGER,
        allowNull: false,
    },
    height: {
        type: Sequelize.INTEGER,
        allowNull: false
    },
    birthday_date: {
        type: Sequelize.DATE,
        allowNull: false
    },  
    preferences: {
        type: Sequelize.TEXT,
        allowNull: false
    },
    profile_img: {
        type: Sequelize.STRING,
        allowNull: true,
        default: null
    }
}, {
    timestamps: false,
    freezeTableName: true
}); 

module.exports = Dog;