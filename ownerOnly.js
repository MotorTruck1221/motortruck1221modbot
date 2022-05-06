const Sequelize = require("sequelize")
const sqlite3 = require("sqlite3")

const database = new Sequelize('database', 'user', 'password', {
    host: "localhost",
    dialect: "sqlite",
    logging: false,
    storage: "OwnerPerms.sqlite",
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

module.exports.owner = database.define('stat', {
     id: {
         primaryKey: true,
         type: Sequelize.STRING,
         unique: true
     },
    oID: Sequelize.STRING,
    status: Sequelize.STRING,
    game: Sequelize.STRING
})