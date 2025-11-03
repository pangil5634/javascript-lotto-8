import { Random } from '@woowacourse/mission-utils';
import LottoMachine from '../src/model/LottoMachine.js';

describe('LottoMachine 테스트', () => {
  afterEach(() => {
    // mock을 초기화합니다.
    jest.restoreAllMocks();
  });

  test('생성자: 구입 금액에 따라 올바른 개수의 티켓을 생성한다.', () => {
    // given
    const purchasePrice = 3000;
    const mockNumbers = [
      [1, 2, 3, 4, 5, 6],
      [7, 8, 9, 10, 11, 12],
      [13, 14, 15, 16, 17, 18],
    ];
    Random.pickUniqueNumbersInRange = jest
      .fn()
      .mockReturnValueOnce(mockNumbers[0])
      .mockReturnValueOnce(mockNumbers[1])
      .mockReturnValueOnce(mockNumbers[2]);

    // when
    const lottoMachine = new LottoMachine(purchasePrice);

    // then
    expect(lottoMachine.ticketCount).toBe(3);
    expect(lottoMachine.tickets.length).toBe(3);
    // LottoGenerator가 정렬하므로 정렬된 값으로 확인합니다.
    expect(lottoMachine.tickets[0].numbers).toEqual([1, 2, 3, 4, 5, 6]);
    expect(lottoMachine.tickets[1].numbers).toEqual([7, 8, 9, 10, 11, 12]);
  });

  test('결과 계산: 당첨 통계와 수익률을 올바르게 계산한다.', () => {
    // given
    const purchasePrice = 1000;
    // 5등에 당첨될 티켓을 생성하도록 설정
    const mockTicketNumbers = [1, 2, 3, 10, 11, 12];
    Random.pickUniqueNumbersInRange = jest.fn().mockReturnValue(mockTicketNumbers);

    const lottoMachine = new LottoMachine(purchasePrice);

    const winningNumbers = [1, 2, 3, 20, 21, 22];
    const bonusNumber = 40;

    // when
    lottoMachine.applyWinningNumbers(winningNumbers);
    lottoMachine.applyBonusNumber(bonusNumber);
    lottoMachine.makeAllMatchCounts();
    const summary = lottoMachine.getDetailMatchResult();
    const profit = lottoMachine.calculateProfitPercentage(summary);

    // then
    // 5등(3개 일치) 1개, 나머지 등수는 0개인지 확인
    expect(summary).toEqual({
      FIRST: 0,
      SECOND: 0,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 1,
    });

    // 5등 상금은 5,000원, 구매 금액은 1,000원 이므로 수익률은 500%
    // calculateProfitPercentage는 비율(5.0)을 반환
    expect(profit).toBe(5);
  });

  test('결과 계산: 2등(보너스) 당첨 시 통계와 수익률을 올바르게 계산한다.', () => {
    // given
    const purchasePrice = 1000;
    // 2등에 당첨될 티켓 (5개 일치 + 보너스 번호 일치)
    const mockTicketNumbers = [1, 2, 3, 4, 5, 10];
    Random.pickUniqueNumbersInRange = jest.fn().mockReturnValue(mockTicketNumbers);

    const lottoMachine = new LottoMachine(purchasePrice);

    const winningNumbers = [1, 2, 3, 4, 5, 40]; // 5개 일치
    const bonusNumber = 10; // 보너스 번호 일치

    // when
    lottoMachine.applyWinningNumbers(winningNumbers);
    lottoMachine.applyBonusNumber(bonusNumber);
    lottoMachine.makeAllMatchCounts();
    const summary = lottoMachine.getDetailMatchResult();
    const profit = lottoMachine.calculateProfitPercentage(summary);

    // then
    // 2등 1개, 나머지 0개
    expect(summary).toEqual({
      FIRST: 0,
      SECOND: 1,
      THIRD: 0,
      FOURTH: 0,
      FIFTH: 0,
    });

    // 2등 상금은 30,000,000원. 수익률은 3000000%
    expect(profit).toBe(30000);
  });
});
