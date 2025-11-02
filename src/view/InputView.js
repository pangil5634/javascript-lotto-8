import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES } from '../constants/index.js';

class InputView {
  static async readPurchasePrice() {
    return await Console.readLineAsync(IO_MESSAGES.INPUT_PURCHASE_PRICE);
  }

  static async readWinningNumbers() {
    return await Console.readLineAsync(IO_MESSAGES.INPUT_WINNING_NUMBERS);
  }
}

export default InputView;
