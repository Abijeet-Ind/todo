const dbConfig = require("./../config/config");

const {
    Sequelize,
    DataTypes
} = require("sequelize");
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
    host: dbConfig.HOST,
    dialect: dbConfig.dialect,
    operatorsAliases: false,
    logging: false,
    pool: {
        max: dbConfig.pool.max,
        min: dbConfig.pool.min,
        acquire: dbConfig.pool.acquire,
        idle: dbConfig.pool.idle,
    },
});

sequelize
    .authenticate()
    .then(() => {
        console.log("CONNECTED!!");
    })
    .catch((err) => {
        console.log("Error" + err);
    });


const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.user = require('./dbModel/userModel')(sequelize, DataTypes);
db.todo = require('./dbModel/todoModel')(sequelize, DataTypes);

// relation
db.user.hasMany(db.todo)
db.todo.belongsTo(db.user)

/* end role */

db.sequelize.sync({
    force: false
}).then(() => {
    console.log("yes re-sync done");
});


module.exports = db;