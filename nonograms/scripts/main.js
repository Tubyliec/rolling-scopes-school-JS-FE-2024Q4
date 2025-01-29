//Import
import { createDom } from "./create-dom.js";
import { domElements } from "./create-dom.js";
import { createList, createGame } from "./utilits.js";
import { gameState } from "./utilits.js";
//Game
createDom();
createGame();
createList(domElements.fieldset);
domElements.easyButton.classList.add("dif-btn--active");
document.getElementById("cross").checked = true;
