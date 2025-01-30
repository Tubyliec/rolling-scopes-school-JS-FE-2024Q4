import { gameState, processDifficulty } from "./utilits.js";
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

  domElements.options = createElement({
    tag: "div",
    parent: domElements.headerWrapper,
    classes: ["options"],
  });

  domElements.timer = createElement({
    tag: "div",
    parent: domElements.options,
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
  //Difficulty panel
  domElements.difficultyPanel = createElement({
    tag: "section",
    parent: domElements.mainWrapper,
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

  //Control panel
  domElements.controlPanel = createElement({
    tag: "section",
    parent: domElements.mainWrapper,
    classes: ["control-panel"],
  });

  gameState.difficultyButtons = [
    domElements.easyButton,
    domElements.mediumButton,
    domElements.hardButton,
  ];

  gameState.timerElements = [domElements.minutes, domElements.seconds];

  gameState.difficultyButtons.forEach((element) => {
    element.addEventListener("click", processDifficulty);
  });

  bodyElement.append(domElements.bodyWrapper);
}

export { createDom };
export { domElements };
