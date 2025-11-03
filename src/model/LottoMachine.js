import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';

const LOTTO = {
  PRICE_PER_TICKET: 1000,
  MIN_NUMBER: 1,
  MAX_NUMBER: 45,
  NUMBER_COUNT: 6,
};

const PRIZE_TABLE = {
  three: 5000,
  four: 50000,
  five_1: 1500000,
  five_2: 30000000,
  six: 2000000000,
};

class LottoMachine {
  #purchasePrice;
  #ticketCount;
  #tickets = [];
  #winningNumbers = [];
  #bonusNumber;
  #matchList = [];

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

  get ticketCount() {
    return this.#ticketCount;
  }

  get tickets() {
    return [...this.#tickets];
  }

  get winningNumbers() {
    return [...this.#winningNumbers];
  }

  applyWinningNumbers(winningNumbers) {
    this.#winningNumbers = [...winningNumbers];
  }

  get bonusNumber() {
    return this.#bonusNumber;
  }

  applyBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

  getAllMatchCounts() {
    for (let index = 0; index < this.#ticketCount; index++) {
      const matchResult = this.#getMatchCount(this.#tickets[index].numbers);
      this.#matchList.push(matchResult);
    }
  }
  #getMatchCount(ticket) {
    const matchCountWinningNumbers = this.#getMatchCountWinningNumbers(ticket);
    const matchCountBonusNumber = this.#getMatchCountBonusNumber(ticket);
    const matchResult = {
      matchCountWinningNumbers: matchCountWinningNumbers,
      matchCountBonusNumber: matchCountBonusNumber,
      matchTotal: matchCountWinningNumbers + matchCountBonusNumber,
    };
    return matchResult;
  }

  #getMatchCountWinningNumbers(ticket) {
    const matchCountWinningNumbers = ticket.reduce(
      (total, number) =>
        (total += this.#isMatchNumber(number, this.#winningNumbers)),
      0,
    );
    return matchCountWinningNumbers;
  }
  #getMatchCountBonusNumber(ticket) {
    const matchCountBonusNumber = this.#isMatchNumber(
      this.#bonusNumber,
      ticket,
    );
    return matchCountBonusNumber;
  }

  #isMatchNumber(number, comparsionArray) {
    if (comparsionArray.includes(number)) return 1;

    return 0;
  }

  get matchList() {
    return [...this.#matchList];
  }
}

export default LottoMachine;
