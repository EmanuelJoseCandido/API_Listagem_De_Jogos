const sequelize = require('sequelize');
const connection = new sequelize('games', 'root', 'mulaza', {
    host: '127.0.0.1',
    dialect: 'mysql'
});

module.exports = connection;