// Import
import { createKeyboard, removeAllChildNodes } from "./create-elements.js";
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

// Export
export { difficultySwap };
