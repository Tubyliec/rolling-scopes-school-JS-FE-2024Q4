// Create element
function createElement(options) {
  const { tag = "div", text = "", parent, classes = [], id = "" } = options;

  const element = document.createElement(tag);
  element.textContent = text;

  if (classes.length != 0) {
    element.classList.add(...classes);
  }

  if (id.length != 0) {
    element.id = id;
  }

  if (parent != null) {
    parent.appendChild(element);
  }

  return element;
}
// Create keyboard
function createKeyboard(array, parentElement) {
  array.forEach((element) => {
    const newItem = createElement({
      tag: "div",
      parent: parentElement,
      text: element,
      classes: ["key"],
    });
  });
}
// Export
export { createElement, createKeyboard };
