const Sequelize = require('sequelize');
const sequelize = new Sequelize('node-complete', 'root', '548756', {
  dialect: 'mysql',
  host: 'localhost',
  port: 3003
});

module.exports = sequelize;

