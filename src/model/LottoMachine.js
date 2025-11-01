import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

const LOTTO = {
  PRICE_PER_TICKET: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
};

class LottoMachine {
  #purchasePrice;
  #ticketCount;
  #tickets = [];

  constructor(purchasePrice) {
    this.#purchasePrice = purchasePrice;
    this.#ticketCount = purchasePrice / LOTTO.PRICE_PER_TICKET;

    this.#createLottoTickets();
  }

  #createLottoTickets() {
    for (let _ = 1; _ <= this.#ticketCount; _++) {
      this.#createLottoTicket();
    }
  }

  #createLottoTicket() {
    const numbers = this.#getUniqueNumbersOfSix();
    const sortedNumbers = this.#sortNumbers(numbers);
    this.#tickets.push(new Lotto(sortedNumbers));
  }
  #getUniqueNumbersOfSix() {
    return Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.NUMBER_COUNT,
    );
  }

  #sortNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }
}

export default LottoMachine;
