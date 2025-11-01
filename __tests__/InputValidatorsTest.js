import { ERROR_MESSAGES_INPUT } from "../src/constants/Error_Messages.js";
import InputValidators from "../src/validators/InputValidators.js";

describe("로또 구입 금액 검증 테스트", () => {
  test("정상적으로 입력한 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("8000")).not.toThrow();
  });

  test("값을 입력하지 않은 경우", () => {
    expect(() => InputValidators.validatePurchasePrice("")).toThrow(ERROR_MESSAGES_INPUT.EMPTY_PURCHASE_PRICE);
  });
});
