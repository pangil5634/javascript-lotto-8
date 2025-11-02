import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class BonusNumberValidators {
  static run(bonusNumber) {
    this.#isEmpty(bonusNumber);
    this.#isNotNumber(bonusNumber);
    this.#isInvalidRange(bonusNumber);
  }

  static #isEmpty(bonusNumber) {
    if (!bonusNumber || bonusNumber === '') {
      throw new Error(ERROR_MESSAGES_INPUT.IS_EMPTY);
    }
  }
  static #isNotNumber(bonusNumber) {
    if (isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES_INPUT.IS_NOT_NUMBER);
    }
  }
  static #isInvalidRange(bonusNumber) {
    if (Number(bonusNumber) > 45 || Number(bonusNumber) < 1)
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_NUMBER_RANGE);
  }
}

export default BonusNumberValidators;
