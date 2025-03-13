const verifyRefreshToken = require("../middleware/verifyRefreshToken");
const router = require("express").Router();
const UserController = require('../controllers/User.controller')

router.put('/:id',verifyRefreshToken,UserController.updateUser)

module.exports = router