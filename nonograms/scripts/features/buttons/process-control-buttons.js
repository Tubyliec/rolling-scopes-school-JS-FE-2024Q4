import { domElements } from '../../core/states/dom-elements';
import { createScoreTable } from '../ui/score/create-score-table';
import { gameState } from '../../core/states/game-state';
import { resetTimer } from '../timer/reset-timer';
import { saveGame } from '../game/save-game';
import { loadGame } from '../game/load-game';

export function processControlButtons() {
  const cellArray = document.querySelectorAll('.cell');
  if (this === domElements.scoreButton) {
    createScoreTable(domElements.modalWindow);
    domElements.modalWindow.showModal();
  }
  if (this === domElements.solutionButton) {
    domElements.board.classList.add('no-events');
    domElements.saveButton.setAttribute('disabled', '');
    cellArray.forEach((element) => {
      element.classList.remove('background--dark');
      element.classList.remove('cross--dark');
      if (element.textContent == 1) {
        element.classList.add('background--dark');
      }
    });
  }
  if (this === domElements.resetButton) {
    domElements.saveButton.removeAttribute('disabled', '');
    cellArray.forEach((element) => {
      element.classList.remove('background--dark');
      element.classList.remove('cross--dark');
      gameState.currentCellCounter = 0;
      gameState.falseCellCounter = 0;
      resetTimer();
      domElements.board.classList.remove('no-events');
      gameState.savedGame.array = structuredClone(gameState.currentPattern);
    });
  }
  if (this === domElements.randomButton) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let randomDifficultyNumber = getRandomInt(3);
    let randomPatternNumber = getRandomInt(5);

    let randomDifficulty = gameState.difficultyButtons[randomDifficultyNumber];
    randomDifficulty.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );

    let patternsArray = document.querySelectorAll('.input-radio');
    let randomPattern = patternsArray[randomPatternNumber];
    randomPattern.dispatchEvent(
      new MouseEvent('click', { bubbles: true, cancelable: true }),
    );
  }
  if (this === domElements.saveButton) {
    saveGame();
  }
  if (this === domElements.continueButton) {
    loadGame();
    console.log(gameState.templateCellCounter);
    console.log(gameState.currentCellCounter);
    const cellArray = document.querySelectorAll('.cell');
    cellArray.forEach((element) => {
      element.classList.remove('background--dark');
      element.classList.remove('cross--dark');
      const xNum = element.dataset.x - 1;
      const yNum = element.dataset.y - 1;
      if (gameState.savedGame.savedArray[xNum][yNum] == 2) {
        element.classList.add('background--dark');
      }
      if (gameState.savedGame.savedArray[xNum][yNum] == 3) {
        element.classList.add('cross--dark');
      }
    });
  }
}