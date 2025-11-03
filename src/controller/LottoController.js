import LottoMachine from '../model/LottoMachine.js';
import ParseWinningNumber from '../utils/parseWinningNumber.js';
import {
  BonusNumberValidators,
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

    await this.#readAndValidateWinningNumbers();

    await this.#readAndValidateBonusNumber();

    this.#printResult();
  }

  async #readAndValidatePurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      PurchasePriceValidators.validatePurchasePrice(purchasePrice);
      return purchasePrice;
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.#readAndValidatePurchasePrice();
    }
  }

  #printTicketsInfo() {
    this.#printTicketCount();
    this.#printTicketsNumbers();
    OutputView.changeLine();
  }

  #printTicketCount() {
    const ticketCount = this.#lottoMachine.ticketCount;
    OutputView.printTicketCount(ticketCount);
  }

  #printTicketsNumbers() {
    const tickets = this.#lottoMachine.tickets;
    OutputView.printTicketsNumbers(tickets);
  }

  async #readAndValidateWinningNumbers() {
    try {
      const winningNumbersString = await InputView.readWinningNumbers();

      const parseWinningNumbers = this.#parseAndValidate(winningNumbersString);

      const winningNumbers = this.#castingAndValidate(parseWinningNumbers);

      this.#lottoMachine.applyWinningNumbers(winningNumbers);
      OutputView.changeLine();
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.#readAndValidateWinningNumbers();
    }
  }

  #parseAndValidate(winningNumbersString) {
    const parseWinningNumbers =
      ParseWinningNumber.parseWinningNumbers(winningNumbersString);

    WinningNumbersValidators.validateWinningNumbersFormat(parseWinningNumbers);

    return parseWinningNumbers;
  }

  #castingAndValidate(parseWinningNumbers) {
    const winningNumbers = parseWinningNumbers.map(Number);

    WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);
    return winningNumbers;
  }

  async #readAndValidateBonusNumber() {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      BonusNumberValidators.run(bonusNumber);
      this.#lottoMachine.applyBonusNumber(Number(bonusNumber));
      OutputView.changeLine();
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.#readAndValidateBonusNumber();
    }
  }

  #printResult() {
    OutputView.printResultHeader();
    this.#printMatchInto();
  }

  #printMatchInto() {
    // 로또 별 당첨 내역 판정하기
    this.#lottoMachine.getAllMatchCounts();
  }
}

export default LottoController;
