const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES_INPUT = {
  EMPTY_PURCHASE_PRICE: `${ERROR_PREFIX} The Purchase Price is empty`,
  IS_NOT_NUMBER: `${ERROR_PREFIX} The input is not a number`,
  INVALID_LEAST_RAGE: `${ERROR_PREFIX} The input sholud be higher than 1,000`,
  INVALID_NUMBER_DIVIDE: `${ERROR_PREFIX} The input should divide by 1,000`,

  LESS_WINNING_NUMBERS: `${ERROR_PREFIX} The Winning Numbers should be numbers of six `,
  INVALID_USING_COMMA: `${ERROR_PREFIX} The Comma should exit between number and number `,
  INCLUDE_STRING: `${ERROR_PREFIX} The Winning Numbers should include only numbers`,
  INVALID_NUMBER_RANGE: `${ERROR_PREFIX} The number is outside the range of 1 to 45.`,
  EXIST_DUPLICATE_NUMBERS: `${ERROR_PREFIX} There are duplicated numbers`,
};
