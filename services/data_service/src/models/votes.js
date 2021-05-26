const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('votes', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        imgid: DataTypes.INTEGER,
        userid: DataTypes.INTEGER
    },
    {
        freezeTableName: true
    });
};