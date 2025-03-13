class GameValidator {
  static validate(data) {
    const { phase, discussionTime, key, isReady } = data;

    if (!phase || typeof phase !== 'string' || phase.trim() === '') {
      return {
        isValid: false,
        error: 'Phase is required and must be a non-empty string.',
      };
    }

    const validPhases = ['waiting', 'inProgress', 'finished'];
    if (!validPhases.includes(phase)) {
      return {
        isValid: false,
        error: 'Phase must be one of the following: waiting, inProgress, finished.',
      };
    }

    if (discussionTime === undefined || typeof discussionTime !== 'number' || discussionTime <= 0) {
      return {
        isValid: false,
        error: 'Discussion time is required and must be a positive number.',
      };
    }

    if (!key || typeof key !== 'string' || key.trim() === '') {
      return {
        isValid: false,
        error: 'Key is required and must be a non-empty string.',
      };
    }

    if (isReady === undefined || typeof isReady !== 'boolean') {
      return {
        isValid: false,
        error: 'IsReady is required and must be a boolean.',
      };
    }

    return {
      isValid: true,
      error: null,
    };
  }
}

module.exports = GameValidator;