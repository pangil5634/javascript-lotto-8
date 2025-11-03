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
  #profitPercentage;

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

  getDetailMatchResult() {
    let matchCountList = {
      three: 0,
      four: 0,
      five_1: 0,
      five_2: 0,
      six: 0,
    };
    this.#matchList.forEach((match) => {
      if (match.matchTotal === 3) {
        matchCountList['three'] += 1;
      }
      if (match.matchTotal === 4) {
        matchCountList['four'] += 1;
      }
      if (match.matchTotal === 5) {
        matchCountList['five_1'] += 1;
      }
      if (match.matchTotal === 6 && match.matchCountWinningNumbers === 5) {
        matchCountList['five_2'] += 1;
      }
      if (match.matchTotal === 6 && match.matchCountWinningNumbers === 6) {
        matchCountList['six'] += 1;
      }
    });
    return matchCountList;
  }

  getProfitPercentage(matchCountList) {
    return this.#calculateTotalPrice(matchCountList) / this.#purchasePrice;
  }

  #calculateTotalPrice(matchCountList) {
    return Object.entries(matchCountList).reduce((total, [key, count]) => {
      const prize = PRIZE_TABLE[key];
      return total + prize * count;
    }, 0);
  }
}

export default LottoMachine;
