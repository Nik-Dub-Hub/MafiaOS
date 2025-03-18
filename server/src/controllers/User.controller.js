const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/User.service");
const { validateEmail } = require("../utils/Auth.validator");

function isValid(id) {
  return !isNaN(parseFloat(id)) && isFinite(id);
}

class UserController {
  static async updatedUser(req, res) {
    const { id } = req.params;
    const { email, username } = req.body;

    if (!isValid(id)) {
      return res.status(400).json(formatResponse(400, "Invalid user ID"));
    }


    const { isValid: isEmailValid, error } = validateEmail({ email });
    if (!isEmailValid) {
      return res
        .status(400)
        .json(formatResponse(400, "Validation error", null, error));
    }
  
    try {
      const existingUser = await UserService.getById(+id);

      if (!existingUser) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }

      const updatedUser = await UserService.update(+id, { email, username });
      res.status(200).json(formatResponse(200, "success", updatedUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }

  static async uploadAvatar(req, res) {
    const { id } = req.params;

    if (!isValid(id)) {
      return res.status(400).json(formatResponse(400, "Invalid user ID"));
    }

    if (!req.file) {
      return res.status(400).json(formatResponse(400, "No image uploaded"));
    }

    try {
      const existingUser = await UserService.getById(+id);

      if (!existingUser) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }
  const avatarUrl = `/static/images/avatars/${req.file.filename}`;


      const updatedUser = await UserService.updateAvatar(+id, avatarUrl);

      res
        .status(200)
        .json(formatResponse(200, "Avatar uploaded successfully", updatedUser));
    } catch (error) {
      console.error(error);
      res
        .status(500)
        .json(
          formatResponse(500, "Internal server error", null, error.message)
        );
    }
  }
}

module.exports = UserController;
