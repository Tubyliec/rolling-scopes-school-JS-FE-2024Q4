import { gameState } from '../../core/states/game-state';
import { sounds } from '../../core/data/sounds';
import { playSound } from '../audio/play-sound';
import { createGame } from '../game/create-game';

export function processRadioButtons() {
  gameState.currentPattern = gameState.difficulty[this.value].array;
  gameState.savedGame.pattern = this.value;
  playSound(sounds.click);
  createGame();
}