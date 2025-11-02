import LottoMachine from '../model/LottoMachine.js';
import {
  PurchasePriceValidators,
  WinningNumbersValidators,
} from '../validators/index.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
class LottoController {
  #lottoMachine;

  async run() {
    const purchasePrice = await this.readPurchasePrice();

    this.#lottoMachine = new LottoMachine(purchasePrice);

    this.#printTicketsInfo();

    const winningNumbers = await this.readWinningNumbers();
  }

  async readPurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      PurchasePriceValidators.validatePurchasePrice(purchasePrice);
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
    OutputView.changeLine();
  }

  async readWinningNumbers() {
    try {
      const winningNumbersString = await InputView.readWinningNumbers();
      const winningNumbers = this.parseWinningNumbers(winningNumbersString);
      WinningNumbersValidators.validateWinningNumbers(winningNumbers);
      return winningNumbers;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.readWinningNumbers();
    }
  }

  parseWinningNumbers(winningNumbersString) {
    if (!winningNumbersString) return [];

    return winningNumbersString.split(',').map((num) => Number(num.trim()));
  }
}

export default LottoController;
