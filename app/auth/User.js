const {DataTypes} = require('sequelize');
const db = require('../../config/db');

const User = db.define('User', {
    email:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    password: {
        type: DataTypes.STRING,
        allowNull: false
    },
    full_name:{
        type: DataTypes.STRING,
        allowNull: false
    },
    isAdmin: {
        type: DataTypes.BOOLEAN,
        defaultValue: false
    }
},{
    timestamps: false // Отключение автоматических полей createdAt и updatedAt
}
);

module.exports = User;