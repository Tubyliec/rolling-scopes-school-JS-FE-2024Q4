import { domElements } from '../../../core/states/dom-elements';
import { createElement } from '../../../shared/utils/elements/create-element';

export function createDifficultyPanel() {
  domElements.difficultyPanel = createElement({
    tag: 'div',
    parent: domElements.controlPanel,
    classes: ['difficulty-panel'],
  });
  domElements.difficultyButtons = createElement({
    tag: 'div',
    parent: domElements.difficultyPanel,
    classes: ['difficulty-buttons'],
  });
  domElements.easyButton = createElement({
    tag: 'button',
    text: 'easy',
    parent: domElements.difficultyButtons,
    classes: ['dif-btn', 'easy-btn'],
  });

  domElements.mediumButton = createElement({
    tag: 'button',
    text: 'medium',
    parent: domElements.difficultyButtons,
    classes: ['dif-btn', 'medium-btn'],
  });

  domElements.hardButton = createElement({
    tag: 'button',
    text: 'hard',
    parent: domElements.difficultyButtons,
    classes: ['dif-btn', 'hard-btn'],
  });

  domElements.patternsList = createElement({
    tag: 'div',
    parent: domElements.difficultyPanel,
    classes: ['patterns-list'],
  });
  domElements.fieldset = createElement({
    tag: 'div',
    parent: domElements.patternsList,
    classes: ['fieldset'],
  });
  domElements.buttonsPanel = createElement({
    tag: 'div',
    parent: domElements.controlPanel,
    classes: ['buttons-panel'],
  });
  domElements.scoreButton = createElement({
    tag: 'button',
    text: 'Score',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });

  domElements.solutionButton = createElement({
    tag: 'button',
    text: 'Solution',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });
  domElements.resetButton = createElement({
    tag: 'button',
    text: 'Reset game',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });
  domElements.randomButton = createElement({
    tag: 'button',
    text: 'Random game',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });
  domElements.saveButton = createElement({
    tag: 'button',
    text: 'Save game',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });
  domElements.continueButton = createElement({
    tag: 'button',
    text: 'Continue last game',
    parent: domElements.buttonsPanel,
    classes: ['dif-btn'],
  });
}
