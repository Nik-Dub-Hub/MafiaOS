const { User } = require("../db/models");

class UserService {
  static async getByEmail(email) {
    return await User.findOne({ where: { email } });
  }

  static async create(userData) {
    // console.log(userData, '================================')
    return await User.create(userData);
  }

  static async update(id, newUserData) {
    const user = await User.findByPk(id);
    if (user) {
      user.username = newUserData.username;
      user.img = newUserData.img;
      user.civilianCount = newUserData.civilianCount;
      user.mafiaCount = newUserData.mafiaCount;
      user.doctorCount = newUserData.doctorCount;
      user.ladyCount = newUserData.ladyCount;
      await user.save();
    }
    return user;
  }
}

module.exports = UserService;
