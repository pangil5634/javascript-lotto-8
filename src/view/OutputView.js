import { Console } from '@woowacourse/mission-utils';

class OutputView {
  static printErrorMessage(errorMessage) {
    Console.print(errorMessage);
    this.changeLine();
  }

  static changeLine() {
    Console.print('');
  }
}

export default OutputView;
