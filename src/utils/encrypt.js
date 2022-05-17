const bcrypt = require("bcrypt");
const config = require("config");

exports.encrypt = async (data) => {
    const salt = await bcrypt.genSalt(config.get("saltWorkFactor"));

    const hash = await bcrypt.hashSync(data, salt);

    return hash;
};

exports.compareHash = (candidate, hash) => {
    return bcrypt.compare(candidate, hash).catch((e)=> false);
};