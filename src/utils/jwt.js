const jwt = require("jsonwebtoken");
const config = require("config");
const log = require("./logger");
const res = require("express/lib/response");

const privateKey = Buffer.from(config.get("tokenPrivateKey"), "base64").toString("ascii");
const publicKey = Buffer.from(config.get("tokenPublicKey"), "base64").toString("ascii");

exports.signJwt = (object, options = {}) => {
    return jwt.sign(object, privateKey, {
        ...(options && options),
        algorithm: "RS256"
    });
};

exports.verifyJwt = (token) => {
    try{
        const decoded = jwt.verify(token, publicKey);
        
        return {
            valid: true,
            expired: false,
            decoded
        };
    }catch(e){
        log.error(e.message || e);
        return {
            valid: false,
            expired: e.message === "jwt expired",
            decoded: null
        }
    };
};

