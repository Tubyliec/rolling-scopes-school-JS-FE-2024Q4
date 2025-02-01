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
  removeAllChilds,
  refreshRating,
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
  removeAllChilds(parentElement);
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
  removeAllChilds(parentElement);
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
  removeAllChilds(parentElement);
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

function createWinWindow(parentElement) {
  removeAllChilds(parentElement);
  domElements.modalInfo = createElement({
    tag: "div",
    parent: parentElement,
    classes: ["modal-info"],
  });

  domElements.modalInfoText = createElement({
    tag: "p",
    text: `Great! You have solved the nonogram in ${gameState.time.minutes * 60 + gameState.time.seconds} seconds!`,
    parent: domElements.modalInfo,
    classes: ["modal-info__text"],
  });

  domElements.modalCLose = createElement({
    tag: "button",
    text: "close",
    parent: domElements.modalInfo,
    classes: ["modal-btn", "dif-btn"],
  });

  domElements.modalCLose.addEventListener("click", () => {
    domElements.modalWindow.close();
  });
}

function createScoreTable(parentElement) {
  removeAllChilds(parentElement);
  refreshRating();
  domElements.scoreWrapper = createElement({
    tag: "div",
    parent: parentElement,
    classes: ["score-wrapper"],
  });
  domElements.scoreName = createElement({
    tag: "p",
    parent: domElements.scoreWrapper,
    text: "score table",
    classes: ["score-table__name"],
  });
  domElements.scoreTable = createElement({
    tag: "div",
    parent: domElements.scoreWrapper,
    classes: ["score-table"],
  });
  domElements.scoreTableBody = createElement({
    tag: "div",
    parent: domElements.scoreTable,
    classes: ["table-body"],
  });

  domElements.scoreTableHeader = createElement({
    tag: "div",
    parent: domElements.scoreTableBody,
    classes: ["score-table__header", "table-row"],
  });
  domElements.scoreTableHeaderName = createElement({
    tag: "p",
    text: "name",
    parent: domElements.scoreTableHeader,
    classes: ["header-name", "table-item"],
  });
  domElements.scoreTableHeaderDifficulty = createElement({
    tag: "p",
    text: "difficulty",
    parent: domElements.scoreTableHeader,
    classes: ["header-difficulty", "table-item"],
  });
  domElements.scoreTableHeaderTime = createElement({
    tag: "p",
    text: "time",
    parent: domElements.scoreTableHeader,
    classes: ["header-time", "table-item"],
  });

  gameState.ratingList.forEach((element) => {
    let counter = 0;
    counter += 1;
    const tempClass = `rating-row-${counter}`;
    const newRow = createElement({
      tag: "div",
      parent: domElements.scoreTableBody,
      classes: ["table-row", tempClass],
    });
    for (let i = 0; i < 3; i += 1) {
      console.log(element);
      let text = "";
      if (i === 0) {
        text = element.name;
      } else if (i === 1) {
        text = element.difficulty;
      } else {
        text = element.time;
      }
      const newItem = createElement({
        tag: "div",
        text: text,
        parent: newRow,
        classes: ["table-item"],
      });
    }
  });

  domElements.modalCLose = createElement({
    tag: "button",
    text: "close",
    parent: domElements.scoreWrapper,
    classes: ["modal-btn", "dif-btn"],
  });

  domElements.modalCLose.addEventListener("click", () => {
    domElements.modalWindow.close();
  });
}

// Create game

function createGame() {
  gameState.templateCellCounter = 0;
  gameState.currentCellCounter = 0;
  gameState.falseCellCounter = 0;
  resetTimer();
  domElements.board.classList.remove("no-events");
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
  createWinWindow,
  createScoreTable,
};
