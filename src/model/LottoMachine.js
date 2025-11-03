import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { LOTTO, RANKS } from '../constants/index.js';
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
    const initialResult = Object.keys(RANKS).reduce((acc, rank) => {
      acc[rank] = 0;
      return acc;
    }, {});

    return this.#matchList.reduce((acc, match) => {
      const rank = this.#getRank(match);
      if (rank) {
        acc[rank] += 1;
      }
      return acc;
    }, initialResult);
  }

  #getRank(match) {
    const { matchCountWinningNumbers, matchCountBonusNumber } = match;

    for (const rank in RANKS) {
      const { matchCount, needsBonus } = RANKS[rank];
      if (matchCountWinningNumbers === matchCount) {
        if (needsBonus) {
          if (matchCountBonusNumber) return rank;
          continue;
        }
        return rank;
      }
    }
  }

  getProfitPercentage(matchCountList) {
    return this.#calculateTotalPrice(matchCountList) / this.#purchasePrice;
  }

  #calculateTotalPrice(matchCountList) {
    return Object.entries(matchCountList).reduce((total, [rank, count]) => {
      if (count > 0) {
        const prize = RANKS[rank].prize;
        return total + prize * count;
      }
      return total;
    }, 0);
  }
}

export default LottoMachine;
