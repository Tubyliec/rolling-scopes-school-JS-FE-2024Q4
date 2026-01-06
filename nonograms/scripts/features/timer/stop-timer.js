import { gameState } from '../../core/states/game-state';

export function stopTimer() {
  clearInterval(gameState.timerState);
}