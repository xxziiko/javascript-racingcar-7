import { MissionUtils } from '@woowacourse/mission-utils';
import { Validator, formatCarResult } from '../shared/index.js';

class Car {
  #name;
  #position;

  static MIN_MOVE_NUMBER = 4;

  constructor(name) {
    Validator.validateCarNameLength(name);
    this.#name = name;
    this.#position = 0;
  }

  get position() {
    return this.#position;
  }

  get name() {
    return this.#name;
  }

  move() {
    const randomNumber = MissionUtils.Random.pickNumberInRange(0, 9);
    if (randomNumber >= Car.MIN_MOVE_NUMBER) this.#position += 1;
  }

  getResult() {
    return formatCarResult(this.#name, this.#position);
  }
}

export default Car;
