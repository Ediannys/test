const Sequelize = require('sequelize')
const db = require('../database/db.js')
var User = require('./User')


var Roles = db.sequelize.define(
    'Roles',
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

Roles.associate = function (models) {
    Roles.hasMany(User, { as: 'users' })
};
module.exports = Roles

