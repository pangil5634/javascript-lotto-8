import LottoController from './controller/LottoController.js';

class App {
  async run() {
    const lottoController = new LottoController();

    lottoController.run();
  }
}

export default App;
