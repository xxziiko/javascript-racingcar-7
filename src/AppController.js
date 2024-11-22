import { Validator, MESSEAGES, CAR_NAME_DELIMITER } from './shared/index.js';
import { ViewIn, ViewOut } from './Views/index.js';
import Car from './models/Car.js';

class AppController {
  #cars;

  constructor() {
    this.cars = [];
  }

  async process() {
    const carNames = await this.#getCarNames();
    const attempts = await this.#getAttempts();
    this.#cars = this.#parseCarNames(carNames);

    this.#processAttempts(attempts);
  }

  #processCarMove() {
    this.#cars.forEach((car) => {
      car.move();
      ViewOut.printResult(car.getResult());
    });
  }

  #processAttempts(attempts) {
    ViewOut.printResult(MESSEAGES.printResult);

    Array.from({ length: attempts }).forEach(() => {
      this.#processCarMove();

      ViewOut.printResult('\n');
    });
  }

  #parseCarNames(carNames) {
    return carNames.split(CAR_NAME_DELIMITER).map((name) => new Car(name.trim()));
  }


  async #getCarNames() {
    const carNames = await ViewIn.getInput(MESSEAGES.inputCarNames);
    this.#validateCarName(carNames);

    return carNames;
  }

  async #getAttempts() {
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
