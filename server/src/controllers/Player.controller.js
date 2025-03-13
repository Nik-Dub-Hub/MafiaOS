const PlayerService = require("../services/Player.service");
const isValidId = require("../utils/isValidId");
const PlayerValidator = require("../utils/Player.validator");
const formatResponse = require("../utils/formatResponse");

class PlayerController {
  static async getAllPlayers(req, res) {
    try {
      const players = await PlayerService.getAll();

      if (players.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "No players found", []));
      }

      res.status(200).json(formatResponse(200, "success", players));
    } catch ({ message }) {
      console.error(message);

      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getPlayerById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid player ID"));
    }

    try {
      const player = await PlayerService.getById(+id);

      if (!player) {
        return res
          .status(404)
          .json(formatResponse(404, `Player with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", player));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createPlayer(req, res) {
    const { game_id } = req.body;

    const { user } = res.locals;
    try {
      const newPlayer = await PlayerService.create({
        user_id: user.id,
        game_id,
        role_id: 1,
        isAlive: true,
      });

      if (!newPlayer) {
        return res
          .status(400)
          .json(formatResponse(400, "Failed to create new player"));
      }

      res.status(201).json(formatResponse(201, "success", newPlayer));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updatePlayer(req, res) {
    const { id } = req.params;
    const { role_id, isAlive } = req.body;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid player ID"));
    }
    try {
      const existingPlayer = await PlayerService.getById(+id);

      if (!existingPlayer) {
        return res.status(404).json(formatResponse(404, "Player not found"));
      }

      if (existingPlayer.user.id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "You don't have permission to update this player"
            )
          );
      }

      const updatedPlayer = await PlayerService.update(+id, {
        role_id,
        isAlive,
      });
      res.status(200).json(formatResponse(200, "success", updatedPlayer));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deletePlayer(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid player ID"));
    }

    try {
      const existingPlayer = await PlayerService.getById(+id);

      if (!existingPlayer) {
        return res.status(404).json(formatResponse(404, "Playernot found"));
      }

      if (existingPlayer.user.id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              "You don't have permission to delete this player"
            )
          );
      }

      const player = await PlayerService.delete(+id);

      res
        .status(200)
        .json(formatResponse(200, "Player successfully deleted", player));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = PlayerController;
