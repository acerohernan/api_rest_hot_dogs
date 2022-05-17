const { findUser, createUser } = require("../services/user.service");
const { encrypt, compareHash } = require("../utils/encrypt");
const { signJwt } = require("../utils/jwt");
const logger = require("../utils/logger");

exports.singUpHandler = async(req, res) => {
    try{

        const {email, password, re_password} = req.body;

        const userExists = await findUser({email});

        if(userExists){
            return res.status(400).json({
            message: "The email is taken.",
            success: false
            })
        };

        if(password !== re_password){
            return res.status(400).json({
            message: "The password's does not match.",
            success: false
            })
        };

        const hash = await encrypt(password);
        req.body.password = hash;

        const user = await createUser(req.body);
    
        res.status(200).json({
        message: "User created successfully",
        success: true,
        data: user
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
        message: "An error was ocurred.",
        success: false
    });
    }
    

};

exports.createSessionHandler = async (req, res) => {

    try{

        const {email, password} = req.body;

        const user = await findUser({email});

        if(!user){
            return res.status(400).json({
            message: "The user not exist",
            success: false
            })
        };

        const validPassword = await compareHash(password, user.password);

        if(!validPassword){
            return res.status(500).json({
            message: "Invalid email or password.",
            success: false
            });
        };

        const accessToken = signJwt(JSON.stringify(user));

        res.status(200).json({
        message: "User created successfully",
        success: true,
        data: {accessToken}
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
        message: "An error was ocurred.",
        success: false
    });
    }

};