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
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_PURCHASE_PRICE);
    }
  }

  static #isNotNumber(purchasePrice) {
    if (isNaN(purchasePrice)) {
      throw new Error(ERROR_MESSAGES_INPUT.IS_NOT_NUMBER);
    }
  }

  static #isZero(purchasePrice) {
    if (purchasePrice < 1000) {
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_LEAST_RAGE);
    }
  }

  static #isDivisible(purchasePrice) {
    if (purchasePrice % 1000 !== 0) {
      throw new Error(ERROR_MESSAGES_INPUT.INVALID_NUMBER_DIVIDE);
    }
  }
}

export default PurchasePriceValidators;
