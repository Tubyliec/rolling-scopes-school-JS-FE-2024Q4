//Import
import { createDom } from "./create-dom.js";
import { domElements } from "./create-dom.js";
import {
  createCells,
  createInfo,
  createList,
  fullCellCounter,
} from "./utilits.js";
import { gameState } from "./utilits.js";
import { easy } from "./data.js";
//Game
createDom();
createCells(gameState.currentPattern, domElements.gameboard);
fullCellCounter(gameState.currentPattern);

createInfo(gameState.verticalNums, domElements.topInfo, "top-wrapper");
createInfo(gameState.horizontalNums, domElements.leftInfo, "left-wrapper");

createList(domElements.fieldset);
