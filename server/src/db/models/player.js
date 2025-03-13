'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate({ Role }) {
      this.belongsTo(Role, {foreignKey: 'role_id',
        as: 'role',
    });
    }
  }
  Player.init({
    user_id: DataTypes.INTEGER,
    game_id: DataTypes.INTEGER,
    role_id: DataTypes.INTEGER,
    isAlive: {
      type: DataTypes.BOOLEAN,
      defaultValue: true
    }  
  }, {
    sequelize,
    modelName: 'Player',
  });
  return Player;
};