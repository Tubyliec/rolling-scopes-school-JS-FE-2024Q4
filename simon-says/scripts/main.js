// Import

import {
  createElement,
  createKeyboard,
  removeAllChildNodes,
} from "./create-elements.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";
import { difficultySwap } from "./game.js";

// Layout

const bodyElement = document.body;
const bodyWrapper = createElement({
  tag: "div",
  classes: ["body-wrapper"],
});
// Header
const header = createElement({
  tag: "header",
  parent: bodyWrapper,
  classes: ["header"],
});
// Difficulty panel
const difficultyPanel = createElement({
  tag: "div",
  parent: header,
  classes: ["difficulty-panel"],
});
const easyDifficulty = createElement({
  tag: "button",
  text: "easy",
  parent: difficultyPanel,
  classes: ["difficulty-panel__easy", "header-btn", "header-btn--active"],
});
const mediumDifficulty = createElement({
  tag: "button",
  text: "medium",
  parent: difficultyPanel,
  classes: ["difficulty-panel__medium", "header-btn"],
});
const hardDifficulty = createElement({
  tag: "button",
  text: "hard",
  parent: difficultyPanel,
  classes: ["difficulty-panel__hard", "header-btn"],
});
// Round panel
const roundPanel = createElement({
  tag: "div",
  parent: header,
  classes: ["round-panel"],
});
const roundLabel = createElement({
  tag: "p",
  parent: roundPanel,
  text: "round",
  classes: ["round-label"],
});
const roundCounter = createElement({
  tag: "div",
  parent: roundPanel,
  classes: ["round-counter"],
});
const currentRound = createElement({
  tag: "span",
  parent: roundCounter,
  text: 0,
  classes: ["round-counter__current"],
});
const separator = createElement({
  tag: "span",
  parent: roundCounter,
  text: "/",
  classes: ["round-counter__separator"],
});
const totalRounds = createElement({
  tag: "span",
  parent: roundCounter,
  text: 5,
  classes: ["round-counter__total"],
});
// Title
const title = createElement({
  tag: "h1",
  text: "Simon Says!",
  parent: bodyWrapper,
  classes: ["title"],
});
// Input
const inputSection = createElement({
  tag: "section",
  parent: bodyWrapper,
  classes: ["input-section"],
});
const inputWrapper = createElement({
  tag: "div",
  parent: inputSection,
  classes: ["input-wrapper"],
});
const inputField = createElement({
  tag: "input",
  parent: inputWrapper,
  classes: ["input-field"],
  id: "input-field",
});
// Keyboard
const keyboardSection = createElement({
  tag: "section",
  parent: bodyWrapper,
  classes: ["keyboard-section"],
});
const keyboardWrapper = createElement({
  tag: "div",
  parent: keyboardSection,
  classes: ["keyboard-wrapper"],
});
// Keyboard
const gameBtnSection = createElement({
  tag: "section",
  parent: bodyWrapper,
  classes: ["gamebtn-section"],
});
const gameBtnWrapper = createElement({
  tag: "div",
  parent: gameBtnSection,
  classes: ["gamebtn-wrapper"],
});
const startButton = createElement({
  tag: "button",
  text: "start",
  parent: gameBtnWrapper,
  classes: ["start-btn", "game-btn"],
});
const newButton = createElement({
  tag: "button",
  text: "new game",
  parent: gameBtnWrapper,
  classes: ["new-btn", "game-btn", "no-display"],
});
const repeatButton = createElement({
  tag: "button",
  text: "repeat the sequense",
  parent: gameBtnWrapper,
  classes: ["repeat-btn", "game-btn", "no-display"],
});
const nextButton = createElement({
  tag: "button",
  text: "next",
  parent: gameBtnWrapper,
  classes: ["next", "game-btn", "no-display"],
});

createKeyboard(numbersArray, keyboardWrapper);
bodyElement.append(bodyWrapper);

// Difficulty

const difficultyLevels = [
  { name: easyDifficulty, array: numbersArray },
  { name: mediumDifficulty, array: lettersArray },
  { name: hardDifficulty, array: mixedArray },
  ,
];
difficultySwap(difficultyLevels, keyboardWrapper);
