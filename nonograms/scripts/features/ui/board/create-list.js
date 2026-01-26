import { removeAllChildren } from '../../../shared/utils/elements/remove-all-children';
import { gameState } from '../../../core/states/game-state';
import { createElement } from '../../../shared/utils/elements/create-element';
import { processRadioButtons } from '../../buttons/process-radio-buttons';

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
      parent: newDiv,
      id: key,
      classes: ['input-radio'],
    });

    const newLabel = createElement({
      tag: 'label',
      text: key,
      parent: newDiv,
      classes: ['input-label'],
    });

    newLabel.setAttribute('for', key);
    newInput.addEventListener('click', processRadioButtons);
  });
}
