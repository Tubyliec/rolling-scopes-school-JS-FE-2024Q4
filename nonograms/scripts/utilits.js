let gameState = {
  templateCellCounter: 0,
  currentCellCounter: 0,
  falseCellCounter: 0,
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

export { createElement, createCells };
export { gameState };
