const { findSession, createSession, deleteSession } = require("../services/session.service");
const { findUser, createUser } = require("../services/user.service");
const { encrypt, compareHash } = require("../utils/encrypt");
const { signJwt } = require("../utils/jwt");
const logger = require("../utils/logger");
const config = require("config");

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

        let user = await findUser({email});

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

        const isActive = await findSession({id_user: user.id_user});

        if(isActive){
            return res.status(500).json({
            message: "A session in other device is open.",
            success: false,
            data: user.id_user
            });
        };

        const session = await createSession({
            id_user: user.id_user,
            userAgent:  req.get("user-agent") || ""
        });

        const accessToken = signJwt({
            ...user,
            session: session.id_session
        }, {expiresIn: config.get("accessTokenExpiration")});

        const refreshToken = signJwt({
            ...user,
            session: session.id_session
        }, {expiresIn: config.get("refreshTokenExpiration")});

        res.status(200).json({
        message: "User signin successfully.",
        success: true,
        data: {accessToken,refreshToken}
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
        message: "An error was ocurred.",
        success: false
    });
    }

};

exports.closeSessionHandler = async (req, res) => {
    try{
        const {userId} = req.body;

    const user = await findUser({id_user: userId});

    if(!user){
        return res.status(400).json({
            message: "The user not exist",
            success: false
        })
    };

    const session = await findSession({id_user: userId});

    if(!session){
        return res.status(400).json({
            message: "The session not exist",
            success: false
        })
    };

    await deleteSession({id_session: session.id_session});

    res.status(200).json({
        message: "The session was closed in all devices",
        success: true
    })
    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};