'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate({User, Player }) {
      Game.belongsTo(User, {foreignKey: 'owner_id'}),
      Game.hasMany(Player, {foreignKey: 'game_id'})
    }
  }
  Game.init({
    owner_id: DataTypes.INTEGER,
    phase: DataTypes.STRING,
    key: DataTypes.STRING,
    isReady: DataTypes.BOOLEAN,
    discussionTime: DataTypes.INTEGER
  }, {
    sequelize,
    modelName: 'Game',
  });
  return Game;
};