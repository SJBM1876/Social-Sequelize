const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Like = sequelize.define('Like', {
  reactionType: {
    type: DataTypes.STRING,
    allowNull: false,
    validate: {
      isIn: [['like', 'love', 'haha', 'wow', 'sad', 'angry']] // Example reaction types
    }
  },
  createdAt: {
    type: DataTypes.DATE,
    allowNull: false,
    defaultValue: DataTypes.NOW
  }
}, {
  timestamps: true,
  updatedAt: false
});

module.exports = Like;