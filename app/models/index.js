const config = require("../config/db.config.js");
const { dbName, dbConfig } = require('../config/config.json');
const Sequelize = require("sequelize");



const dialect = 'mssql';
const host = dbConfig.server;
const { userName, password } = dbConfig.authentication.options;


const sequelize = new Sequelize( dbName, userName, password, { host, dialect: 'mssql' });;

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require("../models/user.model.js")(sequelize, Sequelize);
db.role = require("../models/role.model.js")(sequelize, Sequelize);

db.role.belongsToMany(db.user, {
  through: "user_roles",
  foreignKey: "roleId",
  otherKey: "userId"
});
db.user.belongsToMany(db.role, {
  through: "user_roles",
  foreignKey: "userId",
  otherKey: "roleId"
});

db.ROLES = ["user", "admin", "moderator"];


module.exports = db;