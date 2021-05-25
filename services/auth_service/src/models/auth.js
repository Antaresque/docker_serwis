const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        username: DataTypes.TEXT,
        password: DataTypes.TEXT,
        role: DataTypes.TEXT,
    })
};