const { DataTypes } = require('sequelize');

module.exports = (sequelize) => {
    return sequelize.define('images', {
        id: {
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true
        },
        userid: DataTypes.INTEGER,
        address: DataTypes.TEXT,
        upvotes: DataTypes.INTEGER,
        comments: DataTypes.INTEGER,
        title: DataTypes.STRING,
        description: DataTypes.TEXT,
        crdate: DataTypes.DATE,
    },
    {
        timestamps: false
    });
};