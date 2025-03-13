class PlayerValidator {
  static validate(data) {
    const { game_id, role_id, isAlive } = data;

    if (game_id === undefined || typeof game_id !== "number" || game_id <= 0) {
      return {
        isValid: false,
        error: "game_id is required and must be a positive number.",
      };
    }

    if (
      role_id !== undefined &&
      (typeof role_id !== "number" || role_id <= 0)
    ) {
      return {
        isValid: false,
        error: "role_id must be a positive number.",
      };
    }

    if (isAlive !== undefined && typeof isAlive !== "boolean") {
      return {
        isValid: false,
        error: "isAlive must be a boolean.",
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = PlayerValidator;
