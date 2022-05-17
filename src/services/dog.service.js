const Dog = require("../models/dog.model");

exports.createDog = (payload) => {
    return Dog.create(payload);
};

exports.findDog = (query) => {
    return Dog.findOne({where: query});
};

exports.findAllDogs = (query) => {
    return Dog.findAll({where: query});
};

exports.updateDog = (update, query = {}) => {
    return Dog.update(update, {
        where: query
    });
};

exports.deleteDog = (query) => {
    return Dog.destroy({where: query});
};
