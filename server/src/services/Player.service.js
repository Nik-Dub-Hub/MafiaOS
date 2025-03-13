const { Player } = require("../db/models");

class PlayerService {
  static async getAll() {
    return await Player.findAll();
  }

  static async getById(id) {
    return await Player.findByPk(id);
  }

  static async create(data) {
    const player = await Player.create(data);
    return await this.getById(player.id);
  }

  static async update(id, data) {
    const player = await this.getById(id);
    if (!player) {
      return null;
    }
    player.role_id = data.role_id;
    player.isAlive = data.isAlive;
    await player.save();
    return player;
  }

  static async delete(id) {
    const player = await this.getById(id);
    if (!player) {
      return null;
    }
    await player.destroy();
    return player;
  }
}

module.exports = PlayerService;
