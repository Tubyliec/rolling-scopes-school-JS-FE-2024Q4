import { createElement } from '../../../shared/utils/elements/create-element.js';
import { domElements } from '../../../core/states/dom-elements.js';
import { removeAllChildren } from '../../../shared/utils/elements/remove-all-children.js';
import { gameState } from '../../../core/states/game-state';

export function createWinWindow(parentElement) {
  removeAllChildren(parentElement);

  domElements.modalInfo = createElement({
    tag: 'div',
    parent: parentElement,
    classes: ['win-window-info'],
  });

  domElements.modalInfoText = createElement({
    tag: 'p',
    text: `Great! You have solved the nonogram in ${gameState.time.minutes * 60 + gameState.time.seconds} seconds!`,
    parent: domElements.modalInfo,
    classes: ['win-window-info__text'],
  });

  domElements.modalCLose = createElement({
    tag: 'button',
    text: 'close',
    parent: domElements.modalInfo,
    classes: ['win-window-btn', 'dif-btn'],
  });

  domElements.modalCLose.addEventListener('click', () => {
    domElements.modalWindow.close();
    removeAllChildren(parentElement);
  });
}
