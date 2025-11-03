const ERROR_PREFIX = '[ERROR]';

export const ERROR_MESSAGES_INPUT = {
  EMPTY_INPUT: `${ERROR_PREFIX} Input cannot be empty.`,

  NOT_A_NUMBER: `${ERROR_PREFIX} Input must be a valid number.`,

  INVALID_MINIMUM_PRICE: `${ERROR_PREFIX} Purchase amount must be at least 1,000.`,

  NOT_DIVISIBLE_BY_UNIT: `${ERROR_PREFIX} Purchase amount must be a multiple of 1,000.`,

  INSUFFICIENT_WINNING_NUMBERS: `${ERROR_PREFIX} Winning numbers must contain exactly six numbers.`,

  INVALID_COMMA_FORMAT: `${ERROR_PREFIX} Each number should be separated by a single comma.`,

  CONTAINS_NON_NUMERIC: `${ERROR_PREFIX} Winning numbers can only contain numeric values.`,

  NUMBER_OUT_OF_RANGE: `${ERROR_PREFIX} Numbers must be between 1 and 45.`,

  DUPLICATE_NUMBERS_FOUND: `${ERROR_PREFIX} Winning numbers must not contain duplicates.`,
};
