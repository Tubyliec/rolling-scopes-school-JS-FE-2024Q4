// Import
import { createKeyboard, removeAllChildNodes } from "./create-elements.js";
import { currentElements, actionButtons, gameState } from "./create-dom.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";

// identifiers

let sequenceArray = [];
let keysArray = [];

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
// Disable buttons

function disableActionButtons(buttons) {
  buttons.forEach((element) => {
    if (
      element === currentElements.startButton ||
      element === currentElements.nextButton
    ) {
      element.classList.add("no-display");
    } else {
      element.classList.remove("no-display");
    }
  });
}

// Sequense

function showSequense(keys) {
  let index = 0;

  function showNext() {
    const key = keys[index];
    const transform = [{ background: "#ffb84d" }];
    const timing = {
      delay: 300,
      easing: "ease-out",
      duration: 1000,
    };
    if (index >= keys.length) {
      return;
    }
    const animation = key.animate(transform, timing);
    animation.onfinish = () => {
      index += 1;
      showNext();
    };
  }
  showNext();
}

function createSequense() {
  const sequenceLength = gameState.liveCounter * 2;
  const maxIndex = currentElements.keyboardWrapper.childElementCount;
  let currentArray = [];
  for (let i = 0; i < sequenceLength; i++) {
    const index = Math.floor(Math.random() * maxIndex);
    if (maxIndex === 10) {
      currentArray = numbersArray;
    } else if (maxIndex === 26) {
      currentArray = lettersArray;
    } else {
      currentArray = mixedArray;
    }
    sequenceArray.push(currentArray[index]);
    keysArray.push(currentElements.keyboardWrapper.childNodes[index]);
  }
  showSequense(keysArray);
}

// Game

function startGame() {
  disableActionButtons(actionButtons);
  gameState.liveCounter += 1;
  currentElements.currentRound.textContent = gameState.liveCounter;
  createSequense();
  console.log(sequenceArray);
  console.log(keysArray);
}

// Export
export { difficultySwap, startGame, createSequense };
