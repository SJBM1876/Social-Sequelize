const { DataTypes } = require('sequelize');
const { sequelize } = require('../db/connection');

const Comment = sequelize.define('Comment', {
  body: {
    type: DataTypes.TEXT,
    allowNull: false
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

module.exports = Comment;