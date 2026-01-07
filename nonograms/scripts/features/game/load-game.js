import { gameState } from '../../core/states/game-state';
import { processTimerEvent } from '../timer/process-timer';

export function loadGame() {
  const loadedState = JSON.parse(window.localStorage.getItem('savedGame'));

  gameState.savedGame.pattern = loadedState.pattern;
  gameState.savedGame.difficulty = loadedState.difficulty;

  gameState.difficultyButtons.forEach((element) => {
    if (element.textContent === gameState.savedGame.difficulty) {
      element.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    }
  });
  let patternsArray = document.querySelectorAll('.input-radio');
  patternsArray.forEach((element) => {
    if (element.value === gameState.savedGame.pattern) {
      element.dispatchEvent(
        new MouseEvent('click', { bubbles: true, cancelable: true }),
      );
    }
  });
  gameState.savedGame.savedArray = loadedState.savedArray;
  gameState.savedGame.array = loadedState.savedArray;
  gameState.currentCellCounter = loadedState.currentCellCounter;
  gameState.falseCellCounter = loadedState.falseCellCounter;
  gameState.time.minutes = loadedState.minutes;
  gameState.time.seconds = loadedState.seconds;
  processTimerEvent();
}
