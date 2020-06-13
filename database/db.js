const Sequelize = require("sequelize")
const sequelize = new Sequelize("test_react_node", "root","", {
    host:'localhost',
    dialect: 'mysql',
    operatorAliases: false,

    pool:{
        max:5,
        min:0,
        acquire: 30000,
        idle: 10000
    },
    define: {
        underscored: true
    }
})

const db = {}
db.Sequelize= Sequelize
db.sequelize = sequelize


//Models/tables
db.user = require('../models/User')(sequelize, Sequelize);
db.role = require('../models/Role')(sequelize, Sequelize);
db.ticket = require('../models/Ticket')(sequelize, Sequelize);

//Relations
db.user.belongsTo(db.role);
db.role.hasMany(db.user);

db.ticket.belongsTo(db.user);
db.user.hasMany(db.ticket);


module.exports = db
