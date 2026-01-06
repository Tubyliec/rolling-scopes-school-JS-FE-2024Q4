import { gameState } from '../../core/states/game-state';
import { stopTimer } from './stop-timer';

export function resetTimer() {
  stopTimer();
  gameState.timerState = undefined;
  gameState.time.minutes = 0;
  gameState.time.seconds = 0;
  gameState.timerElements[0].textContent = `${gameState.time.minutes.toString().padStart(2, '0')}`;
  gameState.timerElements[1].textContent = `${gameState.time.seconds.toString().padStart(2, '0')}`;
}