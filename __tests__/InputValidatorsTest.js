import { ERROR_MESSAGES_INPUT } from "../src/constants/Error_Messages.js";
import InputValidators from "../src/validators/InputValidators.js";

describe("로또 구입 금액 검증 테스트", () => {
  test("정상적으로 입력한 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("8000")).not.toThrow();
  });

  test("값을 입력하지 않은 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("")).toThrow(ERROR_MESSAGES_INPUT.IS_EMPTY);
  });

  test("숫자가 아닌 값을 입력한 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("1s")).toThrow(ERROR_MESSAGES_INPUT.IS_NOT_NUMBER);
  });
    test("1000으로 나눌 수 없는 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("1500")).toThrow(ERROR_MESSAGES_INPUT.INVALID_NUMBER_DIVIDE);
  });
});
