const { Sequelize } = require('sequelize');
const User = require('./models/User');
const Profile = require('./models/Profile');
const Post = require('./models/Post');
const Comment = require('./models/Comment');
const Like = require('./models/Like');

const sequelize = new Sequelize({
  dialect: 'sqlite',
  storage: './database.sqlite',
  logging: false
});

// User - Profile association (one-to-one)
User.hasOne(Profile);
Profile.belongsTo(User);

// User - Post association (one-to-many)
User.hasMany(Post);
Post.belongsTo(User);

// Post - Comment association (one-to-many)
Post.hasMany(Comment);
Comment.belongsTo(Post);

// User - Like association (many-to-many)
User.belongsToMany(Like, { through: 'UserLikes' });
Like.belongsToMany(User, { through: 'UserLikes' });

// Post - Like association (optional, if likes are associated with posts)
Post.hasMany(Like);
Like.belongsTo(Post);

module.exports = {
  sequelize,
  User,
  Profile,
  Post,
  Comment,
  Like
};