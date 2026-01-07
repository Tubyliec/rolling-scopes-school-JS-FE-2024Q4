import { gameState } from '../../core/states/game-state';

export function startTimer() {
  gameState.time.seconds += 1;
  if (gameState.time.seconds === 60) {
    gameState.time.minutes += 1;
    gameState.time.seconds = 0;
  }
  gameState.timerElements[0].textContent = `${gameState.time.minutes.toString().padStart(2, '0')}`;
  gameState.timerElements[1].textContent = `${gameState.time.seconds.toString().padStart(2, '0')}`;
}
