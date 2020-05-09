const Sequelize = require('sequelize')

const db = require('../database/db.js').sequelize
const User = require('../models/User')



var Ticket = db.define(
  'Ticket',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: Sequelize.INTEGER,
      references: {
        model: User,
        key: 'id'
      }
    },
    issue: {
      type: Sequelize.STRING
    },
    status: {
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

module.exports = Ticket



