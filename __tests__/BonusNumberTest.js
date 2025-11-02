import LottoController from '../src/controller/LottoController.js';
import InputView from '../src/view/InputView.js';
import OutputView from '../src/view/OutputView.js';
import LottoMachine from '../src/model/LottoMachine.js';

jest.mock('../src/view/InputView.js');
jest.mock('../src/view/OutputView.js');

describe('LottoController run() - 보너스 번호 저장 검증', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('보너스 번호가 정상적으로 입력되면 LottoMachine.applyBonusNumber가 호출된다.', async () => {
    // given
    InputView.readPurchasePrice.mockResolvedValue('3000');
    InputView.readWinningNumbers.mockResolvedValue('1, 2, 3, 4, 5, 6');
    InputView.readBonusNumber.mockResolvedValue('7');

    // applyBonusNumber가 호출되는지 감시
    const applySpy = jest.spyOn(LottoMachine.prototype, 'applyBonusNumber');

    const controller = new LottoController();

    // when
    await controller.run();

    // then
    expect(applySpy).toHaveBeenCalledTimes(1);
    expect(applySpy).toHaveBeenCalledWith('7');
  });
});
