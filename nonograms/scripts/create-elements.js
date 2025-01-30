//Import

import { domElements } from "./create-dom.js";
import { easy, medium, hard } from "./data.js";
import { gameState } from "./utilits.js";
import {
  processRightClick,
  fullCellCounter,
  processTimerEvent,
  stopTimer,
  resetTimer,
  processDifficulty,
  processRadio,
  processCell,
} from "./utilits.js";

//Creating elements

function createElement(options) {
  const {
    tag = "div",
    text = "",
    parent,
    classes = [],
    id = "",
    type = "text",
    name = "",
    value = "",
  } = options;
  const element = document.createElement(tag);
  element.textContent = text;
  if (classes.length != 0) {
    element.classList.add(...classes);
  }
  if (id.length != 0) {
    element.id = id;
  }
  if (value.length != 0) {
    element.value = value;
  }
  if (name.length != 0) {
    element.name = name;
  }
  if (type.length != 0) {
    element.type = type;
  }
  if (parent != null) {
    parent.appendChild(element);
  }
  return element;
}

function createCells(array, parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  if (gameState.difficulty === easy) {
    document.querySelector("body").style.setProperty("--cell-size", "5rem");
  } else if (gameState.difficulty === medium) {
    document.querySelector("body").style.setProperty("--cell-size", "3.5rem");
  } else {
    document.querySelector("body").style.setProperty("--cell-size", "2.5rem");
  }

  let counter = 0;
  array.forEach((element) => {
    counter += 1;
    const tempClass = `row-${counter}`;
    const newRow = createElement({
      tag: "div",
      parent: parentElement,
      classes: ["row", tempClass],
    });
    element.forEach((item) => {
      const newItem = createElement({
        tag: "div",
        parent: document.querySelector(`.${tempClass}`),
        text: item,
        classes: ["cell"],
      });
      if (item === 1) {
        gameState.templateCellCounter += 1;
      }
      newItem.addEventListener("click", processCell);
      newItem.addEventListener("click", processTimerEvent, {
        once: true,
      });
      newItem.addEventListener("contextmenu", processRightClick);
      newItem.addEventListener("contextmenu", processTimerEvent, {
        once: true,
      });
    });
  });
}

function createInfo(array, parentElement, elementClass) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  let counter = 0;
  array.forEach((element) => {
    counter += 1;
    const tempClass = `${elementClass}-${counter}`;
    const newItem = createElement({
      tag: "div",
      parent: parentElement,
      classes: [elementClass, tempClass],
    });
    element.forEach((item) => {
      const newItem = createElement({
        tag: "div",
        parent: document.querySelector(`.${tempClass}`),
        text: item,
        classes: ["info-nums"],
      });
    });
  });
}

function createList(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
  let counter = 0;
  for (let key in gameState.difficulty) {
    counter += 1;
    const tempClass = `checkbox-${counter}`;
    const newDiv = createElement({
      tag: "div",
      parent: parentElement,
      classes: ["list-checkbox", tempClass],
    });
    const newInput = createElement({
      tag: "input",
      type: "radio",
      name: "pattern",
      value: key,
      parent: document.querySelector(`.${tempClass}`),
      id: key,
      classes: ["input-radio"],
    });
    const newlabel = createElement({
      tag: "label",
      text: key,
      parent: document.querySelector(`.${tempClass}`),
      classes: ["input-label"],
    });
    newlabel.setAttribute("for", key);
    newInput.addEventListener("click", processRadio);
  }
}

function updateTime() {
  let minutes = 0;
  let seconds = 0;

  seconds++;

  gameState.timerElements[0].textContent = `${minutes.toString().padStart(2, "0")}`;
  gameState.timerElements[1].textContent = `${seconds.toString().padStart(2, "0")}`;
}

// Create game

function createGame() {
  gameState.templateCellCounter = 0;
  gameState.currentCellCounter = 0;
  gameState.falseCellCounter = 0;
  resetTimer();
  createCells(gameState.currentPattern, domElements.gameboard);
  fullCellCounter(gameState.currentPattern);
  createInfo(gameState.verticalNums, domElements.topInfo, "top-wrapper");
  createInfo(gameState.horizontalNums, domElements.leftInfo, "left-wrapper");
}

export {
  createGame,
  createElement,
  createCells,
  createInfo,
  createList,
  updateTime,
};
