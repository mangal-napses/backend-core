const { factory } = require('factory-girl');

const loadFactory = async () => {

    factory.define('user', Object, {
        id: factory.chance("guid"),
        email: factory.chance('email'),
        username: factory.chance('name'),
        password: factory.chance("word")
    });
};

module.exports.factory = factory;
module.exports.loadFactory = loadFactory;
