import { Random } from '@woowacourse/mission-utils';
import Lotto from './Lotto.js';
import { LOTTO, RANKS } from '../constants/index.js';

class LottoGenerator {
  static createTickets(ticketCount) {
    return Array.from({ length: ticketCount }, () => {
      const numbers = this.#generateNumbers();
      return new Lotto(this.#sortNumbers(numbers));
    });
  }

  static #generateNumbers() {
    return Random.pickUniqueNumbersInRange(
      LOTTO.MIN_NUMBER,
      LOTTO.MAX_NUMBER,
      LOTTO.NUMBER_COUNT,
    );
  }

  static #sortNumbers(numbers) {
    return numbers.sort((a, b) => a - b);
  }
}

class LottoMatcher {
  static getMatchList(tickets, winningNumbers, bonusNumber) {
    return tickets.map((ticket) =>
      this.#getMatchCount(ticket.numbers, winningNumbers, bonusNumber),
    );
  }

  static #getMatchCount(ticket, winningNumbers, bonusNumber) {
    const matchCountWinningNumbers = this.#countMatches(ticket, winningNumbers);
    const matchCountBonusNumber = ticket.includes(bonusNumber) ? 1 : 0;
    return { matchCountWinningNumbers, matchCountBonusNumber };
  }

  static #countMatches(ticket, winningNumbers) {
    return ticket.reduce(
      (count, number) => count + (winningNumbers.includes(number) ? 1 : 0),
      0,
    );
  }
}

class LottoStatistics {
  static summarize(matchList) {
    const result = Object.keys(RANKS).reduce(
      (acc, rank) => ({ ...acc, [rank]: 0 }),
      {},
    );
    return matchList.reduce((acc, match) => {
      const rank = this.#getRank(match);
      if (rank) acc[rank]++;
      return acc;
    }, result);
  }

  static #getRank({ matchCountWinningNumbers, matchCountBonusNumber }) {
    for (const rank in RANKS) {
      const { matchCount, needsBonus } = RANKS[rank];
      if (matchCountWinningNumbers !== matchCount) continue;
      if (needsBonus && !matchCountBonusNumber) continue;
      return rank;
    }
  }

  static calculateProfit(matchSummary, purchasePrice) {
    const totalPrize = Object.entries(matchSummary).reduce(
      (sum, [rank, count]) => sum + RANKS[rank].prize * count,
      0,
    );
    return totalPrize / purchasePrice;
  }
}

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
    this.#tickets = LottoGenerator.createTickets(this.#ticketCount);
  }

  applyWinningNumbers(winningNumbers) {
    this.#winningNumbers = [...winningNumbers];
  }

  applyBonusNumber(bonusNumber) {
    this.#bonusNumber = bonusNumber;
  }

  makeAllMatchCounts() {
    this.#matchList = LottoMatcher.getMatchList(
      this.#tickets,
      this.#winningNumbers,
      this.#bonusNumber,
    );
  }

  getDetailMatchResult() {
    return LottoStatistics.summarize(this.#matchList);
  }

  calculateProfitPercentage(matchCountList) {
    return LottoStatistics.calculateProfit(matchCountList, this.#purchasePrice);
  }

  // Getter
  get ticketCount() {
    return this.#ticketCount;
  }

  get tickets() {
    return [...this.#tickets];
  }

  get winningNumbers() {
    return [...this.#winningNumbers];
  }
}

export default LottoMachine;
