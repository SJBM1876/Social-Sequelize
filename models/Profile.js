const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Profile = sequelize.define('Profile', {
  bio: {
    type: DataTypes.STRING,
    allowNull: true
  },
  profilePicture: {
    type: DataTypes.STRING,
    allowNull: true
  },
  birthday: {
    type: DataTypes.DATEONLY,
    allowNull: true,
    validate: {
      isDate: true
    }
  }
}, {
  // Other model options go here
});

module.exports = Profile;