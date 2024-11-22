import { MissionUtils } from '@woowacourse/mission-utils';

class ViewIn {
  static async getInput(message) {
    return await MissionUtils.Console.readLineAsync(message);
  }
}

export default ViewIn;
