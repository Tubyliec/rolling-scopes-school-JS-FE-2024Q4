export function selectElement(selector) {
  return document.querySelector(selector);
}

export function selectElements(selector) {
  return document.querySelectorAll(selector);
}

export function addClass(element, className) {
  if (element) {
    element.classList.add(className);
  }
}

export function removeClass(element, className) {
  if (element) {
    element.classList.remove(className);
  }
}

export function toggleClass(element, className) {
  if (element) {
    element.classList.toggle(className);
  }
}

export function hasClass(element, className) {
  return element ? element.classList.contains(className) : false;
}

export function removeChildNodes(parent) {
  while (parent && parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

export function scrollToTop(options = {}) {
  const { behavior = 'smooth' } = options;
  window.scrollTo({
    top: 0,
    left: 0,
    behavior,
  });
}

export function isScrolledPast(threshold = 300) {
  return (
    window.scrollY > threshold || document.documentElement.scrollTop > threshold
  );
}

export function createElement(tag, className = '', innerHTML = '') {
  const element = document.createElement(tag);
  if (className) {
    element.className = className;
  }
  if (innerHTML) {
    element.innerHTML = innerHTML;
  }
  return element;
}

export function addEventListener(element, event, handler, options = {}) {
  if (element) {
    element.addEventListener(event, handler, options);
  }
}

export function removeEventListener(element, event, handler, options = {}) {
  if (element) {
    element.removeEventListener(event, handler, options);
  }
}
