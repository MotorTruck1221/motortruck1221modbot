const Sequelize = require("sequelize")
const sqlite3 = require("sqlite3")

const database = new Sequelize('database', 'user', 'password', {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "Advertisements.sqlite",
    define: {
        freezeTableName: true
    }
})

//const UserStorage = database.define('user', {
//    id: {
//        type: Sequelize.STRING,
 //       unique: true,
  //      primaryKey: true
  //  },
  //  tag: Sequelize.STRING
//})

module.exports.settings = database.define('settings', {
    id: {
        primaryKey: true,
        type: Sequelize.STRING,
        unique: true
    },
    guild: Sequelize.STRING,
    channel: Sequelize.STRING,
    roleID: Sequelize.STRING
})