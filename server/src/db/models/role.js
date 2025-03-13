'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Role extends Model {
    static associate({ Player }) {
      this.hasMany(Player, { foreignKey: 'role_id', as: 'player', })
    }
  }
  Role.init({
    name: DataTypes.STRING,
    description: DataTypes.TEXT,
  }, {
    sequelize,
    modelName: 'Role',
  });
  return Role;
};