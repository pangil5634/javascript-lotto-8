import InputView from '../view/InputView.js';

class LottoController {
  async run() {
    const purchasePrice = await InputView.readPurchasePrice();
  }
}

export default LottoController;
