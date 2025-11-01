import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class InputValidators {
  static validatePurchasePrice(purchasePrice) {
    this.#isEmpty(purchasePrice);
    this.#isNotNumber(purchasePrice);
    this.#isDivisible(purchasePrice);
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

  static #isDivisible(purchasePrice) {
    if (purchasePrice % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_NUMBER_DIVIDE);
    }
  }
}

export default InputValidators;
