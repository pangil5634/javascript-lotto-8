import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class BonusNumberValidators {
  static run(bonusNumber, winningNumbers) {
    this.#isEmpty(bonusNumber);
    this.#isNotNumber(bonusNumber);
    this.#isInvalidRange(bonusNumber);
    this.#isDuplicatedNumber(bonusNumber, winningNumbers);
  }

  static #isEmpty(bonusNumber) {
    if (!bonusNumber || bonusNumber === '') {
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_INPUT);
    }
  }
  static #isNotNumber(bonusNumber) {
    if (isNaN(bonusNumber)) {
      throw new Error(ERROR_MESSAGES_INPUT.NOT_A_NUMBER);
    }
  }
  static #isInvalidRange(bonusNumber) {
    if (Number(bonusNumber) > 45 || Number(bonusNumber) < 1)
      throw new Error(ERROR_MESSAGES_INPUT.NUMBER_OUT_OF_RANGE);
  }

  static #isDuplicatedNumber(bonusNumber, winningNumbers) {
    if (winningNumbers.includes(Number(bonusNumber))) {
      throw new Error(ERROR_MESSAGES_INPUT.DUPLICATE_NUMBERS_FOUND);
    }
  }
}

export default BonusNumberValidators;
