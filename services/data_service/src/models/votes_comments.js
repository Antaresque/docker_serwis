const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('votes_comments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        commentid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER
    },
    {
        freezeTableName: true
    });
};