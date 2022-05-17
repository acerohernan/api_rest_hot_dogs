const User = require('../models/user.model');

exports.findUser = async(query) => {
    return User.findOne({where: query});
};

exports.createUser = async(user) => {
    return User.create(user);
};