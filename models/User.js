const Sequelize = require('sequelize')

const db = require('../database/db.js').sequelize
var Roles = require('./Roles')


var User = db.define(
  'User',
  {
    id: {
      type: Sequelize.INTEGER,
      primaryKey: true,
      autoIncrement: true
    },
    id_role: {
      type: Sequelize.INTEGER,
      references: {
        model: Roles,
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
User.associate = function (models) {
  User.belongsTo(Roles, { foreignKey: 'id_role', as: 'roles' });
};

module.exports = User



