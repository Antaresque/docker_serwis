const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('users', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        nickname: DataTypes.TEXT,
        email: DataTypes.TEXT,
        crdate: {
            type: DataTypes.DATE,
            defaultValue: Date.now() 
        }
    },
    {
        timestamps: false
    });
};