const { User } = require("../db/models");

class UserService {
  static async getById(id) {
    return await User.findOne({ where: { id } });
  }

  static async create(userData) {
    return await User.create(userData);
  }

  static async update(id, newUserData) {
    const user = await User.findByPk(id);
    if (user) {

      if (newUserData.username !== undefined) {
        user.username = newUserData.username;
      }
      if (newUserData.email !== undefined) {
        user.email = newUserData.email;
      }
      await user.save();
    }
    return user;
  }
}

module.exports = UserService;