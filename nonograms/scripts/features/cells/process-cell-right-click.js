import { gameState } from '../../core/states/game-state';
import { sounds } from '../../core/data/data';
import { playSound } from '../audio/play-sound';

export function processCellRightClick(event) {
  event.preventDefault();
  if (this.classList.contains('cross--dark')) {
    this.classList.remove('cross--dark');
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
    playSound(sounds.wipe);
  } else {
    this.classList.add('cross--dark');
    playSound(sounds.cross);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] = 3;
  }
  if (this.classList.contains('background--dark')) {
    this.classList.remove('background--dark');
    if (this.textContent === '1') {
      gameState.currentCellCounter -= 1;
    } else {
      gameState.falseCellCounter -= 1;
    }
  }
}