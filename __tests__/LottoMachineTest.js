// __tests__/LottoMachine.test.js
import LottoMachine from '../src/model/LottoMachine.js';
import Lotto from '../src/model/Lotto.js';

jest.mock('../src/model/Lotto.js');

describe('LottoMachine', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('입력한 금액에 따라 티켓 개수가 올바르게 계산된다.', () => {
    // given
    const mockRandom = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6]);

    // when
    const machine = new LottoMachine(3000);
    
    // then
    expect(machine.ticketCount).toBe(3);
  });

  test('티켓 수만큼 Lotto 인스턴스를 생성한다.', () => {
    // given
    const mockRandom = jest.fn().mockReturnValue([1, 2, 3, 4, 5, 6]);

    // when
    new LottoMachine(5000);

    // then
    expect(Lotto).toHaveBeenCalledTimes(5);
  });

  test('생성된 Lotto 인스턴스에 오름차순으로 정렬된 번호를 전달한다.', () => {
    // given
    const mockNumbers = [6, 1, 5, 3, 2, 4];
    jest.spyOn(global.Math, 'random').mockReturnValue(0.5); 
    const mockRandom = jest.fn().mockReturnValue(mockNumbers);
    Lotto.mockImplementation((numbers) => ({ numbers }));

    // when
    const machine = new LottoMachine(1000);
    const tickets = machine.tickets;

    // then
    expect(tickets[0].numbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('티켓 배열을 반환할 때 원본 배열을 직접 수정할 수 없다.', () => {
    // given
    const machine = new LottoMachine(2000);
    const tickets = machine.tickets;

    // when
    tickets.length = 0; 

    // then
    expect(machine.tickets.length).toBe(2); 
  });
});

describe('applyWinningNumbers', () => {
  test('검증된 winningNumbers를 LottoMachine 내부에 저장한다.', () => {
    const machine = new LottoMachine(3000);
    const validatedWinningNumbers = [1, 2, 3, 4, 5, 6];

    machine.applyWinningNumbers(validatedWinningNumbers);

    expect(machine.winningNumbers).toEqual(validatedWinningNumbers);
  });

  test('winningNumbers는 깊은 복사로 저장되어 외부 배열 변경에 영향을 받지 않는다.', () => {
    const machine = new LottoMachine(1000);
    const validatedWinningNumbers = [1, 2, 3, 4, 5, 6];

    machine.applyWinningNumbers(validatedWinningNumbers);
    validatedWinningNumbers[0] = 99; // 외부 배열 조작

    expect(machine.winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

describe('getMatchCount', () => {t
  est('배열을 넣으면, 매칭 카운트를 구한다. ', () => {
    // given
    const machine = new LottoMachine(2000);
    machine.applyWinningNumbers([1, 2, 3, 4, 5, 6]);

    // then
    expect(machine.tickets.length).toBe(2); 
  });
});