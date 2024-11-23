import { MOVE_SYMBOL, MESSEAGES, CAR_NAME_DELIMITER } from './constants.js';

export const formatCarResult = (name, position) => {
  return `${name} : ${MOVE_SYMBOL.repeat(position)}`;
};

export const formatWinners = (winners) => {
  return `${MESSEAGES.finalWinners} ${winners.join(`${CAR_NAME_DELIMITER} `)}`;
};
