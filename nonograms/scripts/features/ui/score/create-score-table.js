import { createElement } from '../../../shared/utils/elements/create-element.js';
import { domElements } from '../../../core/states/dom-elements.js';
import { refreshRating } from '../../rating/refresh-rating';
import { removeAllChildren } from '../../../shared/utils/elements/remove-all-children';
import { gameState } from '../../../core/states/game-state';

export function createScoreTable(parentElement) {
  removeAllChildren(parentElement);
  refreshRating();

  domElements.scoreWrapper = createElement({
    tag: 'div',
    parent: parentElement,
    classes: ['score-wrapper'],
  });

  domElements.scoreName = createElement({
    tag: 'p',
    parent: domElements.scoreWrapper,
    text: 'score table',
    classes: ['score-table__name'],
  });

  domElements.scoreTable = createElement({
    tag: 'div',
    parent: domElements.scoreWrapper,
    classes: ['score-table'],
  });

  domElements.scoreTableBody = createElement({
    tag: 'div',
    parent: domElements.scoreTable,
    classes: ['table-body'],
  });

  // Create table header
  domElements.scoreTableHeader = createElement({
    tag: 'div',
    parent: domElements.scoreTableBody,
    classes: ['score-table__header', 'table-row'],
  });

  createElement({
    tag: 'p',
    text: 'name',
    parent: domElements.scoreTableHeader,
    classes: ['header-name', 'table-item'],
  });

  createElement({
    tag: 'p',
    text: 'difficulty',
    parent: domElements.scoreTableHeader,
    classes: ['header-difficulty', 'table-item'],
  });

  createElement({
    tag: 'p',
    text: 'time',
    parent: domElements.scoreTableHeader,
    classes: ['header-time', 'table-item'],
  });

  // Create table rows
  gameState.topList.forEach((element, index) => {
    const row = createElement({
      tag: 'div',
      parent: domElements.scoreTableBody,
      classes: ['table-row', `rating-row-${index + 1}`],
    });

    // Add cells for name, difficulty, and time
    createElement({
      tag: 'div',
      text: element.name || '-',
      parent: row,
      classes: ['table-item'],
    });

    createElement({
      tag: 'div',
      text: element.difficulty || '-',
      parent: row,
      classes: ['table-item'],
    });

    createElement({
      tag: 'div',
      text: element.time || '-',
      parent: row,
      classes: ['table-item'],
    });
  });

  // Add close button
  const closeButton = createElement({
    tag: 'button',
    text: 'close',
    parent: domElements.scoreWrapper,
    classes: ['win-window-btn', 'dif-btn'],
  });

  closeButton.addEventListener('click', () => {
    domElements.modalWindow.close();
    removeAllChildren(parentElement);
  });
}
