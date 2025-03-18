const formatResponse = require("../utils/formatResponse");
const UserService = require("../services/User.service");
const { validateEmail } = require("../utils/Auth.validator");
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


static async updateTask(req, res) {

    const { id } = req.params;
    const { email, username } = req.body;
   
    // const { user } = res.locals;

    //? Проверяем корректность ID задачи
    if (!isValidId(id)) {
      return res.status(400).json(formatResponse(400, 'Invalid task ID'));
    }

    //? Валидируем новые данные задачи
    const { isValid, error } = validateEmail.validate({ email });
    if (!isValid) {
      return res
        .status(400)
        .json(formatResponse(400, 'Validation error', null, error));
    }
    try {
      //? Проверяем существование задачи в БД
      const existingUser = await UserService.getById(+id);

      if (!existingUser) {
        return res.status(404).json(formatResponse(404, 'User not found'));
      }

      // //? Проверяем права доступа: только автор может редактировать задачу
      // if (existingTask.author_id !== user.id) {
      //   return res
      //     .status(400)
      //     .json(
      //       formatResponse(400, "You don't have permission to update this task")
      //     );
      // }

      //* Обновляем задачу и возвращаем обновленную версию
      const updatedUser = await UserService.update(+id, { email, username });
      res.status(200).json(formatResponse(200, 'success', updatedUser));
    } catch ({ message }) {
      console.error(message);
      res
        .status(500)
        .json(formatResponse(500, 'Internal server error', null, message));
    }
  }