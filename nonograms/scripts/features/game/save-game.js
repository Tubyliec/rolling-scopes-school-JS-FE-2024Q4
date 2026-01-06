import { gameState } from '../../core/states/game-state';
import { domElements } from '../../core/states/dom-elements';

export function saveGame() {
  domElements.continueButton.removeAttribute('disabled', '');
  gameState.savedGame.currentCellCounter = gameState.currentCellCounter;
  gameState.savedGame.falseCellCounter = gameState.falseCellCounter;
  gameState.savedGame.minutes = gameState.time.minutes;
  gameState.savedGame.seconds = gameState.time.seconds;
  gameState.savedGame.savedArray = gameState.savedGame.array;
  window.localStorage.setItem('savedGame', JSON.stringify(gameState.savedGame));
}