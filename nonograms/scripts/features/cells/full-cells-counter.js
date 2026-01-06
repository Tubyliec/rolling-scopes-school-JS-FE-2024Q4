import { gameState } from '../../core/states/game-state';
import { cellsCounter } from './cells-counter';
import { rotateMatrix } from '../../shared/utils/rotate-matrix';

export function fullCellCounter(array) {
  let horizontalNums = [];
  let verticalNums = [];

  let rotatedArray = rotateMatrix(array);

  cellsCounter(array, horizontalNums);
  cellsCounter(rotatedArray, verticalNums);

  gameState.horizontalNums = horizontalNums;
  gameState.verticalNums = verticalNums;
}