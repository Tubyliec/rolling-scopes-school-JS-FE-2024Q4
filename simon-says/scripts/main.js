// Import
import { createDom, currentElements, gameState } from "./create-dom.js";
import { createKeyboard } from "./create-elements.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";
import { difficultySwap, createSequense } from "./game.js";

// Create elements
createDom();
createKeyboard(numbersArray, currentElements.keyboardWrapper);

// Difficulty
const difficultyLevels = [
  {
    name: currentElements.easyDifficulty,
    array: numbersArray,
  },
  {
    name: currentElements.mediumDifficulty,
    array: lettersArray,
  },
  {
    name: currentElements.hardDifficulty,
    array: mixedArray,
  },
];

difficultySwap(difficultyLevels, currentElements.keyboardWrapper);

createSequense();
