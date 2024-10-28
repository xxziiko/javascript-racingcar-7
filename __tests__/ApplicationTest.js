import App from '../src/App.js';
import { MissionUtils } from '@woowacourse/mission-utils';
import { shouldMove } from '../src/utils.js';

const mockQuestions = (inputs) => {
  MissionUtils.Console.readLineAsync = jest.fn();

  MissionUtils.Console.readLineAsync.mockImplementation(() => {
    const input = inputs.shift();
    return Promise.resolve(input);
  });
};

const mockRandoms = (numbers) => {
  MissionUtils.Random.pickNumberInRange = jest.fn();

  numbers.reduce((acc, number) => {
    return acc.mockReturnValueOnce(number);
  }, MissionUtils.Random.pickNumberInRange);
};

const getLogSpy = () => {
  const logSpy = jest.spyOn(MissionUtils.Console, 'print');
  logSpy.mockClear();
  return logSpy;
};

describe('자동차 경주', () => {
  test('기능 테스트', async () => {
    // given
    const MOVING_FORWARD = 4;
    const STOP = 3;
    const inputs = ['pobi,woni', '1'];
    const logs = ['pobi : -', 'woni : ', '최종 우승자 : pobi'];
    const logSpy = getLogSpy();

    mockQuestions(inputs);
    mockRandoms([MOVING_FORWARD, STOP]);

    // when
    const app = new App();
    await app.run();

    // then
    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });

  test('예외 테스트', async () => {
    // given
    const inputs = ['pobi,javaji'];
    mockQuestions(inputs);

    // when
    const app = new App();

    // then
    await expect(app.run()).rejects.toThrow('[ERROR]');
  });
});

describe('자동차 이름 입력 기능', () => {
  test('기능 테스트', async () => {
    const inputs = '토마스,니콜라스';
    const outputs = ['토마스', '니콜라스'];

    mockQuestions([inputs]);

    const app = new App();
    const carNames = await app.getCarNames(inputs);

    expect(carNames).toEqual(outputs);
  });

  test.each([[' '], [null], [undefined], ['']])(
    '공백과 같은 빈 값을 입력받았을 때 에러 처리',
    (inputs) => {
      const app = new App();

      expect(() => app.validateInputs(inputs)).toThrow('[ERROR]');
    }
  );

  test('이름이 5자 이상일 경우 에러 처리', () => {
    const inputs = '멋쟁이토마토,과일은맛있어';
    mockQuestions([inputs]);

    const app = new App();
    expect(() => app.validateInputs(inputs).toThrow('[ERROR]'));
  });

  test('구분자가 쉼표(,)가 아닐 경우 에러 처리', () => {
    const inputs = '토마스/빵빵맨;캔디보이,니콜라스';
    mockQuestions([inputs]);

    const app = new App();
    expect(() => app.validateInputs(inputs).toThrow('[ERROR]'));
  });

  test.each([[['토마스', ' ', '니콜라스']], [['토마스', '니콜라스', '']]])(
    '구분자가 문자열 사이에 존재하지 않을 경우 에러처리',
    (inputs) => {
      const app = new App();

      expect(() => app.validateCarNames(inputs)).toThrow('[ERROR]');
    }
  );
});

describe('이동 횟수를 입력받는 기능', () => {
  test('기능 테스트', async () => {
    const inputs = '10';
    const outputs = '10';
    mockQuestions([inputs]);

    const app = new App();
    const count = await app.validateCount(inputs);

    expect(count).toEqual(outputs);
  });

  test.each([[' '], [null], [undefined], ['']])(
    '공백과 같은 빈 값을 입력받았을 때 에러 처리',
    (inputs) => {
      const app = new App();

      expect(() => app.validateCount(inputs)).toThrow('[ERROR]');
    }
  );

  test('숫자가 아닌 문자열 입력 시 에러 처리', () => {
    const inputs = 'a';
    mockQuestions([inputs]);

    const app = new App();
    expect(() => app.validateCount(inputs).toThrow('[ERROR]'));
  });
});

describe('0 ~ 9 사이의 무작위 값 중 4 이상일 경우 전진하는 기능', () => {
  test('랜덤 값이 4 이상일 때 shouldMove가 true를 반환', () => {
    mockRandoms([5]);

    expect(shouldMove()).toBe(true);
  });

  test('랜덤 값이 4 미만일 때 shouldMove가 false를 반환', () => {
    mockRandoms([3]);

    expect(shouldMove()).toBe(false);
  });
});

describe('실행 결과를 자동차 이름과 함께 시도 횟수만큼 출력하는 기능', () => {
  test('기능 테스트', () => {
    const carNames = ['토마스', '니콜라스'];
    const moveCounts = [5, 3];
    const repeatCount = 3;
    const logs = ['\n실행 결과', '토마스 : -', '니콜라스 : '];
    const logSpy = getLogSpy();

    mockRandoms(moveCounts);

    const app = new App();
    app.play(carNames, repeatCount);

    logs.forEach((log) => {
      expect(logSpy).toHaveBeenCalledWith(expect.stringContaining(log));
    });
  });
});
