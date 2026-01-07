import { gameState } from '../../core/states/game-state';
import { startTimer } from './start-timer';

export function processTimerEvent() {
  if (gameState.timerState === undefined) {
    gameState.timerState = setInterval(startTimer, 1000);
  }
}
