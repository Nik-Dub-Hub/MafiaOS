const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/User.service");
const { validateEmail } = require("../utils/Auth.validator");
const generateTokens = require("../utils/generateTokens");
const cookiesConfig = require("../config/cookiesConfig");

function isValid(id) {
  return !isNaN(parseFloat(id)) && isFinite(id);
}

class UserController {
  static async updateUser(req, res) {
    const { id } = req.params;
    const {
      email,
      username,
      civilianCount,
      mafiaCount,
      doctorCount,
      ladyCount,
    } = req.body;

    console.log(req.body,'LLLLLLLLLLLLLLLLL');
    
    if (!isValid(id)) {
      return res.status(400).json(formatResponse(400, "Invalid user ID"));
    }
    if (email !== undefined) {
      const isEmailValid = validateEmail(email);
      
      if (!isEmailValid) {
        return res
          .status(400)
          .json(
            formatResponse(400, "Validation email error", null, "Validation email error")
          );
      }
    }

    try {
      const existingUser = await UserService.getById(+id);

      if (!existingUser) {
        return res.status(404).json(formatResponse(404, "User not found"));
      }

      let avatarUrl = existingUser.img;
      if (req.file) {
        avatarUrl = `/static/images/avatars/${req.file.filename}`;
      }

      const updatedUser = await UserService.update(+id, {
        email,
        username,
        img: avatarUrl,
        civilianCount,
        mafiaCount,
        doctorCount,
        ladyCount,
      });

      const plainUser = updatedUser.get({ plain: true });
      delete plainUser.password;

      const { accessToken, refreshToken } = generateTokens({ user: plainUser });

      res
        .status(200)
        .cookie("refreshToken", refreshToken, cookiesConfig)
        .json(
          formatResponse(200, "User updated successfully", {
            user: plainUser,
            accessToken,
            refreshToken,
          })
        );
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, "Internal server error", null, message));
    }
  }
}

module.exports = UserController;
