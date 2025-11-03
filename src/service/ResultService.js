import OutputView from '../view/OutputView.js';

class ResultService {
  printResult(lottoMachine) {
    OutputView.printResultHeader();

    lottoMachine.makeAllMatchCounts();
    const matchCountList = lottoMachine.getDetailMatchResult();
    OutputView.printDetailMatchResult(matchCountList);

    const profitPercentage =
      lottoMachine.calculateProfitPercentage(matchCountList) * 100;
    OutputView.printProfitPercentage(profitPercentage.toFixed(1));
  }
}

export default ResultService;
