class ParseWinningNumber {
  static parseWinningNumbers(winningNumbersString) {
    return winningNumbersString.split(',').map((num) => num.trim());
  }
}

export default ParseWinningNumber;
