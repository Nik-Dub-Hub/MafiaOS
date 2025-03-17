const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/User.service");
// const reformatId = require("../utils/reformatId");

class UserController {
  static async updateUser(req, res) {
    const { id } = res.locals.user;
    const { username, email} = req.body;

    try {
      const foundUser = await UserService.getById(id);

      if (!foundUser) {
        return res
          .status(400)
          .json(
            formatResponse(
              400,
              `Not found user by email ${email}`,
              null,
              `Not found user by email ${email}`
            )
          );
      }

      const updateData = {};
      if (username !== undefined) {
        updateData.username = username;
      }
      if (email !== undefined) {
        updateData.email = email;
      }
      const updateUser = await UserService.update(updateData);

      if (!updateUser) {
        return res
          .status(400)
          .json(formatResponse(400, "User not found", null, "User not found"));
      }
      res.status(200).json(formatResponse(200, "success", updateUser));
    } catch ({ message }) {
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = UserController;