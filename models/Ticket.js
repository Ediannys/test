'use strict'

module.exports = (sequelize, DataTypes) => {
  const Ticket = sequelize.define('ticket', {
    id: {
      type: DataTypes.UUID,
      primaryKey: true,
      autoIncrement: true
    },
    user_id: {
      type: DataTypes.UUID,
      required: true,
      allowNull: false
    },
    issue: {
      type: DataTypes.STRING
    },
    status: {
      type: DataTypes.UUID,
    },
    created: {
      type: DataTypes.DATE,
      defaultValue: DataTypes.NOW
    }
  },
    {
      timestamps: false
    },
    {
      underscored: true
    });
  return Ticket;
};



