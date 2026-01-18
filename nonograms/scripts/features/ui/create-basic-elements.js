import { createElement } from '../../shared/utils/elements/create-element.js';
import { domElements } from '../../core/states/dom-elements.js';
import { gameState } from '../../core/states/game-state';
import { processDifficultyButtons } from '../buttons/process-difficulty-buttons';
import { processControlButtons } from '../buttons/process-control-buttons';
import { buttonsSound } from '../audio/buttons-sound';
import { processTogglers } from '../buttons/process-togglers';
import { createHeader } from './header/create-header';
import { createDifficultyPanel } from './difficulty-panel/create-difficulty-panel';
import { createGamePanel } from './game-panel/create-game-panel';
import { createMainElement } from './main/create-main-element';
import { createControlPanel } from './control-panel/create-control-panel';
import { createModalWindow } from './modal/create-modal-window';

export function createBasicElements() {
  const bodyElement = document.body;

  domElements.bodyWrapper = createElement({
    tag: 'div',
    classes: ['body-wrapper'],
  });

  bodyElement.append(domElements.bodyWrapper);

  createHeader();
  createMainElement();
  createControlPanel();
  createDifficultyPanel();
  createGamePanel();
  createModalWindow();

  gameState.difficultyButtons = [
    domElements.easyButton,
    domElements.mediumButton,
    domElements.hardButton,
  ];

  gameState.controlButtons = [
    domElements.scoreButton,
    domElements.solutionButton,
    domElements.resetButton,
    domElements.randomButton,
    domElements.saveButton,
    domElements.continueButton,
  ];

  gameState.toggleButtons = [
    domElements.audiotoggler,
    domElements.themetoggler,
  ];

  gameState.timerElements = [domElements.minutes, domElements.seconds];

  gameState.difficultyButtons.forEach((element) => {
    element.addEventListener('click', processDifficultyButtons);
    element.addEventListener('click', buttonsSound);
  });

  gameState.controlButtons.forEach((element) => {
    element.addEventListener('click', processControlButtons);
    element.addEventListener('click', buttonsSound);
  });

  gameState.toggleButtons.forEach((element) => {
    element.addEventListener('click', buttonsSound);
    element.addEventListener('click', processTogglers);
  });
}
