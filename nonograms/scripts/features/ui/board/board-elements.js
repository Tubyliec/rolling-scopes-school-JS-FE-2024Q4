import { createElement } from '../../../shared/utils/elements/create-element.js';
import { gameState } from '../../../core/states/game-state';
import { removeAllChildren } from '../../../shared/utils/elements/remove-all-children.js';
import { processTimerEvent } from '../../timer/process-timer';
import { processCellLeftClick } from '../../cells/process-cell-left-click';
import { processCellRightClick } from '../../cells/process-cell-right-click';
import { processRadioButtons } from '../../buttons/process-radio-buttons';
import { easy, medium } from '../../../core/data/data';

export function createCells(array, parentElement) {
  let counter = 0;
  let cellCounter = 0;
  removeAllChildren(parentElement);

  if (window.screen.width >= 600) {
    if (gameState.difficulty === easy) {
      document.body.style.setProperty('--cell-size', '5rem');
    } else if (gameState.difficulty === medium) {
      document.body.style.setProperty('--cell-size', '3.5rem');
    } else {
      document.body.style.setProperty('--cell-size', '2.5rem');
    }
  } else {
    if (gameState.difficulty === easy) {
      document.body.style.setProperty('--cell-size', '3.5rem');
    } else if (gameState.difficulty === medium) {
      document.body.style.setProperty('--cell-size', '2rem');
    } else {
      document.body.style.setProperty('--cell-size', '1.5rem');
    }
  }

  array.forEach((element) => {
    counter += 1;
    const tempClass = `row-${counter}`;
    const newRow = createElement({
      tag: 'div',
      parent: parentElement,
      classes: ['row', tempClass],
    });

    element.forEach((item) => {
      cellCounter += 1;
      const newItem = createElement({
        tag: 'div',
        parent: document.querySelector(`.${tempClass}`),
        text: item,
        classes: ['cell'],
      });

      newItem.setAttribute('data-x', counter);
      newItem.setAttribute('data-y', cellCounter);

      if (item === 1) {
        gameState.templateCellCounter += 1;
      }

      newItem.addEventListener('click', processCellLeftClick);
      newItem.addEventListener('click', processTimerEvent, {
        once: true,
      });
      newItem.addEventListener('contextmenu', processCellRightClick);
      newItem.addEventListener('contextmenu', processTimerEvent, {
        once: true,
      });
    });
    cellCounter = 0;
  });
}

export function createInfo(array, parentElement, elementClass) {
  let counter = 0;
  removeAllChildren(parentElement);

  array.forEach((element) => {
    counter += 1;
    const tempClass = `${elementClass}-${counter}`;
    const newItem = createElement({
      tag: 'div',
      parent: parentElement,
      classes: [elementClass, tempClass],
    });

    element.forEach((item) => {
      createElement({
        tag: 'div',
        parent: document.querySelector(`.${tempClass}`),
        text: item,
        classes: ['info-nums'],
      });
    });
  });
}

export function createList(parentElement) {
  removeAllChildren(parentElement);

  Object.keys(gameState.difficulty).forEach((key) => {
    const tempClass = `checkbox-${key}`;
    const newDiv = createElement({
      tag: 'div',
      parent: parentElement,
      classes: ['list-checkbox', tempClass],
    });

    const newInput = createElement({
      tag: 'input',
      type: 'radio',
      name: 'pattern',
      value: key,
      parent: document.querySelector(`.${tempClass}`),
      id: key,
      classes: ['input-radio'],
    });

    const newLabel = createElement({
      tag: 'label',
      text: key,
      parent: document.querySelector(`.${tempClass}`),
      classes: ['input-label'],
    });

    newLabel.setAttribute('for', key);
    newInput.addEventListener('click', processRadioButtons);
  });
}