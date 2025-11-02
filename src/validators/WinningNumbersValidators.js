import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class WinningNumbersValidators {
  static validateWinningNumbers(winningNumbers) {
    this.#isEmpty(winningNumbers);
  }

  static #isEmpty(winningNumbers) {
    if (winningNumbers === '') {
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_WINNING_NUMBERS);
    }
  }
}

export default WinningNumbersValidators;
