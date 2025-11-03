import { Console } from '@woowacourse/mission-utils';
import { IO_MESSAGES, RESULT_MESSAGES } from '../constants/index.js';

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
    for (const rank in RESULT_MESSAGES) {
      const count = matchCountList[rank] || 0;
      Console.print(`${RESULT_MESSAGES[rank]} - ${count}개`);
    }
  }

  static printProfitPercentage(profitPercentage) {
    Console.print(`총 수익률은 ${profitPercentage}%입니다.`);
  }
}

export default OutputView;
