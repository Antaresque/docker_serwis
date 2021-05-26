const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('comments_vc', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: DataTypes.INTEGER,
        imgid: DataTypes.INTEGER,
        votes: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
    },
    {
        freezeTableName: true
    });
};