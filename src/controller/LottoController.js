import PurchaseService from '../service/PurchaseService.js';
import WinningService from '../service/WinningService.js';
import ResultService from '../service/ResultService.js';

class LottoController {
  #purchaseService;
  #winningService;
  #resultService;

  constructor() {
    this.#purchaseService = new PurchaseService();
    this.#winningService = new WinningService();
    this.#resultService = new ResultService();
  }

  async run() {
    const lottoMachine = await this.#purchaseService.purchaseLottos();

    await this.#winningService.setWinningNumbers(lottoMachine);
    await this.#winningService.setBonusNumber(lottoMachine);

    this.#resultService.printResult(lottoMachine);
  }
}

export default LottoController;
