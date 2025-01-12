// Import
import { createDom, currentElements } from "./create-dom.js";
import { createKeyboard } from "./create-elements.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";
import { difficultySwap } from "./game.js";

let gameState = {
  liveCounter: 0,
};
// Create elements
createDom();
createKeyboard(numbersArray, currentElements.keyboardWrapper);

// Difficulty
const difficultyLevels = [
  { name: currentElements.easyDifficulty, array: numbersArray },
  { name: currentElements.mediumDifficulty, array: lettersArray },
  { name: currentElements.hardDifficulty, array: mixedArray },
  ,
];
difficultySwap(difficultyLevels, currentElements.keyboardWrapper);

currentElements.startButton.addEventListener("click", function (e) {
  currentElements.startButton.classList.add("no-display");
  currentElements.newButton.classList.remove("no-display");
  currentElements.repeatButton.classList.remove("no-display");
  gameState.liveCounter += 1;
  currentElements.currentRound.textContent = gameState.liveCounter;
});
