const Sequelize = require('sequelize')
const db = require('../database/db.js')
var User = require('./User')


var Role = db.sequelize.define(
    'Role',
    {
        id: {
            type: Sequelize.INTEGER,
            primaryKey: true,
            autoIncrement: true
        },
        name: {
            type: Sequelize.STRING
        },
        created: {
            type: Sequelize.DATE,
            defaultValue: Sequelize.NOW
        }
    },
    {
        timestamps: false
    }
)

Role.associate = function (models) {
    Role.hasMany(User, { as: 'users' })
};
module.exports = Role

