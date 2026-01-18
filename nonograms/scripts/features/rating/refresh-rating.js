import { gameState } from '../../core/states/game-state';

export function refreshRating() {
  gameState.scoreItem.minutes = gameState.time.minutes;
  gameState.scoreItem.seconds = gameState.time.seconds;
  gameState.scoreItem.time = `${gameState.time.minutes.toString().padStart(2, '0')} : ${gameState.time.seconds.toString().padStart(2, '0')}`;

  gameState.ratingList = JSON.parse(window.localStorage.getItem('ratingList'));
  if (!gameState.ratingList) {
    gameState.ratingList = [];
  }

  gameState.topList = gameState.ratingList.slice(-5);

  if (gameState.topList.length > 1) {
    gameState.topList.sort(function (a, b) {
      let aValue = a.minutes * 60 + a.seconds;
      let bValue = b.minutes * 60 + b.seconds;
      return aValue - bValue;
    });
  }
}
