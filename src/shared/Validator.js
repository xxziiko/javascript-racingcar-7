import { ERROR, CAR_NAME_DELIMITER, Utils } from './index.js';

class Validator {
  static validateCarNameLength(carName) {
    Utils.handleError(carName.length > 5, ERROR.invalidCarNameLength);
  }

  static validateEmptyString(carName) {
    Utils.handleError(!carName.trim(), ERROR.emptyString);
  }

  static validateDelimiter(carNames) {
    Utils.handleError(carNames.includes(CAR_NAME_DELIMITER), ERROR.invalidDelimiter);
  }

}

export default Validator;
