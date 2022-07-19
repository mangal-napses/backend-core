const Result = require('folktale/result');
const db = require('models/index');
const { logError } = require('lib/functional/logger');

module.exports.execute = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed to execute the query ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});
module.exports.create = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on create  ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.find = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on find ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.findOne = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed findOne", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.bulkCreate = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on bulk create  ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});
module.exports.update = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on update ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.delete = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on delete", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.deleteOne = async (query) => new Promise((resolve) => {
    query
        .get()
        .then((data) => {
            resolve(Result.Ok(data));
        })
        .catch((error) => {
            logError("Failed on delete one ", { query: query.constructor.name, error: error });
            resolve(Result.Error(error));
        });
});

module.exports.executeMultiple = async (queries) => new Promise(async (resolve) => {
    try {
        const result = await db.sequelize.transaction(async (t) => {
            const allResult = queries.map((query) => query.get({ transaction: t }).then((data) => data));
            return Promise.all(allResult);
        });
        resolve(Result.Ok(result));
    } catch (error) {
        logError("Failed on execute multiple ", { query: queries.map((query) => query.constructor.name).join(","), error: error });
        resolve(Result.Error(error));
    }
});
module.exports.executeMultipleWithoutTx = async (queries) => new Promise(async (resolve) => {
    try {
        const allResult = queries.map((query) => query.get().then((data) => data));
        const resolveAllResult = await Promise.all(allResult);
        resolve(Result.Ok(resolveAllResult));
    } catch (error) {
        logError("Failed on executeMultipleWithoutTx ", { query: queries.map((query) => query.constructor.name).join(","), error: error });
        resolve(Result.Error(error));
    }
});