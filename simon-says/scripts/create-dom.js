import { createElement } from "./create-elements.js";
import { startGame, repeatSequence } from "./game.js";

let currentElements = {};
let gameState = {
  liveCounter: 0,
  difficulty: "",
  playing: false,
};

let actionButtons = [];
let allKeys = [];

function createDom() {
  const domElements = {};
  const bodyElement = document.body;
  domElements.bodyWrapper = createElement({
    tag: "div",
    classes: ["body-wrapper"],
  });
  // Header
  domElements.header = createElement({
    tag: "header",
    parent: domElements.bodyWrapper,
    classes: ["header"],
  });
  // Difficulty panel
  domElements.difficultyPanel = createElement({
    tag: "div",
    parent: domElements.header,
    classes: ["difficulty-panel"],
  });
  domElements.easyDifficulty = createElement({
    tag: "button",
    text: "easy",
    parent: domElements.difficultyPanel,
    classes: ["difficulty-panel__easy", "header-btn", "header-btn--active"],
  });
  domElements.mediumDifficulty = createElement({
    tag: "button",
    text: "medium",
    parent: domElements.difficultyPanel,
    classes: ["difficulty-panel__medium", "header-btn"],
  });
  domElements.hardDifficulty = createElement({
    tag: "button",
    text: "hard",
    parent: domElements.difficultyPanel,
    classes: ["difficulty-panel__hard", "header-btn"],
  });
  // Round panel
  domElements.roundPanel = createElement({
    tag: "div",
    parent: domElements.header,
    classes: ["round-panel"],
  });
  domElements.roundLabel = createElement({
    tag: "p",
    parent: domElements.roundPanel,
    text: "round",
    classes: ["round-label"],
  });
  domElements.roundCounter = createElement({
    tag: "div",
    parent: domElements.roundPanel,
    classes: ["round-counter"],
  });
  domElements.keyboardWrapper;
  domElements.currentRound = createElement({
    tag: "span",
    parent: domElements.roundCounter,
    text: 0,
    classes: ["round-counter__current"],
  });
  domElements.separator = createElement({
    tag: "span",
    parent: domElements.roundCounter,
    text: "/",
    classes: ["round-counter__separator"],
  });
  domElements.totalRounds = createElement({
    tag: "span",
    parent: domElements.roundCounter,
    text: 5,
    classes: ["round-counter__total"],
  });
  // Title
  domElements.title = createElement({
    tag: "h1",
    text: "Simon Says!",
    parent: domElements.bodyWrapper,
    classes: ["title"],
  });
  // Input
  domElements.inputSection = createElement({
    tag: "section",
    parent: domElements.bodyWrapper,
    classes: ["input-section"],
  });
  domElements.inputWrapper = createElement({
    tag: "div",
    parent: domElements.inputSection,
    classes: ["input-wrapper"],
  });
  domElements.inputField = createElement({
    tag: "input",
    parent: domElements.inputWrapper,
    classes: ["input-field"],
    id: "input-field",
  });
  // Keyboard
  domElements.keyboardSection = createElement({
    tag: "section",
    parent: domElements.bodyWrapper,
    classes: ["keyboard-section"],
  });
  domElements.keyboardWrapper = createElement({
    tag: "div",
    parent: domElements.keyboardSection,
    classes: ["keyboard-wrapper"],
  });
  // Keyboard
  domElements.gameBtnSection = createElement({
    tag: "section",
    parent: domElements.bodyWrapper,
    classes: ["gamebtn-section"],
  });
  domElements.gameBtnWrapper = createElement({
    tag: "div",
    parent: domElements.gameBtnSection,
    classes: ["gamebtn-wrapper"],
  });
  domElements.startButton = createElement({
    tag: "button",
    text: "start",
    parent: domElements.gameBtnWrapper,
    classes: ["start-btn", "game-btn"],
  });
  domElements.startButton.addEventListener("click", startGame);
  domElements.newButton = createElement({
    tag: "button",
    text: "new game",
    parent: domElements.gameBtnWrapper,
    classes: ["new-btn", "game-btn", "no-display"],
  });
  domElements.repeatButton = createElement({
    tag: "button",
    text: "repeat the sequense",
    parent: domElements.gameBtnWrapper,
    classes: ["repeat-btn", "game-btn", "no-display"],
  });
  domElements.repeatButton.addEventListener("click", repeatSequence);
  domElements.nextButton = createElement({
    tag: "button",
    text: "next",
    parent: domElements.gameBtnWrapper,
    classes: ["next", "game-btn", "no-display"],
  });
  bodyElement.append(domElements.bodyWrapper);

  currentElements = {
    currentRound: domElements.currentRound,
    difficultyPanel: domElements.difficultyPanel,
    easyDifficulty: domElements.easyDifficulty,
    mediumDifficulty: domElements.mediumDifficulty,
    hardDifficulty: domElements.hardDifficulty,
    keyboardWrapper: domElements.keyboardWrapper,
    startButton: domElements.startButton,
    newButton: domElements.newButton,
    repeatButton: domElements.repeatButton,
    nextButton: domElements.nextButton,
  };

  actionButtons = [
    currentElements.startButton,
    currentElements.newButton,
    currentElements.repeatButton,
    currentElements.nextButton,
  ];

  allKeys = currentElements.keyboardWrapper.children;
}

export { currentElements, createDom, actionButtons, gameState, allKeys };
