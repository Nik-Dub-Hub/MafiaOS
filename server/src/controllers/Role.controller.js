const RoleService = require("../services/Role.service");
const isValidId = require("../utils/isValidId");
const formatResponse = require("../utils/formatResponse");

class RoleController {
  static async getAllRoles(req, res) {
    try {
      const roles = await RoleService.getAll();

      if (roles.length === 0) {
        return res
          .status(200)
          .json(formatResponse(200, "Роли пропали, но обещали вернуться", []));
      }
      res.status(200).json(formatResponse(200, "success", roles));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async getRoleById(req, res) {
    const { id } = req.params;

    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, "Неправильный ID"));
    }

    try {
      const role = await RoleService.getById(+id);
      if (!role) {
        return res
          .status(404)
          .json(formatResponse(404, `Роль с id ${id} не найдена`));
      }

      res.status(200).json(formatResponse(200, "success", role));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = RoleController;
