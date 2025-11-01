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
}

export default OutputView;
