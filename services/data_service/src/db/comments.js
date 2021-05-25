const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('comments', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: DataTypes.INTEGER,
        imgid: DataTypes.INTEGER,
        comment: DataTypes.TEXT,
    });
};
