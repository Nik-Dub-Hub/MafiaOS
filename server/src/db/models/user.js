"use strict";
const { Model } = require("sequelize");
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    static associate() {

    }
  }
  User.init(
    {
      username: DataTypes.STRING,
      email: DataTypes.STRING,
      password: DataTypes.STRING,
      civilianCount: DataTypes.INTEGER,
      mafiaCount: DataTypes.INTEGER,
      doctorCount: DataTypes.INTEGER,
      ladyCount: DataTypes.INTEGER,
    },
    {
      sequelize,
      modelName: "User",
    }
  );
  return User;
};
