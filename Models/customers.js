const {Sequelize,DataTypes} = require('sequelize');
const sequelize = require('../utils/database');
const Customer = sequelize.define('customer',{
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
    },
    
    email:{
        type:DataTypes.STRING,
        validate:{
            isEmail:true
        },
        unique:true
    },
    
    otp:{
        type:DataTypes.INTEGER,
        validate:{
            isNumeric:true,
            len:6
        }
    },
    count:{
        type:DataTypes.INTEGER,
        validate:{
            isNumeric:true
        }
    }
})

module.exports = Customer;

