import { createCells, createInfo } from '../board/board-elements.js';
import { domElements } from '../../../core/states/dom-elements.js';
import { gameState } from '../../../core/states/game-state.js';
import { resetTimer } from '../../timer/reset-timer';
import { fullCellCounter } from '../../cells/full-cells-counter';

export function createGame() {
  if (window.localStorage.getItem('savedGame') === null) {
    domElements.continueButton.setAttribute('disabled', '');
  }

  gameState.templateCellCounter = 0;
  gameState.currentCellCounter = 0;
  gameState.falseCellCounter = 0;
  resetTimer();

  domElements.board.classList.remove('no-events');
  domElements.saveButton.removeAttribute('disabled', '');

  createCells(gameState.currentPattern, domElements.gameboard);
  fullCellCounter(gameState.currentPattern);

  createInfo(gameState.verticalNums, domElements.topInfo, 'top-wrapper');
  createInfo(gameState.horizontalNums, domElements.leftInfo, 'left-wrapper');

  gameState.savedGame.array = structuredClone(gameState.currentPattern);

  // Set up pattern selection
  document.querySelectorAll('.input-radio').forEach((element) => {
    if (element.checked === true) {
      gameState.scoreItem.name = element.value;
    }
  });

  // Set up difficulty
  gameState.difficultyButtons.forEach((element) => {
    if (element.classList.contains('dif-btn--active')) {
      gameState.scoreItem.difficulty = element.textContent;
      gameState.savedGame.difficulty = element.textContent;
    }
  });
}