import InputView from '../view/InputView.js';
import OutputView from '../view/OutputView.js';
import ParseWinningNumber from '../utils/parseWinningNumber.js';
import {
  WinningNumbersValidators,
  BonusNumberValidators,
} from '../validators/index.js';

class WinningService {
  async setWinningNumbers(lottoMachine) {
    try {
      const rawInput = await InputView.readWinningNumbers();

      const winningNumbers = this.#makeWinningNumbers(rawInput);
      lottoMachine.applyWinningNumbers(winningNumbers);
      OutputView.changeLine();
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.setWinningNumbers(lottoMachine);
    }
  }

  #makeWinningNumbers(rawInput) {
    const parsedNumbers = ParseWinningNumber.parseWinningNumbers(rawInput);
    WinningNumbersValidators.validateWinningNumbersFormat(parsedNumbers);

    const winningNumbers = parsedNumbers.map(Number);
    WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);

    return winningNumbers;
  }

  async setBonusNumber(lottoMachine) {
    try {
      const bonusNumber = await InputView.readBonusNumber();
      BonusNumberValidators.run(bonusNumber, lottoMachine.winningNumbers);
      lottoMachine.applyBonusNumber(Number(bonusNumber));
      OutputView.changeLine();
    } catch (error) {
      OutputView.printErrorMessage(error.message);
      return await this.setBonusNumber(lottoMachine);
    }
  }
}

export default WinningService;
