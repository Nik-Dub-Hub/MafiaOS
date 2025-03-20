const { User } = require("../db/models");

class UserService {
  static async getById(id) {
    return await User.findOne({ where: { id } });
  }

  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
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
      if (newUserData.civilianCount !== undefined) {
        user.civilianCount = newUserData.civilianCount;
      }
      if (newUserData.mafiaCount !== undefined) {
        user.mafiaCount = newUserData.mafiaCount;
      }
      if (newUserData.doctorCount !== undefined) {
        user.doctorCount = newUserData.doctorCount;
      }
      if (newUserData.ladyCount !== undefined) {
        user.ladyCount = newUserData.ladyCount;
      }
      if (newUserData.img !== undefined) {
        user.img = newUserData.img;
      }
      await user.save();
    }
    return user;
  }
}

module.exports = UserService;