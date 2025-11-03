import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES } from '../constants/index.js';

class OutputView {
  static printErrorMessage(errorMessage) {
    Console.print(errorMessage);
    this.changeLine();
  }

  static changeLine() {
    Console.print('');
  }

  static printTicketCount(ticketCount) {
    this.changeLine();
    Console.print(ticketCount + IO_MESSAGES.OUTPUT_TICKETS_NUMBERS);
  }

  static printTicketsNumbers(tickets) {
    tickets.forEach((ticket) => this.#printTicket(ticket.numbers));
  }

  static #printTicket(ticket) {
    Console.print(`[${ticket.join(', ')}]`);
  }

  static printResultHeader() {
    Console.print(IO_MESSAGES.OUTPUT_RESULT_HEADER);
  }

  static printDetailMatchResult(matchCountList) {
    const resultMessages = {
      FIFTH: '3개 일치 (5,000원)',
      FOURTH: '4개 일치 (50,000원)',
      THIRD: '5개 일치 (1,500,000원)',
      SECOND: '5개 일치, 보너스 볼 일치 (30,000,000원)',
      FIRST: '6개 일치 (2,000,000,000원)',
    };

    for (const rank in resultMessages) {
      const count = matchCountList[rank] || 0;
      Console.print(`${resultMessages[rank]} - ${count}개`);
    }
  }

  static printProfitPercentage(profitPercentage) {
    Console.print(`총 수익률은 ${profitPercentage}%입니다.`);
  }
}

export default OutputView;
