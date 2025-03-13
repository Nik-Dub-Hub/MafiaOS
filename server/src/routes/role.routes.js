const router = require("express").Router();
const RoleController = require("../controllers/Role.controller");

router
  .get("/", RoleController.getAllRoles)

  .get("/:id", RoleController.getRoleById);

module.exports = router;
