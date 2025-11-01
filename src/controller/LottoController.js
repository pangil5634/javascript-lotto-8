import InputValidators from '../validators/InputValidators.js';
import InputView from '../view/InputView.js';

class LottoController {
  async run() {
    await this.readPurchasePrice();
  }

  async readPurchasePrice() {
    const purchasePrice = await InputView.readPurchasePrice();
    InputValidators.validatePurchasePrice(purchasePrice);

    return purchasePrice;
  }
}

export default LottoController;
