import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class WinningNumbersValidators {
  static validateWinningNumbersFormat(parseWinningNumbers) {
    this.#isLessLegth(parseWinningNumbers);
    this.#isInvalidCommna(parseWinningNumbers);
    this.#isNotNumber(parseWinningNumbers);
  }

  static #isLessLegth(parseWinningNumbers) {
    if (parseWinningNumbers.length !== 6) {
      throw new Error(ERROR_MESSAGES_INPUT.LESS_WINNING_NUMBERS);
    }
  }
  static #isInvalidCommna(parseWinningNumbers) {
    const hasEmpty = parseWinningNumbers.some((num) => num.trim() === '');
    if (hasEmpty) {
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_USING_COMMA);
    }
  }
  static #isNotNumber(parseWinningNumbers) {
    const hasNonNumber = parseWinningNumbers.some((num) => isNaN(Number(num)));
    if (hasNonNumber) throw new Error(ERROR_MESSAGES_INPUT.INCLUDE_STRING);
  }
}

export default WinningNumbersValidators;
