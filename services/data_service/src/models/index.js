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
    MImageView = require('./images_vc')(sequelize);
    MComment = require('./comments')(sequelize);
    MCommentView = require('./comments_vc')(sequelize);
    MUser = require('./users')(sequelize);
    MUserView = require('./users_vc')(sequelize);
    MVoteComment = require('./votes_comments')(sequelize);
    MVoteImage = require('./votes')(sequelize);

    MUser.hasMany(MImage, {foreignKey: 'userid'});
    MImage.belongsTo(MUser);

    MUser.hasMany(MImageView, {foreignKey: 'userid'});
    MImageView.belongsTo(MUser);

    MUser.hasMany(MComment, {foreignKey: 'userid'});
    MComment.belongsTo(MUser);

    MUser.hasMany(MCommentView, {foreignKey: 'userid'});
    MCommentView.belongsTo(MUser);

    module.exports.Image = MImage;
    module.exports.ImageView = MImageView;
    module.exports.Comment = MComment;
    module.exports.CommentView = MCommentView;
    module.exports.User = MUser;
    module.exports.UserView = MUserView;

    module.exports.VoteImage = MVoteImage;
    module.exports.VoteComment = MVoteComment;

    return sequelize.sync();
}

async function teardown() {
    return sequelize.close();
}

module.exports = {
    init,
    teardown
};