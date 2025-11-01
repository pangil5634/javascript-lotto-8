import { ERROR_MESSAGES_INPUT } from '../constants/index.js';

class InputValidators {
  static validatePurchasePrice(purchasePrice) {
    InputValidators.#isEmpty(purchasePrice);
  }

  static #isEmpty(purchasePrice) {
    if (purchasePrice === '') {
      throw new Error(ERROR_MESSAGES_INPUT.EMPTY_PURCHASE_PRICE);
    }
  }
}

export default InputValidators;
