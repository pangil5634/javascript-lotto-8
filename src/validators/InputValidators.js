import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class InputValidators {
  static validatePurchasePrice(purchasePrice) {
    InputValidators.#isEmpty(purchasePrice);
    InputValidators.#isNotNumber(purchasePrice);
  }

  static #isEmpty(purchasePrice) {
    if (purchasePrice === '') {
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_PURCHASE_PRICE);
    }
  }

  static #isNotNumber(purchasePrice) {
    if (isNaN(purchasePrice)) {
      throw new Error(ERROR_MESSAGES_INPUT.IS_NOT_NUMBER);
    }
  }
}

export default InputValidators;
