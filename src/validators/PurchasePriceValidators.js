import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class PurchasePriceValidators {
  static validatePurchasePrice(purchasePrice) {
    this.#isEmpty(purchasePrice);
    this.#isNotNumber(purchasePrice);
    this.#isZero(purchasePrice);
    this.#isDivisible(purchasePrice);
  }

  static #isEmpty(purchasePrice) {
    if (purchasePrice === '') {
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_INPUT);
    }
  }

  static #isNotNumber(purchasePrice) {
    if (isNaN(purchasePrice)) {
      throw new Error(ERROR_MESSAGES_INPUT.NOT_A_NUMBER);
    }
  }

  static #isZero(purchasePrice) {
    if (purchasePrice < 1000) {
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_MINIMUM_PRICE);
    }
  }

  static #isDivisible(purchasePrice) {
    if (purchasePrice % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES_INPUT.NOT_DIVISIBLE_BY_UNIT);
    }
  }
}

export default PurchasePriceValidators;
