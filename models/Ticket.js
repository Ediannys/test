const Sequelize = require('sequelize')

const db = require('../database/db.js').sequelize
const User = require('../models/User')

var Ticket = require('./Ticket')


var Ticket = db.define(
  'Ticket',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_user: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    issue: {
      type: Sequelize.STRING
    },
    requested_ticket: {
        type: Sequelize.INTEGER,
      },
    created: {
      type: Sequelize.DATE,
      defaultValue: Sequelize.NOW
    }
  },
  {
    timestamps: false
  },
)
Ticket.associate = function (models) {
    Ticket.hasMany(User, { as: 'users' })
};

module.exports = Ticket



