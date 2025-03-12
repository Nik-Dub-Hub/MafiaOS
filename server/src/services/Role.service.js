const { Role, Player } = require("../db/models");

class RoleService {
  static async getAll() {
    return await Role.findAll({
      include: [
        {
          model: Player,
          as: "player",
          attributes: ["user_id", "game_id", "isAlive"],
        },
      ],
    });
  }

  static async getById(id) {
    return await Role.findByPk(id, {
      include: [
        {
          model: Player,
          as: "player",
          attributes: ["user_id", "game_id", "isAlive"],
        },
      ],
    });
  }
}
module.exports = RoleService;
