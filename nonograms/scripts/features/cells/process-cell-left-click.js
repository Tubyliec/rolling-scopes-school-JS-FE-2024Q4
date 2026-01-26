import { playSound } from '../audio/play-sound';
import { sounds } from '../../core/data/sounds';
import { gameState } from '../../core/states/game-state';
import { stopTimer } from '../timer/stop-timer';
import { domElements } from '../../core/states/dom-elements';
import { createRating } from '../rating/create-rating';
import { createWinWindow } from '../ui/win-window/create-win-window';

export function processCellLeftClick() {
  if (this.classList.contains('background--dark')) {
    this.classList.remove('background--dark');
    playSound(sounds.wipe);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
    if (this.textContent === '1') {
      gameState.currentCellCounter -= 1;
    } else {
      gameState.falseCellCounter -= 1;
    }
  } else {
    this.classList.add('background--dark');
    playSound(sounds.pencil);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] = 2;
    if (this.textContent === '1') {
      gameState.currentCellCounter += 1;
    } else {
      gameState.falseCellCounter += 1;
    }
  }
  if (this.classList.contains('cross--dark')) {
    this.classList.remove('cross--dark');
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
  }
  if (
    gameState.currentCellCounter === gameState.templateCellCounter &&
    gameState.falseCellCounter === 0
  ) {
    console.log('You win');
    stopTimer();
    createWinWindow(domElements.modalWindow);
    playSound(sounds.fanfare);
    domElements.modalWindow.showModal();
    domElements.board.classList.add('no-events');
    document.body.classList.add('no-scroll');
    createRating();
  }
}
