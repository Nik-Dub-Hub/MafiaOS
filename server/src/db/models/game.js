"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class Game extends Model {
    static associate({ User, Player }) {
      Game.belongsTo(User, { foreignKey: "owner_id" }),
        Game.hasMany(Player, { foreignKey: "game_id" });
    }
  }
  Game.init(
    {
      owner_id: DataTypes.INTEGER,
      phase: DataTypes.STRING,
      key: DataTypes.STRING,
      discussionTime: DataTypes.INTEGER,
      voting: {
        type: DataTypes.ARRAY(DataTypes.INTEGER), 
        defaultValue: [],
      },
    },
    {
      sequelize,
      modelName: "Game",
    }
  );
  return Game;
};
