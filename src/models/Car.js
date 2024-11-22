import { MissionUtils } from '@woowacourse/mission-utils';
import { Validator, formatCarResult } from '../shared/index.js';

class Car {
  #name;
  #position;

  static MIN_MOVE_NUMBER = 4;

  constructor(name) {
    Validator.validateCarNameLength(name);
    this.#name = name;
    this.position = 0;
  }

  get position() {
    return this.position;
  }

  get name() {
    return this.#name;
  }

}

export default Car;
