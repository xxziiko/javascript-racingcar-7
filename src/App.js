import { MESSAGES } from "./constants.js";
import {
  checkValidDelimiter,
  checkEmpty,
  checkValidLength,
  readInput,
  checkValidNumber,
} from "./utils.js";

class App {
  constructor(delimiter = ",", maxNameLength = 5) {
    this.delimiter = delimiter;
    this.maxNameLength = maxNameLength;
  }

  validateCarNames(inputs) {
    checkEmpty(inputs, MESSAGES.ERROR_EMPTY_NAMES);
    checkValidDelimiter(
      inputs,
      this.delimiter,
      MESSAGES.ERROR_INVALID_DELIMITER
    );
    checkValidLength(
      inputs,
      this.maxNameLength,
      MESSAGES.ERROR_INVALID_NAME_LENGTH
    );

    return inputs;
  }

  validateCount(count) {
    checkEmpty(count, MESSAGES.ERROR_EMPTY_NAMES);
    checkValidNumber(count);

    return count;
  }

  async getCarNames() {
    const inputs = await readInput(MESSAGES.PROMPT_CAR_NAMES);

    return this.validateCarNames(inputs).split(this.delimiter);
  }

  async getCount() {
    const count = await readInput(MESSAGES.PROMPT_ATTEMPT_COUNT);

    return this.validateCount(count, MESSAGES.ERROR_INVALID_NUMBER);
  }

  async run() {
    const carNames = await this.getCarNames();
    const count = await this.getCount();
  }
}

export default App;
