import { easy, medium, hard } from "./data.js";
import { domElements } from "./create-dom.js";

let gameState = {
  templateCellCounter: 0,
  currentCellCounter: 0,
  falseCellCounter: 0,
  difficulty: medium,
  currentPattern: medium.bird.array,
  horizontalNums: [],
  verticalNums: [],
};

function cellProcessing() {
  if (this.classList.contains("background--dark")) {
    this.classList.remove("background--dark");
    if (this.textContent === "1") {
      gameState.currentCellCounter -= 1;
    } else {
      gameState.falseCellCounter -= 1;
    }
  } else {
    this.classList.add("background--dark");
    if (this.textContent === "1") {
      gameState.currentCellCounter += 1;
    } else {
      gameState.falseCellCounter += 1;
    }
  }
  console.log(gameState.currentCellCounter);
  console.log(gameState.falseCellCounter);
  if (
    gameState.currentCellCounter === gameState.templateCellCounter &&
    gameState.falseCellCounter === 0
  ) {
    console.log("You win");
  }
}

function rotateMatrix(matrix) {
  const newMatrix = structuredClone(matrix);
  const matrixLength = matrix.length;

  let newArray = [];
  for (let i = 0; i < matrixLength; i += 1) {
    let temp = [];
    for (let j = 0; j < matrixLength; j += 1) {
      temp = [...temp, matrix[j][i]];
    }
    newArray = [...newArray, [...temp]];
  }
  for (let i = 0; i < newArray.length; i += 1) {
    for (let j = 0; j < newArray[0].length; j += 1) {
      newMatrix[i][j] = newArray[i][j];
    }
  }
  return newMatrix;
}

function countCells(array, numsArray) {
  for (let i = 0; i < array.length; i += 1) {
    let sum = [];
    let counter = 0;
    for (let j = 0; j < array[i].length; j += 1) {
      if (array[i][j] === 1) {
        counter += 1;
        if (array[i][j + 1] !== 1) {
          sum.push(counter);
          counter = 0;
        }
      }
    }
    numsArray.push(sum);
  }
}

function fullCellCounter(array) {
  let horizontalNums = [];
  let verticalNums = [];

  let rotatedArray = rotateMatrix(array);
  console.log(array);
  console.log(rotatedArray);

  countCells(array, horizontalNums);
  countCells(rotatedArray, verticalNums);

  gameState.horizontalNums = horizontalNums;
  gameState.verticalNums = verticalNums;
}

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
    parent.removeChild(parent.firstChild);
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
      newItem.addEventListener("click", cellProcessing);
    });
  });
}

function createInfo(array, parentElement, elementClass) {
  while (parentElement.firstChild) {
    parent.removeChild(parent.firstChild);
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
    parent.removeChild(parent.firstChild);
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
      type: "checkbox",
      parent: document.querySelector(`.${tempClass}`),
      id: key,
      classes: ["input-check"],
    });
    const newlabel = createElement({
      tag: "label",
      text: key,
      parent: document.querySelector(`.${tempClass}`),
      classes: ["input-label"],
    });
    newlabel.setAttribute("for", key);
  }
}

export { createElement, createCells, createInfo, createList, fullCellCounter };
export { gameState };
