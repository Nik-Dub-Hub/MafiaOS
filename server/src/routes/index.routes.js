
const router = require("express").Router();
const formatResponse = require("../utils/formatResponse");
const authRoutes = require("./auth.routes");
const gameRoutes = require("./game.routes");
const playerRoutes = require("./player.routes");

router.use("/auth", authRoutes);
router.use("/game", gameRoutes);
router.use("/player", playerRoutes);

router.use("*", (req, res) => {
  res.status(404).json(formatResponse(404, "Not found"));
});


module.exports = router;
