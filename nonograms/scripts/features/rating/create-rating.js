import { gameState } from '../../core/states/game-state';
import { refreshRating } from './refresh-rating';

export function createRating() {
  refreshRating();
  gameState.ratingList.push(gameState.scoreItem);
  window.localStorage.setItem(
    'ratingList',
    JSON.stringify(gameState.ratingList),
  );
}