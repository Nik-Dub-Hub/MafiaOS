const router = require('express').Router();
const GameController = require('../controllers/Game.controller');
const verifyAccessToken = require('../middleware/verifyAccessToken'); 

router
  .get('/', GameController.getAllGames)

  .get('/:id',verifyAccessToken, GameController.getGameById)

  .post('/', verifyAccessToken, GameController.createGame)

  .put('/:id', verifyAccessToken, GameController.updateGame)

  .delete('/:id', verifyAccessToken, GameController.deleteGame);

module.exports = router;