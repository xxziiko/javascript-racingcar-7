class Utils {
  static handleError(condition, errorMessages) {
    if (condition) {
      throw new Error(`[ERROR] ${errorMessages}`);
    }
  }
}

export default Utils;
