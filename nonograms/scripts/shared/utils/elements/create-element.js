export function createElement(options) {
  const {
    tag = 'div',
    text = '',
    parent,
    classes = [],
    id = '',
    type = 'text',
    name = '',
    value = '',
  } = options;
  const element = document.createElement(tag);
  element.textContent = text;
  if (classes.length !== 0) {
    element.classList.add(...classes);
  }
  if (id.length !== 0) {
    element.id = id;
  }
  if (value.length !== 0) {
    element.value = value;
  }
  if (name.length !== 0) {
    element.name = name;
  }
  if (type.length !== 0) {
    element.type = type;
  }
  if (parent != null) {
    parent.appendChild(element);
  }
  return element;
}