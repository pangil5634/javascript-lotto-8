import LottoMachine from '../model/LottoMachine.js';
import InputValidators from '../validators/InputValidators.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';

class LottoController {
  #lottoMachine;

  async run() {
    const purchasePrice = await this.readPurchasePrice();

    this.#lottoMachine = new LottoMachine(purchasePrice);

    this.#printTicketsInfo();
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

  #printTicketsInfo() {
    this.#printTicketCount();
    this.#printTicketsNumbers();
  }

  #printTicketCount() {
    const ticketCount = this.#lottoMachine.ticketCount;
    OutputView.printTicketCount(ticketCount);
  }

  #printTicketsNumbers() {
    const tickets = this.#lottoMachine.tickets;
    OutputView.printTicketsNumbers(tickets);
  }
}

export default LottoController;
