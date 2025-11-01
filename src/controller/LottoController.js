import InputValidators from '../validators/InputValidators.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  async run() {
    const purchasePrice = await this.readPurchasePrice();
  }

  async readPurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      InputValidators.validatePurchasePrice(purchasePrice);
      return purchasePrice;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.readPurchasePrice();
    }
  }
}

export default LottoController;
