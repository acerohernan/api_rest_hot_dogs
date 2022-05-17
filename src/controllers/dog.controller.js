const { createDog, findDog, findAllDogs, updateDog, deleteDog, findDogByPk } = require("../services/dog.service");
const { findUser } = require("../services/user.service");
const logger = require("../utils/logger");

exports.createDogHandler = async(req, res) => {
    try{
        const {id_user} = req.user;

        if(!id_user){
            return res.status(401).json({
                message: "Unathorized",
                success: false,
            })
        };

        const newDog = await createDog({...req.body, id_user});

        res.status(200).json({
            message: "Your dog was created successfully.",
            success: true,
            data: newDog,
        })


    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

exports.findDogHandler = async(req, res) => {
    try{

        const {dogId} = req.params;

        const dog = await findDog({id_dog: dogId});

        if(!dog){
            return res.status(400).json({
                message: "Coul not find the dog, please enter other dog id.",
                success: false
            })
        };

        res.status(200).json({
            message: "Dog find successfully",
            success: true,
            data: dog
        })

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

exports.findDogsFromUserHandler = async(req, res) => {
    try{
        
        const {id_user} = req.user;

        if(!id_user){
            res.status(401).json({
            message: "Unathorized",
            success: false,
            })
        };

        const dogs = await findAllDogs({id_user});

        res.status(200).json({
            message: "All dogs obtained.",
            success: true,
            data: dogs
        })

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    }
};

exports.updateDogHandler = async(req, res) => {
    try{
        const {id_user} = req.user;

        if(!id_user){
            return res.status(401).json({
            message: "Unathorized",
            success: false,
            })
        };

        const {dogId} = req.params;

        const dog = await findDog({id_dog: dogId});

        if(!dog){   
            return res.status(500).json({
            message: "The dog not exist.",
            success: false,
            })
        };

        if(Number(dog.id_user) !== id_user){
            return res.status(500).json({
            message: "This dog is not yours.",
            success: false,
            })
        };

        const updatedDog = await updateDog(req.body, {id_dog: dogId});

        res.status(200).json({
            message: "Dog updated successfully",
            success: true,
            data: updatedDog
        });

    }catch (e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    };
};

exports.deleteDogHandler = async(req, res) => {
    try{
        const {id_user} = req.user;

        if(!id_user){
            return res.status(401).json({
            message: "Unathorized",
            success: false,
            })
        };

        const {dogId} = req.params;

        const dog = await findDog({id_dog: dogId});

        if(!dog){   
            return res.status(500).json({
            message: "The dog not exist.",
            success: false,
            })
        };
        
        if(Number(dog.id_user) !== id_user){
            return res.status(500).json({
            message: "This dog is not yours.",
            success: false,
            })
        };

        await deleteDog({id_dog: dogId});

        res.status(200).json({
            message: "Dog deleted successfully",
            success: true
        });

    }catch (e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    };
};