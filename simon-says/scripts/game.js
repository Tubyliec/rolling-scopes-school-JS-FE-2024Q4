// Import
import { createKeyboard, removeAllChildNodes } from "./create-elements.js";
import {
  currentElements,
  actionButtons,
  gameState,
  allKeys,
} from "./create-dom.js";
import { numbersArray, lettersArray, mixedArray } from "./data.js";

// identifiers

let sequenceArray = [];
let keysArray = [];
let inputArray = [];

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
function resetButtons(buttons) {
  buttons.forEach((element) => {
    if (element === currentElements.startButton) {
      element.classList.remove("no-display");
    } else {
      element.classList.add("no-display");
    }
  });
}

function disableDifficultyButtons() {
  if (gameState.playing === true) {
    currentElements.difficultyPanel.classList.add("no-events");
  }
}
function enableDifficultyButtons() {
  if (gameState.playing === false) {
    currentElements.difficultyPanel.classList.remove("no-events");
  }
}

function disableKeys(keys) {
  for (let i = 0; i < keys.length; i++) {
    keys[i].disabled = true;
  }
}

function enableKeys(keys) {
  for (let i = 0; i < keys.length; i++) {
    keys[i].disabled = false;
  }
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

function mouseInput(keys) {
  for (let key of keys) {
    key.addEventListener("click", function () {
      inputArray.push(key.textContent);
    });
  }
  for (let i = 0; i <= sequenceArray.lenght; i++) {
    if (inputArray[i] === sequenceArray[i]) {
      console.log(inputArray[i].textContent);
      console.log(currentElements.inputField.value);
      currentElements.inputField.value = inputArray[i];
    }
  }
}

// Game

function startRound() {
  disableKeys(allKeys);
  disableKeys(actionButtons);
  gameState.liveCounter += 1;
  currentElements.currentRound.textContent = gameState.liveCounter;
  createSequense();
  console.log(sequenceArray);
  setTimeout(
    () => {
      enableKeys(allKeys);
    },
    1400 * 2 * gameState.liveCounter,
  );
  setTimeout(
    () => {
      enableKeys(actionButtons);
    },
    1400 * 2 * gameState.liveCounter,
  );
  mouseInput(allKeys);
}

function startGame() {
  gameState.liveCounter = 0;
  gameState.playing = true;
  disableDifficultyButtons();
  disableActionButtons(actionButtons);
  startRound();
}
// Repeat

function repeatSequence() {
  disableKeys(allKeys);
  showSequense(keysArray);
  setTimeout(
    () => {
      enableKeys(allKeys);
    },
    1400 * 2 * gameState.liveCounter,
  );
  currentElements.repeatButton.disabled = true;
}

function resetGame() {
  gameState.liveCounter = 0;
  sequenceArray = [];
  keysArray = [];
  currentElements.currentRound.textContent = gameState.liveCounter;
  gameState.playing = false;
  enableDifficultyButtons();
  resetButtons(actionButtons);
}

// Export
export {
  difficultySwap,
  startGame,
  createSequense,
  disableKeys,
  repeatSequence,
  resetGame,
  sequenceArray,
  keysArray,
};
