import LottoMachine from '../model/LottoMachine.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import { PurchasePriceValidators } from '../validators/index.js';

class PurchaseService {
  async purchaseLottos() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      PurchasePriceValidators.validatePurchasePrice(purchasePrice);

      const lottoMachine = new LottoMachine(purchasePrice);

      OutputView.printTicketCount(lottoMachine.ticketCount);
      OutputView.printTicketsNumbers(lottoMachine.tickets);
      OutputView.changeLine();

      return lottoMachine;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.purchaseLottos();
    }
  }
}

export default PurchaseService;
