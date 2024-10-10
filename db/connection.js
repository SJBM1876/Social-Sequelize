const path = require('path');
const Sequelize = require('sequelize');

// Connect to db via sequelize
const sequelize = new Sequelize({
    dialect: 'sqlite',
    storage: path.join(__dirname, 'database.sqlite'),
    logging: false
});

module.exports = {
    sequelize
};
