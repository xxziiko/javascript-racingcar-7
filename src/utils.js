import { Console } from "@woowacourse/mission-utils";

export const readInput = async (message) => {
  const userInput = await Console.readLineAsync(message);
  return userInput;
};

export const handleError = (message) => {
  const formattedMessage = "[ERROR]" + message;
  throw Error(formattedMessage);
};

export const checkEmpty = (inputs, message) => {
  if (!inputs || !inputs.trim()) handleError(message);
};

export const checkValidLength = (inputs, targetNumber, message) => {
  const names = inputs.split(",");
  for (const name of names) {
    if (name.length > targetNumber) handleError(message);
  }
};

export const checkValidDelimiter = (inputs, delimiter, message) => {
  if (!inputs.includes(delimiter)) handleError(message);
};

export const checkValidNumber = (inputs, message) => {
  if (isNaN(inputs)) handleError(message);

  return inputs;
};
