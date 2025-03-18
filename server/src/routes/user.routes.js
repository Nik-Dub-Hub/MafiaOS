const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const router = require("express").Router();
const UserController = require("../controllers/User.controller");
const upload = require("../config/multerConfig");
const verifyAccessToken = require("../middleware/verifyAccessToken");

//router.put("/:id", verifyRefreshToken, UserController.updatedUser);
router.put("/:id",
 // verifyRefreshToken,
  upload.single("avatar"),
  UserController.uploadAvatar
);

module.exports = router;
