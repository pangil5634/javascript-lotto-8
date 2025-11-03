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
    await this.#readAndValidatePurchasePrice();

    this.#printTicketsInfo();

    await this.#readAndValidateWinningNumbers();

    await this.#readAndValidateBonusNumber();

    this.#printResult();
  }

  async #readAndValidatePurchasePrice() {
    try {
      const purchasePrice = await InputView.readPurchasePrice();
      PurchasePriceValidators.validatePurchasePrice(purchasePrice);
      this.#lottoMachine = new LottoMachine(purchasePrice);
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
      BonusNumberValidators.run(bonusNumber, this.#lottoMachine.winningNumbers);
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

    // 전체 당첨 내역 출력하기
    const matchCountList = this.#lottoMachine.getDetailMatchResult();
    OutputView.printDetailMatchResult(matchCountList);

    // 수익률 출력하기
    const profitPercentage =
      this.#lottoMachine.calculateProfitPercentage(matchCountList) * 100;
    OutputView.printProfitPercentage(profitPercentage.toFixed(1));
  }
}

export default LottoController;
