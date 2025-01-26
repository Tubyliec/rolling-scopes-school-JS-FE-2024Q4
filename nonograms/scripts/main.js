//Import
import { createDom } from "./create-dom.js";
import { domElements } from "./create-dom.js";
import { createCells, createInfo, fullCellCounter } from "./utilits.js";
import { gameState } from "./utilits.js";
import { easy } from "./data.js";
//Game
createDom();
createCells(gameState.currentPattern, domElements.gameboard);
fullCellCounter(gameState.currentPattern);

createInfo(
  gameState.verticalNums,
  domElements.topInfo,
  gameState.currentPattern,
  "top-wrapper",
);

createInfo(
  gameState.verticalNums,
  domElements.leftInfo,
  gameState.currentPattern,
  "left-wrapper",
);
