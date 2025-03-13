const GameService = require("../services/Game.service");
const isValidId = require("../utils/isValidId");
const GameValidator = require("../utils/Game.validator");
const formatResponse = require("../utils/formatResponse");

class GameController {
  static async getAllGames(req, res) {
    try {
      const games = await GameService.getAll();

      if (games.length === 0) {
        return res.status(200).json(formatResponse(200, "No games found", []));
      }

      res.status(200).json(formatResponse(200, "success", games));
    } catch ({ message }) {
      console.error(message);

      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getGameById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid game ID"));
    }

    try {
      const game = await GameService.getById(+id);

      if (!game) {
        return res
          .status(404)
          .json(formatResponse(404, `Game with id ${id} not found`));
      }

      res.status(200).json(formatResponse(200, "success", game));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async createGame(req, res) {
    const { phase, key, isReady, discussionTime } = req.body;

    const { user } = res.locals;

    const { isValid, error } = GameValidator.validate({
      phase,
      discussionTime,
      key,
      isReady,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
    try {
      const newGame = await GameService.create({
        owner_id: user.id,
        phase,
        key,
        isReady,
        discussionTime,
      });

      if (!newGame) {
        return res
          .status(400)
          .json(formatResponse(400, "Failed to create new game"));
      }

      res.status(201).json(formatResponse(201, "success", newGame));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async updateGame(req, res) {
    const { id } = req.params;
    const { phase, isReady, discussionTime } = req.body;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid game ID"));
    }

    const { isValid, error } = GameValidator.validate({
      phase,
      discussionTime,
      isReady,
    });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }

    try {
      const existingGame = await GameService.getById(+id);

      if (!existingGame) {
        return res.status(404).json(formatResponse(404, "Game not found"));
      }

      if (existingGame.owner_id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(400, "You don't have permission to update this game")
          );
      }

      const updatedGame = await GameService.update(+id, {
        phase,
        isReady,
        discussionTime,
      });
      res.status(200).json(formatResponse(200, "success", updatedGame));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async deleteGame(req, res) {
    const { id } = req.params;
    const { user } = res.locals;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Invalid game ID"));
    }

    try {
      const existingGame = await GameService.getById(+id);

      if (!existingGame) {
        return res.status(404).json(formatResponse(404, "Game not found"));
      }

      if (existingGame.owner_id !== user.id) {
        return res
          .status(400)
          .json(
            formatResponse(400, "You don't have permission to delete this game")
          );
      }

      const game = await GameService.delete(+id);

      res
        .status(200)
        .json(formatResponse(200, "Game successfully deleted", game));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = GameController;
