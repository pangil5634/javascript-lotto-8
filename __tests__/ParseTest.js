import LottoController from "../src/controller/LottoController";

describe("당첨 번호 입력 검증 테스트 - 정상", () => {
  test('공백 있는 경우', () => {
    const machine = new LottoController
    const input = '1, 2, 3, 4, 5, 6';
    const result = machine.parseWinningNumbers(input);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('공백 없는 경우', () => {
    const machine = new LottoController
    const input = '1,2,3,4,5,6';
    const result = machine.parseWinningNumbers(input);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('공백이 많은 경우', () => {
    const machine = new LottoController
    const input = '    1  , 2 , 3   , 4   , 5    , 6    ';
    const result = machine.parseWinningNumbers(input);
    expect(result).toEqual([1, 2, 3, 4, 5, 6]);
  });
});

