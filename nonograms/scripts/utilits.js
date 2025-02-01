//Import

import { easy, medium, hard } from "./data.js";
import { domElements } from "./create-dom.js";
import {
  createList,
  createGame,
  createWinWindow,
  createScoreTable,
} from "./create-elements.js";

//Identifiers

let gameState = {
  templateCellCounter: 0,
  currentCellCounter: 0,
  falseCellCounter: 0,
  difficulty: easy,
  currentPattern: easy.cross.array,
  horizontalNums: [],
  verticalNums: [],
  difficultyButtons: [],
  timerElements: [],
  timerState: undefined,
  time: {
    minutes: 0,
    seconds: 0,
  },
  scoreItem: {
    name: null,
    difficulty: null,
    time: null,
    minutes: null,
    seconds: null,
  },
  ratingList: [],
  controlButtons: [],
};

//Score
function createRating() {
  document.querySelectorAll(".input-radio").forEach((element) => {
    if (element.checked === true) {
      gameState.scoreItem.name = element.value;
    }
  });
  gameState.difficultyButtons.forEach((element) => {
    if (element.classList.contains("dif-btn--active")) {
      gameState.scoreItem.difficulty = element.textContent;
    }
  });
  refreshRating();

  gameState.ratingList.push(gameState.scoreItem);
  window.localStorage.setItem(
    "ratingList",
    JSON.stringify(gameState.ratingList),
  );
}

function refreshRating() {
  gameState.scoreItem.minutes = gameState.time.minutes;
  gameState.scoreItem.seconds = gameState.time.seconds;
  gameState.scoreItem.time = `${gameState.time.minutes.toString().padStart(2, "0")} : ${gameState.time.seconds.toString().padStart(2, "0")}`;

  gameState.ratingList = JSON.parse(window.localStorage.getItem("ratingList"));
  if (!gameState.ratingList) {
    gameState.ratingList = [];
  }
  if (gameState.ratingList.length > 1) {
    gameState.ratingList.sort(function (a, b) {
      let aValue = a.minutes * 60 + a.seconds;
      let bValue = b.minutes * 60 + b.seconds;
      return aValue - bValue;
    });
  }
  if (gameState.ratingList.length === 5) {
    gameState.ratingList = gameState.ratingList.slice(0, 4);
  }
}
//Timer

function startTimer() {
  gameState.time.seconds += 1;
  if (gameState.time.seconds === 60) {
    gameState.time.minutes += 1;
    gameState.time.seconds = 0;
  }
  gameState.timerElements[0].textContent = `${gameState.time.minutes.toString().padStart(2, "0")}`;
  gameState.timerElements[1].textContent = `${gameState.time.seconds.toString().padStart(2, "0")}`;
}

function processTimerEvent() {
  if (gameState.timerState === undefined) {
    gameState.timerState = setInterval(startTimer, 1000);
  }
}

function stopTimer() {
  clearInterval(gameState.timerState);
}

function resetTimer() {
  stopTimer();
  gameState.timerState = undefined;
  gameState.time.minutes = 0;
  gameState.time.seconds = 0;
  gameState.timerElements[0].textContent = `${gameState.time.minutes.toString().padStart(2, "0")}`;
  gameState.timerElements[1].textContent = `${gameState.time.seconds.toString().padStart(2, "0")}`;
}

//Processing elements

function processCell() {
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
  if (this.classList.contains("cross--dark")) {
    this.classList.remove("cross--dark");
  }
  console.log(gameState.currentCellCounter);
  console.log(gameState.falseCellCounter);
  if (
    gameState.currentCellCounter === gameState.templateCellCounter &&
    gameState.falseCellCounter === 0
  ) {
    console.log("You win");
    stopTimer();
    createWinWindow(domElements.modalWindow);
    domElements.modalWindow.showModal();
    domElements.board.classList.add("no-events");
    createRating();
  }
}

function processRightClick(event) {
  event.preventDefault();
  if (this.classList.contains("cross--dark")) {
    this.classList.remove("cross--dark");
  } else {
    this.classList.add("cross--dark");
  }
  if (this.classList.contains("background--dark")) {
    this.classList.remove("background--dark");
    if (this.textContent === "1") {
      gameState.currentCellCounter -= 1;
    } else {
      gameState.falseCellCounter -= 1;
    }
  }
}

function processDifficulty() {
  gameState.difficultyButtons.forEach((element) => {
    element.classList.remove("dif-btn--active");
  });
  this.classList.add("dif-btn--active");
  gameState.difficulty = eval(this.textContent);
  createList(domElements.fieldset);
}

function processRadio() {
  gameState.currentPattern = gameState.difficulty[this.value].array;
  createGame();
}
//Process buttons
function processControlButtons() {
  if (this === domElements.scoreButton) {
    createScoreTable(domElements.modalWindow);
    domElements.modalWindow.showModal();
  }
}
//Accessory utils

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

  countCells(array, horizontalNums);
  countCells(rotatedArray, verticalNums);

  gameState.horizontalNums = horizontalNums;
  gameState.verticalNums = verticalNums;
}

function removeAllChilds(parentElement) {
  while (parentElement.firstChild) {
    parentElement.removeChild(parentElement.firstChild);
  }
}

//Export

export {
  processRightClick,
  fullCellCounter,
  processTimerEvent,
  stopTimer,
  resetTimer,
  processDifficulty,
  processRadio,
  processCell,
  processControlButtons,
  countCells,
  removeAllChilds,
  refreshRating,
};
export { gameState };
