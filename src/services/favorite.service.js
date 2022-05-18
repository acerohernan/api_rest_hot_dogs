const Fav = require("../models/favorite.model");

exports.createDogFavorite = (fav) => {
    return Fav.create(fav);
};

exports.updateDogFavorite = (query) => {
    return Fav.update({where: query});
};

exports.deleteDogFavorite = (query) => {
    return Fav.destroy({where: query});
};

exports.findSingleDogFavorite = (query) => {
    return Fav.findOne({where: query});
};

exports.findAllDogFavorite = (query) => {
    return Fav.findAll({where: query});
};