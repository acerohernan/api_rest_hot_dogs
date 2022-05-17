const { get } = require("lodash");
const { findUser } = require("../services/user.service");
const { verifyJwt } = require("../utils/jwt");
const logger = require("../utils/logger");

exports.authMiddleware = async(req, res, next) => {
    try{
        const accessToken = get(req, "headers.authorization", "").replace("Bearer ", "");

        if(!accessToken){
            return res.status(401).json({
            message: "Unathorized",
            success: false
            })
        };

        const {decoded} = verifyJwt(accessToken);

        if(!decoded){
            return res.status(401).json({
            message: "The token is expired.",
            success: false
            })
        };

        const user = await findUser({id_user: decoded.dataValues.id_user});
        
        if(!user){
            return res.status(401).json({
            message: "Unathorized",
            success: false
            })
        };

        req.user = user;

        next();
    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false
        })
    }
};