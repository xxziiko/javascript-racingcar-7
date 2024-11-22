import { MOVE_SYMBOL } from './constants.js';

export const formatCarResult = (name, position) => {
  return `${name} : ${MOVE_SYMBOL.repeat(position)}`;
};
