import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createGamePanel() {
  domElements.gamePanel = createElement({
    tag: 'section',
    parent: domElements.mainWrapper,
    classes: ['game-panel'],
  });
  domElements.board = createElement({
    tag: 'div',
    parent: domElements.gamePanel,
    classes: ['board'],
  });
  domElements.topInfo = createElement({
    tag: 'div',
    parent: domElements.board,
    classes: ['top-info'],
  });
  domElements.leftInfo = createElement({
    tag: 'div',
    parent: domElements.board,
    classes: ['left-info'],
  });
  domElements.gameboard = createElement({
    tag: 'div',
    parent: domElements.board,
    classes: ['gameboard'],
  });
}