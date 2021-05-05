const { Sequelize } = require('sequelize');
const waitPort = require('wait-port');

const {
    MYSQL_HOST: HOST,
    MYSQL_HOST_FILE: HOST_FILE,
    MYSQL_USER: USER,
    MYSQL_USER_FILE: USER_FILE,
    MYSQL_PASSWORD: PASSWORD,
    MYSQL_PASSWORD_FILE: PASSWORD_FILE,
    MYSQL_DB: DB,
    MYSQL_DB_FILE: DB_FILE,
} = process.env;

let sequelize;
let models = {};

async function init() {
    const host = HOST;
    const user = USER;
    const password = PASSWORD;
    const database = DB;

    sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: 'mysql',
        pool: { max: 5, min: 0, idle: 10000 }
    });

    module.exports.Sequelize = Sequelize;
    module.exports.sequelize = sequelize;
    module.exports.Image = require('./images')(sequelize);

    await waitPort({ host, port : 3306});

    return sequelize.sync().then(() => {
        console.log("Drop and re-sync db.");
    });
}

async function teardown() {
    return sequelize.close();
}

module.exports = {
    init,
    teardown
};