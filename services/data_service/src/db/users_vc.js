const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users_vc', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: DataTypes.TEXT,
        email: DataTypes.TEXT,
        images: DataTypes.INTEGER,
        comments: DataTypes.INTEGER
    },
    {
        freezeTableName: true
    });
};