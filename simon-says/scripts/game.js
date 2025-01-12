// Import
import { createKeyboard, removeAllChildNodes } from "./create-elements.js";
import { currentElements, actionButtons, gameState } from "./create-dom.js";

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
    });
  });
}
//

function startGame() {
  actionButtons.forEach((element) => {
    if (!currentElements.startButton || !currentElements.nextButton) {
      element.classList.remove("no-display");
    }
  });
  gameState.liveCounter += 1;
  currentElements.currentRound.textContent = gameState.liveCounter;
}

// Export
export { difficultySwap, startGame };
