// Import
import { createKeyboard, removeAllChildNodes } from "./create-elements.js";
import { currentElements, actionButtons, gameState } from "./create-dom.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";

// Difficulty
function difficultySwap(array, parentElement) {
  array.forEach((element) => {
    element.name.addEventListener("click", function (e) {
      element.name.classList.add("header-btn--active");
      array.forEach((item) => {
        if (item !== element) {
          item.name.classList.remove("header-btn--active");
        }
      });
      removeAllChildNodes(parentElement);
      createKeyboard(element.array, parentElement);
      console.log(
        `Keys count: ${currentElements.keyboardWrapper.childElementCount}`,
      );
    });
  });
}

//
let sequenceArray = [];

function createSequense() {
  const sequenceLength = gameState.liveCounter * 2;
  const maxIndex = currentElements.keyboardWrapper.childElementCount;
  let keysArray = [];
  for (let i = 0; i < sequenceLength; i++) {
    const index = Math.floor(Math.random() * maxIndex);
    if (maxIndex === 10) {
      keysArray = numbersArray;
    } else if (maxIndex === 26) {
      keysArray = lettersArray;
    } else {
      keysArray = mixedArray;
    }

    const char = keysArray[index];
    sequenceArray.push(char);
  }
  console.log(sequenceArray);
}

function startGame() {
  actionButtons.forEach((element) => {
    if (
      element === currentElements.startButton ||
      element === currentElements.nextButton
    ) {
      element.classList.add("no-display");
    } else {
      element.classList.remove("no-display");
    }
  });
  gameState.liveCounter += 1;
  currentElements.currentRound.textContent = gameState.liveCounter;
  createSequense();
}

// Export
export { difficultySwap, startGame, createSequense };
