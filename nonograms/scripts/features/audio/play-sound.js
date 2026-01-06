import { gameState } from '../../core/states/game-state';

let audio;

export function playSound(source) {
  if (!gameState.isSoundOn) return;

  audio = new Audio(source);
  audio.play().catch((error) => {
    if (error.name !== 'AbortError') {
      console.error('Audio playback failed:', error);
    }
  });
}