const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('images_vc', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: DataTypes.INTEGER,
        address: DataTypes.TEXT,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        votes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER
    },
    {
        freezeTableName: true
    });
};