'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Player extends Model {
    static associate({ Role, User, Game }) {
      this.belongsTo(Role, {foreignKey: 'role_id'}),
      this.belongsTo(User, {foreignKey: 'user_id'}),
      this.belongsTo(Game, {foreignKey: 'game_id'})
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