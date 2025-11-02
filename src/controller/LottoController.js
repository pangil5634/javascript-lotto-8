import LottoMachine from '../model/LottoMachine.js';
import ParseWinningNumber from '../utils/parseWinningNumber.js';
import {
  PurchasePriceValidators,
  WinningNumbersValidators,
} from '../validators/index.js';
import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
class LottoController {
  #lottoMachine;

  async run() {
    const purchasePrice = await this.#readAndValidatePurchasePrice();

    this.#lottoMachine = new LottoMachine(purchasePrice);

    this.#printTicketsInfo();

    const winningNumbers = await this.#readAndValidateWinningNumbers();
  }

  async #readAndValidatePurchasePrice() {
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

  async #readAndValidateWinningNumbers() {
    try {
      const winningNumbersString = await InputView.readWinningNumbers();

      const parseWinningNumbers = this.#parseAndValidate(winningNumbersString);
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.readWinningNumbers();
    }
  }

  #parseAndValidate(winningNumbersString) {
    const parseWinningNumbers =
      ParseWinningNumber.parseWinningNumbers(winningNumbersString);

    WinningNumbersValidators.validateWinningNumbersFormat(parseWinningNumbers);

    return parseWinningNumbers;
  }
}

export default LottoController;
