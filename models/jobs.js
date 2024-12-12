const {DataTypes} = require('sequelize');
const sequelize = require('../db/db')

const Jobs= sequelize.define('candidate',{
    id: {
        type: DataTypes.INTEGER,
        primaryKey: true,
        autoIncrement: true,
    },
    jobTitle:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    company:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    location:{
        type:DataTypes.STRING,
        allowNull:false,
    },
    experienceInYear: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
    salaryInLPA:{
        type:DataTypes.INTEGER,
        allowNull:false,
    },
    jobdescription:{
        type:DataTypes.STRING,
        allowNull:false,
    }
},{
    timestamps:"true",
});
module.exports =Jobs;