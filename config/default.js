require("dotenv").config();

module.exports = {
    dbName: process.env.DB_NAME,
    dbUser: process.env.DB_USER,
    dbPass: process.env.DB_PASS,
    dbHostName: process.env.DB_HOST_NAME,
    dbDialect: process.env.DB_DIALECT,
    tokenPublicKey: process.env.TOKEN_PUBLIC_KEY,
    tokenPrivateKey: process.env.TOKEN_PRIVATE_KEY,
    saltWorkFactor: 10,
};