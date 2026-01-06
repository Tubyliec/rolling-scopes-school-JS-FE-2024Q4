import { gameState } from '../../core/states/game-state';
import { domElements } from '../../core/states/dom-elements';
import { createList } from '../ui/board/board-elements';
import { easy, medium, hard } from '../../core/data/data';

export function processDifficultyButtons() {
  gameState.difficultyButtons.forEach((element) => {
    element.classList.remove('dif-btn--active');
  });
  this.classList.add('dif-btn--active');

  const difficultyText = this.textContent.trim().toLowerCase();
  if (difficultyText === 'easy') {
    gameState.difficulty = easy;
  } else if (difficultyText === 'medium') {
    gameState.difficulty = medium;
  } else if (difficultyText === 'hard') {
    gameState.difficulty = hard;
  }
  
  createList(domElements.fieldset);
}