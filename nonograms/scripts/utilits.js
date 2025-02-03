//Import

import { easy, medium, hard, sounds } from "./data.js";
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
  difficultyButtons: [],
  controlButtons: [],
  toogleButtons: [],
  isSoundOn: true,
  isLightTheme: true,
  savedGame: {
    difficulty: "easy",
    pattern: "cross",
    array: [],
    savedArray: [],
    currentCellCounter: 0,
    falseCellCounter: 0,
    minutes: 0,
    seconds: 0,
  },
};

//Play sounds

function playSound(source) {
  const audio = new Audio(source);
  if (gameState.isSoundOn === true) {
    audio.play();
  }
}

//Save game

function saveGame() {
  domElements.continueButton.removeAttribute("disabled", "");
  gameState.savedGame.currentCellCounter = gameState.currentCellCounter;
  gameState.savedGame.falseCellCounter = gameState.falseCellCounter;
  gameState.savedGame.minutes = gameState.time.minutes;
  gameState.savedGame.seconds = gameState.time.seconds;
  gameState.savedGame.savedArray = gameState.savedGame.array;
  window.localStorage.setItem("savedGame", JSON.stringify(gameState.savedGame));
}

function loadGame() {
  const loadedState = JSON.parse(window.localStorage.getItem("savedGame"));

  gameState.savedGame.pattern = loadedState.pattern;
  gameState.savedGame.difficulty = loadedState.difficulty;

  gameState.difficultyButtons.forEach((element) => {
    if (element.textContent === gameState.savedGame.difficulty) {
      element.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    }
  });
  let patternsArray = document.querySelectorAll(".input-radio");
  patternsArray.forEach((element) => {
    if (element.value === gameState.savedGame.pattern) {
      element.dispatchEvent(
        new MouseEvent("click", { bubbles: true, cancelable: true }),
      );
    }
  });
  gameState.savedGame.savedArray = loadedState.savedArray;
  gameState.currentCellCounter = loadedState.currentCellCounter;
  gameState.falseCellCounter = loadedState.falseCellCounter;
  gameState.time.minutes = loadedState.minutes;
  gameState.time.seconds = loadedState.seconds;
  processTimerEvent();
}

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
    playSound(sounds.wipe);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
    if (this.textContent === "1") {
      gameState.currentCellCounter -= 1;
    } else {
      gameState.falseCellCounter -= 1;
    }
  } else {
    this.classList.add("background--dark");
    playSound(sounds.pencil);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] = 2;
    if (this.textContent === "1") {
      gameState.currentCellCounter += 1;
    } else {
      gameState.falseCellCounter += 1;
    }
  }
  if (this.classList.contains("cross--dark")) {
    this.classList.remove("cross--dark");
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
  }
  if (
    gameState.currentCellCounter === gameState.templateCellCounter &&
    gameState.falseCellCounter === 0
  ) {
    console.log("You win");
    stopTimer();
    createWinWindow(domElements.modalWindow);
    playSound(sounds.fanfare);
    domElements.modalWindow.showModal();
    domElements.board.classList.add("no-events");
    createRating();
  }
}

function processRightClick(event) {
  event.preventDefault();
  if (this.classList.contains("cross--dark")) {
    this.classList.remove("cross--dark");
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] =
      this.textContent;
    playSound(sounds.wipe);
  } else {
    this.classList.add("cross--dark");
    playSound(sounds.cross);
    gameState.savedGame.array[this.dataset.x - 1][this.dataset.y - 1] = 3;
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
  gameState.savedGame.difficulty = this.textContent;
  createList(domElements.fieldset);
}

function processRadio() {
  gameState.currentPattern = gameState.difficulty[this.value].array;
  gameState.savedGame.pattern = this.value;
  playSound(sounds.click);
  createGame();
}

function processToogle() {
  if (this.dataset.name === "audio") {
    this.checked === true
      ? (gameState.isSoundOn = false)
      : (gameState.isSoundOn = true);
  }
  if (this.dataset.name === "theme") {
    if (this.checked === true) {
      document.body.style.setProperty("--background-color", "#121212");
      document.body.style.setProperty("--primary-color", "#333333");
      document.body.style.setProperty("--border-color", "#f9f6f4");
      document.body.style.setProperty("--active-color", "#308eaf");
      document.body.style.setProperty("--dark-color", "#f9f6f4");
      document.body.style.setProperty("--panel-color", "#308eaf");
      document.body.style.setProperty("--light-color", "#121212");
      domElements.audioOnImg.style.setProperty(
        "background-image",
        `url("./assets/icons/volume-pr.png")`,
      );
      domElements.audioOffImg.style.setProperty(
        "background-image",
        `url("./assets/icons/volume-muted-pr.png")`,
      );
      domElements.themeOnImg.style.setProperty(
        "background-image",
        `url("./assets/icons/sun-icon-pr.png")`,
      );
      domElements.themeOffImg.style.setProperty(
        "background-image",
        `url("./assets/icons/moon-icon-pr.png")`,
      );
    } else {
      document.body.style.setProperty(
        "--background-color",
        "linear-gradient(90deg, rgba(249,246,244,1) 0%, rgba(249,244,246,1) 100%)",
      );
      document.body.style.removeProperty("--primary-color");
      document.body.style.removeProperty("--border-color");
      document.body.style.removeProperty("--dark-color");
      document.body.style.removeProperty("--active-color");
      document.body.style.removeProperty("--panel-color");
      document.body.style.removeProperty("--light-color");
      domElements.audioOnImg.style.removeProperty("background-image");
      domElements.audioOffImg.style.removeProperty("background-image");
      domElements.themeOnImg.style.removeProperty("background-image");
      domElements.themeOffImg.style.removeProperty("background-image");
    }
  }
}

function processControlButtons() {
  const cellArray = document.querySelectorAll(".cell");
  if (this === domElements.scoreButton) {
    createScoreTable(domElements.modalWindow);
    domElements.modalWindow.showModal();
  }
  if (this === domElements.solutionButton) {
    domElements.board.classList.add("no-events");
    domElements.saveButton.setAttribute("disabled", "");
    cellArray.forEach((element) => {
      element.classList.remove("background--dark");
      element.classList.remove("cross--dark");
      if (element.textContent == 1) {
        element.classList.add("background--dark");
      }
    });
  }
  if (this === domElements.resetButton) {
    domElements.saveButton.removeAttribute("disabled", "");
    cellArray.forEach((element) => {
      element.classList.remove("background--dark");
      element.classList.remove("cross--dark");
      gameState.currentCellCounter = 0;
      gameState.falseCellCounter = 0;
      resetTimer();
      domElements.board.classList.remove("no-events");
    });
  }
  if (this === domElements.randomButton) {
    function getRandomInt(max) {
      return Math.floor(Math.random() * max);
    }

    let randomDifficultyNumber = getRandomInt(3);
    let randomPatternNumber = getRandomInt(5);

    let randomDifficulty = gameState.difficultyButtons[randomDifficultyNumber];
    randomDifficulty.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );

    let patternsArray = document.querySelectorAll(".input-radio");
    let randomPattern = patternsArray[randomPatternNumber];
    randomPattern.dispatchEvent(
      new MouseEvent("click", { bubbles: true, cancelable: true }),
    );
  }
  if (this === domElements.saveButton) {
    saveGame();
  }
  if (this === domElements.continueButton) {
    loadGame();
    console.log(gameState.templateCellCounter);
    console.log(gameState.currentCellCounter);
    const cellArray = document.querySelectorAll(".cell");
    cellArray.forEach((element) => {
      element.classList.remove("background--dark");
      element.classList.remove("cross--dark");
      const xNum = element.dataset.x - 1;
      const yNum = element.dataset.y - 1;
      if (gameState.savedGame.savedArray[xNum][yNum] == 2) {
        element.classList.add("background--dark");
      }
      if (gameState.savedGame.savedArray[xNum][yNum] == 3) {
        element.classList.add("cross--dark");
      }
    });
  }
}

function buttonsSound() {
  if (this.classList.contains("dif-btn")) {
    playSound(sounds.button);
  }
  if (this.classList.contains("toogle-btn")) {
    playSound(sounds.switch);
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
  processToogle,
  countCells,
  removeAllChilds,
  refreshRating,
  buttonsSound,
};
export { gameState };
