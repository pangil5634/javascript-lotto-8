import { ERROR_MESSAGES_INPUT } from "../src/constants";
import LottoController from "../src/controller/LottoController";
import ParseWinningNumber from "../src/utils/parseWinningNumber";
import { WinningNumbersValidators } from "../src/validators";

describe("당첨 번호 입력 검증 테스트 - 에러 (캐스팅 전)", () => {
  test('공백인 경우', () => {
    const machine = new LottoController();
    const input = '';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.LESS_WINNING_NUMBERS);
  });

  test('6개 미만인 경우', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.LESS_WINNING_NUMBERS);
  });

  test('6개 초과인 경우 (2)', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5, 6, 7';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.LESS_WINNING_NUMBERS);
  });


  test('쉼표 사이 숫자가 없는 경우 (1)', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5,';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.INVALID_USING_COMMA);
  });

  test('쉼표 사이 숫자가 없는 경우 (2)', () => {
    const machine = new LottoController();
    const input = '1, ,3, 4, 5, 6';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.INVALID_USING_COMMA);
  });

  test('숫자가 아닌 것을 입력한 경우)', () => {
    const machine = new LottoController();
    const input = '1, a, 3, 4, 5, 6';
    const parsingResult = ParseWinningNumber.parseWinningNumbers(input);

    expect(() => {
      WinningNumbersValidators.validateWinningNumbersFormat(parsingResult);
    }).toThrow(ERROR_MESSAGES_INPUT.INCLUDE_STRING);
  });

});

describe("당첨 번호 입력 검증 테스트 - 에러 (캐스팅 후)", () => {
  test('1~45 범위 이외의 숫자가 존재하는 경우', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5, 100';
    const parseWinningNumbers = ParseWinningNumber.parseWinningNumbers(input);
    const winningNumbers = parseWinningNumbers.map(Number);

    expect(() => {
      WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);
    }).toThrow(ERROR_MESSAGES_INPUT.INVALID_NUMBER_RANGE);
  });

  test('중복되는 숫자가 존재하는 경우', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5, 5';
    const parseWinningNumbers = ParseWinningNumber.parseWinningNumbers(input);
    const winningNumbers = parseWinningNumbers.map(Number);

    expect(() => {
      WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);
    }).toThrow(ERROR_MESSAGES_INPUT.EXIST_DUPLICATE_NUMBERS);
  });
});



describe("당첨 번호 입력 검증 테스트 - 정상", () => {
  test('공백 있는 경우', () => {
    const machine = new LottoController();
    const input = '1, 2, 3, 4, 5, 6';
    const parseWinningNumbers = ParseWinningNumber.parseWinningNumbers(input);
    WinningNumbersValidators.validateWinningNumbersFormat(parseWinningNumbers);
    const winningNumbers = parseWinningNumbers.map(Number);
    WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);

    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('공백 없는 경우', () => {
    const machine = new LottoController();
    const input = '1,2,3,4,5,6';
    const parseWinningNumbers = ParseWinningNumber.parseWinningNumbers(input);
    WinningNumbersValidators.validateWinningNumbersFormat(parseWinningNumbers);
    const winningNumbers = parseWinningNumbers.map(Number);
    WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);

    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });

  test('공백이 많은 경우', () => {
    const machine = new LottoController();
    const input = '    1  , 2 , 3   , 4   , 5    , 6    ';
    const parseWinningNumbers = ParseWinningNumber.parseWinningNumbers(input);
    WinningNumbersValidators.validateWinningNumbersFormat(parseWinningNumbers);
    const winningNumbers = parseWinningNumbers.map(Number);
    WinningNumbersValidators.validateParsedWinningNumbers(winningNumbers);

    expect(winningNumbers).toEqual([1, 2, 3, 4, 5, 6]);
  });
});