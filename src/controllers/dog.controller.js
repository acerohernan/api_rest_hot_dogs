const dayjs = require("dayjs");
const { createDog, findDog, findAllDogs, updateDog, deleteDog, findDogByPk } = require("../services/dog.service");
const { createDogFavorite, findSingleDogFavorite, deleteDogFavorite, findAllDogFavorite } = require("../services/favorite.service");
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

exports.addDogFavorite = async(req, res) => {
    try{
        const {id_dog, id_dog_fav} = req.body;
        const {id_user} = req.user;

        if(id_dog === id_dog_fav){
            return res.status(400).json({
                message: "The dog could not be the same.",
                success: false
            })
        };

        const senderDog = await findDog({id_dog});
        const favDog = await findDog({id_dog: id_dog_fav});
        
        if(!favDog || !senderDog){
            return res.status(400).json({
                message: "The dog not exists.",
                success: false
            });
        };

        if(Number(senderDog.dataValues.id_user) !== id_user){
            return res.status(401).json({
                message: "The sender dog is not yours.",
                success: false
            })
        };

        const isCreated = await findSingleDogFavorite({id_dog, id_dog_fav});

        if(isCreated){
            return res.status(401).json({
                message: "The dog is already your favorite",
                success: false
            })
        };

        const favCreated = await createDogFavorite({id_dog, id_dog_fav, created_date: dayjs().format("YYYY-MM-DDTHH:mm:ss")});

        res.status(200).json({
            message: "Dog added to favorites successfully",
            success: true,
            data: favCreated
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    };
};

exports.deleteDogFavorite = async(req, res) => {
    try{
        const {favId} = req.params;
        const {id_dog} = req.body;
        const {id_user} = req.user;

        if(id_dog === favId){
            return res.status(400).json({
                message: "The dog could not be the same.",
                success: false
            })
        };

        const senderDog = await findDog({id_dog});
        const favDog = await findDog({id_dog: favId});

        if(!favDog || !senderDog){
            return res.status(400).json({
                message: "The dog not exists.",
                success: false
            });
        };

        if(Number(senderDog.dataValues.id_user) !== id_user){
            return res.status(401).json({
                message: "The sender dog is not yours.",
                success: false
            })
        };

        const isCreated = await findSingleDogFavorite({id_dog, id_dog_fav: favId});

        if(!isCreated){
            return res.status(401).json({
                message: "The dog is not your favorite",
                success: false
            })
        };

        await deleteDogFavorite({id_dog, id_dog_fav: favId});

        res.status(200).json({
            message: "Dog favorite was deleted successfully.",
            success: true
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    };
};

exports.getAllDogFavorites = async(req, res) => {
    try{
        console.log("Entrando");
        const {id_dog} = req.body;
        const {id_user} = req.user;

        const dog = await findDog({id_dog});

        if(!dog){
            return res.status(400).json({
                message: "The dog not exists.",
                success: false
            });
        };

        if(Number(dog.dataValues.id_user) !== id_user){
            return res.status(401).json({
                message: "The dog is not yours.",
                success: false
            })
        };

        const favorites = await findAllDogFavorite({id_dog});

        res.status(200).json({
            message: "All dog favorites obtained",
            success: true,
            data: favorites
        });

    }catch(e){
        logger.error(e.message || e);
        res.status(500).json({
            message: "An error was ocurred",
            success: false,
        })
    };
};