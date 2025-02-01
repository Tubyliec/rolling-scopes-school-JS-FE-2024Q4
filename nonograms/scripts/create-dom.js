import {
  gameState,
  processDifficulty,
  processControlButtons,
  processRightClick,
  processToogle,
} from "./utilits.js";
import { createElement } from "./create-elements.js";
const domElements = {};

function createDom() {
  const bodyElement = document.body;
  domElements.bodyWrapper = createElement({
    tag: "div",
    classes: ["body-wrapper"],
  });
  //Header
  domElements.header = createElement({
    tag: "header",
    parent: domElements.bodyWrapper,
    classes: ["header"],
  });

  domElements.headerWrapper = createElement({
    tag: "div",
    parent: domElements.header,
    classes: ["header-wrapper"],
  });

  domElements.name = createElement({
    tag: "p",
    text: "nonograms",
    parent: domElements.headerWrapper,
    classes: ["name"],
  });

  domElements.timer = createElement({
    tag: "div",
    parent: domElements.headerWrapper,
    classes: ["timer"],
  });

  domElements.minutes = createElement({
    tag: "span",
    parent: domElements.timer,
    text: "00",
    classes: ["time"],
  });
  domElements.timeSeparator = createElement({
    tag: "span",
    parent: domElements.timer,
    text: " : ",
    classes: ["time"],
  });
  domElements.seconds = createElement({
    tag: "span",
    parent: domElements.timer,
    text: "00",
    classes: ["time"],
  });

  domElements.options = createElement({
    tag: "div",
    parent: domElements.headerWrapper,
    classes: ["options"],
  });

  domElements.audioButton = createElement({
    tag: "div",
    parent: domElements.options,
    classes: ["panel-btn"],
  });

  domElements.audioButtonWrapper = createElement({
    tag: "div",
    parent: domElements.audioButton,
    classes: ["btn-wrapper"],
  });

  domElements.audioOnImg = createElement({
    tag: "div",
    parent: domElements.audioButtonWrapper,
    classes: ["button-img", "audio-on"],
  });

  domElements.audioToogler = createElement({
    tag: "input",
    type: "checkbox",
    parent: domElements.audioButtonWrapper,
    id: ["audio-toogle"],
    classes: ["toogle-btn"],
  });
  domElements.audioToogler.setAttribute("data-name", "audio");
  domElements.audioToogler.addEventListener("click", processToogle);
  domElements.audioTooglerLabel = createElement({
    tag: "label",
    parent: domElements.audioButtonWrapper,
    classes: ["toogle-label"],
  });
  domElements.audioTooglerLabel.setAttribute("for", "audio-toogle");
  domElements.audioOffImg = createElement({
    tag: "div",
    parent: domElements.audioButtonWrapper,
    classes: ["button-img", "audio-off"],
  });

  domElements.themeButton = createElement({
    tag: "div",
    parent: domElements.options,
    classes: ["panel-btn"],
  });

  domElements.themeButtonWrapper = createElement({
    tag: "div",
    parent: domElements.themeButton,
    classes: ["btn-wrapper"],
  });

  domElements.themeOnImg = createElement({
    tag: "div",
    parent: domElements.themeButtonWrapper,
    classes: ["button-img", "theme-on"],
  });

  domElements.themeToogler = createElement({
    tag: "input",
    type: "checkbox",
    parent: domElements.themeButtonWrapper,
    id: ["theme-toogle"],
    classes: ["toogle-btn"],
  });
  domElements.themeTooglerLabel = createElement({
    tag: "label",
    parent: domElements.themeButtonWrapper,
    classes: ["toogle-label"],
  });
  domElements.themeTooglerLabel.setAttribute("for", "theme-toogle");
  domElements.themeOffImg = createElement({
    tag: "div",
    parent: domElements.themeButtonWrapper,
    classes: ["button-img", "theme-off"],
  });
  //Main
  domElements.mainPanel = createElement({
    tag: "main",
    parent: domElements.bodyWrapper,
    classes: ["main-panel"],
  });
  domElements.mainWrapper = createElement({
    tag: "div",
    parent: domElements.mainPanel,
    classes: ["main-wrapper"],
  });
  //Control panel
  domElements.controlPanel = createElement({
    tag: "section",
    parent: domElements.mainWrapper,
    classes: ["control-panel"],
  });
  //Difficulty panel
  domElements.difficultyPanel = createElement({
    tag: "div",
    parent: domElements.controlPanel,
    classes: ["difficulty-panel"],
  });
  domElements.difficultyButtons = createElement({
    tag: "div",
    parent: domElements.difficultyPanel,
    classes: ["difficulty-buttons"],
  });
  domElements.easyButton = createElement({
    tag: "button",
    text: "easy",
    parent: domElements.difficultyButtons,
    classes: ["dif-btn", "easy-btn"],
  });

  domElements.mediumButton = createElement({
    tag: "button",
    text: "medium",
    parent: domElements.difficultyButtons,
    classes: ["dif-btn", "medium-btn"],
  });

  domElements.hardButton = createElement({
    tag: "button",
    text: "hard",
    parent: domElements.difficultyButtons,
    classes: ["dif-btn", "hard-btn"],
  });

  domElements.patternsList = createElement({
    tag: "div",
    parent: domElements.difficultyPanel,
    classes: ["patterns-list"],
  });
  domElements.fieldset = createElement({
    tag: "div",
    parent: domElements.patternsList,
    classes: ["fieldset"],
  });
  domElements.buttonsPanel = createElement({
    tag: "div",
    parent: domElements.controlPanel,
    classes: ["buttons-panel"],
  });
  domElements.scoreButton = createElement({
    tag: "button",
    text: "Score",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });

  domElements.solutionButton = createElement({
    tag: "button",
    text: "Solution",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });
  domElements.resetButton = createElement({
    tag: "button",
    text: "Reset game",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });
  domElements.randomButton = createElement({
    tag: "button",
    text: "Random game",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });
  domElements.saveButton = createElement({
    tag: "button",
    text: "Save game",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });
  domElements.continueButton = createElement({
    tag: "button",
    text: "Continue last game",
    parent: domElements.buttonsPanel,
    classes: ["dif-btn"],
  });

  //Game panel
  domElements.gamePanel = createElement({
    tag: "section",
    parent: domElements.mainWrapper,
    classes: ["game-panel"],
  });
  domElements.board = createElement({
    tag: "div",
    parent: domElements.gamePanel,
    classes: ["board"],
  });
  domElements.topInfo = createElement({
    tag: "div",
    parent: domElements.board,
    classes: ["top-info"],
  });
  domElements.leftInfo = createElement({
    tag: "div",
    parent: domElements.board,
    classes: ["left-info"],
  });
  domElements.gameboard = createElement({
    tag: "div",
    parent: domElements.board,
    classes: ["gameboard"],
  });

  //Modal window
  domElements.modalWindow = createElement({
    tag: "dialog",
    parent: domElements.bodyWrapper,
    classes: ["modal"],
  });

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

  gameState.timerElements = [domElements.minutes, domElements.seconds];

  gameState.difficultyButtons.forEach((element) => {
    element.addEventListener("click", processDifficulty);
  });

  gameState.controlButtons.forEach((element) => {
    element.addEventListener("click", processControlButtons);
  });

  bodyElement.append(domElements.bodyWrapper);
}

export { createDom };
export { domElements };
