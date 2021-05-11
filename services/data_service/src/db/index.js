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

async function init() {
    const host = HOST;
    const user = USER;
    const password = PASSWORD;
    const database = DB;

    await waitPort({ host, port : 3306});

    sequelize = new Sequelize(database, user, password, {
        host: host,
        dialect: 'mysql',
        pool: { max: 5, min: 0, idle: 10000 }
    });

    module.exports.sequelize = sequelize;
    MImage = require('./images')(sequelize);
    MComment = require('./comments')(sequelize);
    MUser = require('./users')(sequelize);

    MImage.hasMany(MUser, {foreignKey: 'userid'});
    MUser.belongsTo(MImage);

    MUser.hasMany(MComment, {foreignKey: 'userid'});
    MComment.belongsTo(MUser);

    module.exports.Image = MImage;
    module.exports.Comment = MComment;
    module.exports.User = MUser;

    return new Promise((res, _) => res());
}

async function teardown() {
    return sequelize.close();
}

module.exports = {
    init,
    teardown
};