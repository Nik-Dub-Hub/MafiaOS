const router = require("express").Router();
const PlayerController = require("../controllers/Player.controller");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router
  .get("/", PlayerController.getAllPlayers)

  .get("/:id", PlayerController.getPlayerById)

  .post("/", verifyAccessToken, PlayerController.createPlayer)

  .put("/:id", verifyAccessToken, PlayerController.updatePlayer)

  .delete("/:id", verifyAccessToken, PlayerController.deletePlayer);

module.exports = router;
