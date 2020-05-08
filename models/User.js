const Sequelize = require('sequelize')

const db = require('../database/db.js').sequelize
var Role = require('./Role')



var User = db.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    role_id: {
      type: Sequelize.INTEGER,
      references: {
        model: Role,
        key: 'id'
      }
    },
    first_name: {
      type: Sequelize.STRING
    },
    last_name: {
      type: Sequelize.STRING
    },
    email: {
      type: Sequelize.STRING
    },
    password: {
      type: Sequelize.STRING
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


module.exports = User



