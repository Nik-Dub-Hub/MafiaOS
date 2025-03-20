const router = require("express").Router();
const UserController = require("../controllers/User.controller");
const upload = require("../config/multerConfig");
const verifyAccessToken = require("../middleware/verifyAccessToken");

router.put("/:id", verifyAccessToken,upload.single("avatar"), UserController.updateUser);

module.exports = router;
