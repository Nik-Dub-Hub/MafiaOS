const { Player, User, Game, Role } = require("../db/models");

class PlayerService {
  static async getAll() {
    return await Player.findAll({
      include: [{ model: User,attributes:['id','username'] }, { model: Game }, { model: Role,attributes:['id','name'] }],
    });
  }

  static async findPlayerByGameAndUserId({game_id,user_id}){
    
    return await Player.findOne({where:{user_id,game_id}})
  }

  static async getById(id) {
    return await Player.findByPk(id, {
      include: [
        { model: User, attributes: ["id", "username"] },
        { model: Game },
        { model: Role, attributes: ["id", "name"] },
      ],
    });
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
    if(data.role_id !== undefined){
      player.role_id = data.role_id;
    }
    if(data.isAlive !== undefined){
      player.isAlive = data.isAlive;
    }
    await player.save();
    return await this.getById(player.id); 
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
