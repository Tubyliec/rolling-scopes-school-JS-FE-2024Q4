//Import
import { createDom } from "./create-dom.js";
import { domElements } from "./create-dom.js";
import { createCells } from "./utilits.js";
import { gameState } from "./utilits.js";
import { easy } from "./data.js";
//Game
createDom();
createCells(easy[0].array, domElements.gameboard);

if (gameState.currentCellCounter === gameState.templateCellCounter) {
  console.log("You win");
}
