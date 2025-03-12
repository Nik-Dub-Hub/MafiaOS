const router = require("express").Router();
const RoleController = require("../controllers/Role.controller.js");

router
  .get("/", RoleController.getAllRoles)

  .get("/:id", RoleController.getRoleById);

module.exports = router;
