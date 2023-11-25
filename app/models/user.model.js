const {sequelize}= require('../config/db')
const{DataTypes}= require('sequelize');

const User = sequelize.define('User',{
    username:{
        type: DataTypes.STRING,
        allowNull: false,
        unique: true
    },
    email:{
        type: DataTypes.STRING,
        unique: true
    },
    password:{
        type: DataTypes.STRING,
        allowNull: false
    }
})

// sequelize.sync();

module.exports = User