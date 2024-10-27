import { MESSAGES } from "./constants.js";
import {
  checkValidDelimiter,
  checkEmpty,
  checkValidLength,
  readInput,
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

  async getCarNames() {
    const inputs = await readInput(MESSAGES.PROMPT_CAR_NAMES);

    return this.validateCarNames(inputs).split(this.delimiter);
  }

  async run() {
    const carNames = await this.getCarNames();
  }
}

export default App;
