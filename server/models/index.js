/* eslint-disable import/no-dynamic-require */
/* eslint-disable security/detect-non-literal-require */
/* eslint-disable security/detect-object-injection */
const fs = require('fs');
const path = require('path');
const Sequelize = require('sequelize');
const { nodeEnvironment } = require('../config/config');

const basename = path.basename(module.filename);
const env = nodeEnvironment || 'development';
const config = require(`${__dirname}/../config/config.js`)[env];
const db = {};

let sequelize;
if (config.use_env_variable) {
  sequelize = new Sequelize(process.env[config.use_env_variable]);
} else {
  sequelize = new Sequelize(
    config.database, config.username, config.password, config,
  );
}

// eslint-disable-next-line security/detect-non-literal-fs-filename
fs
  .readdirSync(__dirname)
  .filter(file => (file.indexOf('.') !== 0)
    && (file !== basename)
    && (file.slice(-3) === '.js'))
  .forEach(file => {
    // eslint-disable-next-line global-require
    const model = require(path.join(__dirname, file))(sequelize, Sequelize.DataTypes);
    db[model.name] = model;
  });

Object.keys(db).forEach(modelName => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

db.sequelize = sequelize;
db.Sequelize = Sequelize;

module.exports = db;