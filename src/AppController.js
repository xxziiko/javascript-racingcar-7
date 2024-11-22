import { Validator, MESSEAGES } from './shared/index.js';
import { ViewIn } from './Views/index.js';
import Car from './models/Car.js';

class AppController {
  #carNames;

  constructor() {
    this.carNames = [];
  }

  async getCarNames() {
    const carNames = await ViewIn.getInput(MESSEAGES.inputCarNames);
    this.#validateCarName(carNames);

    return carNames;
  }

  async getAttempts() {
    const attempts = await ViewIn.getInput(MESSEAGES.inputAttempts);
    this.#validateAttempts(attempts);

    return attempts;
  }

  #validateCarName(value) {
    Validator.validateEmptyString(value);
    Validator.validateDelimiter(value);
  }

  #validateAttempts(value) {
    Validator.validateAttempts(value);
    Validator.validateAttemptsFormat(value);
  }
}

export default AppController;
