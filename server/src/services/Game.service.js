const { Game , User} = require("../db/models");

class GameService {
  static async getAll() {
    return await Game.findAll({
      include: { model: User, attributes: ["id", "username"] },
    });
  }

  static async getById(id) {
    return await Game.findByPk(id, {
      include: { model: User, attributes: ["id", "username"] },
    });
  }

  static async create(data) {
    const game = await Game.create(data);
    return await this.getById(game.id);
  }

  static async update(id, data) {
    const game = await this.getById(id);
    if (!game) {
      return null;
    }
    if (data.phase !== undefined) {
      game.phase = data.phase;
    }
    if (data.isReady !== undefined) {
      game.isReady = data.isReady;
    }
    if (data.discussionTime !== undefined) {
      game.discussionTime = data.discussionTime;
    }
    await game.save();
    return game;
  }

  static async delete(id) {
    const game = await this.getById(id);
    if (!game) {
      return null;
    }
    await game.destroy();
    return game;
  }
  static async addVote(id, vote) {
    const game = await this.getById(id);
    if (!game) {
      return null;
    }
    game.voting = [...game.voting, vote];
    await game.save();
    return game;
  }

  static async clearVoting(id) {
    const game = await this.getById(id);
    if (!game) {
      return null;
    }
    game.voting = [];
    await game.save();
    return game;
  }
}

module.exports = GameService;
