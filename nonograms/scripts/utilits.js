import { easy } from "./data.js";

let gameState = {
  templateCellCounter: 0,
  currentCellCounter: 0,
  falseCellCounter: 0,
  currentPattern: easy[0].array,
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
  const newMatrix = matrix;
  const matrixLength = matrix.length;

  let array = [];
  for (let i = 0; i < matrixLength; i += 1) {
    let temp = [];
    for (let j = matrixLength - 1; j >= 0; j -= 1) {
      temp = [...temp, matrix[j][i]];
    }
    array = [...array, [...temp]];
  }
  for (let i = 0; i < array.length; i += 1) {
    for (let j = 0; j < array[0].length; j += 1) {
      newMatrix[i][j] = array[i][j];
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
  if (parent != null) {
    parent.appendChild(element);
  }
  return element;
}

function createCells(array, parentElement) {
  array.forEach((element) => {
    element.forEach((item) => {
      const newItem = createElement({
        tag: "div",
        parent: parentElement,
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

function createInfo(array, parentElement, pattern, elementClass) {
  let counter = 0;
  console.log(array);
  array.forEach((element) => {
    counter += 1;
    const tempClass = `${elementClass}__${counter}`;
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

export { createElement, createCells, createInfo, fullCellCounter };
export { gameState };
