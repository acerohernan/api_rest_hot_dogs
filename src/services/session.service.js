const Session = require("../models/session.model");

exports.findSession = (query) => {
    return Session.findOne({
        where: query,
    })
};

exports.createSession = (session) => {
    return Session.create(session);
};

exports.deleteSession = (query) => {
    return Session.destroy({where: query});
};