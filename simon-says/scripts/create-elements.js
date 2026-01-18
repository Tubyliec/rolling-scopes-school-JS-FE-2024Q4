// Create element
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
// Create keyboard
function createKeyboard(array, parentElement) {
  array.forEach((element) => {
    const newItem = createElement({
      tag: "button",
      parent: parentElement,
      text: element,
      classes: ["key"],
    });
  });
}
// Remove childs
function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}
// Export
export { createElement, createKeyboard, removeAllChildNodes };
