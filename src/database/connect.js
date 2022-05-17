const config = require("config");
const Sequelize = require("sequelize");

const db = {
    name: config.get("dbName"),
    user: config.get("dbUser"),
    pass: config.get("dbPass"),
    hostName: config.get("dbHostName"),
    dialect: config.get("dbDialect"),
};

const sequelize = new Sequelize(db.name, db.user, db.pass, {
    host: db.hostName,
    dialect: db.dialect,
    dialectOptions: {
	options: { requestTimeout: 30000 }
	},
    pool: {
		idleTimeoutMillis: 300000,
      	max: 5,
		min: 0,
		acquire: 30000,
    	idle: 10000
	},
}); 

module.exports = sequelize;