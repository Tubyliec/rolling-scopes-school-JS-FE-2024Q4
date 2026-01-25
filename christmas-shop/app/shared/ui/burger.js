import { SELECTORS, CSS_CLASSES } from '../constants/config.js';

const body = document.querySelector(SELECTORS.BODY);

const burgerCheckbox = document.querySelector(SELECTORS.HEADER_BURGER_CHECKBOX);
const navigationPanel = document.querySelector(SELECTORS.BURGER_MENU);
const menuPopup = document.querySelector(SELECTORS.BURGER_MENU_ID);

burgerCheckbox.addEventListener('click', function () {
  body.classList.toggle(CSS_CLASSES.NO_SCROLL);
});

navigationPanel.addEventListener('click', function (e) {
  if (e.target.classList.contains(CSS_CLASSES.HEADER_NAV_LINK)) {
    body.classList.remove(CSS_CLASSES.NO_SCROLL);
    menuPopup.hidePopover();
    burgerCheckbox.checked = false;
  }
});

window.addEventListener('resize', () => {
  body.classList.remove(CSS_CLASSES.NO_SCROLL);
  menuPopup.hidePopover();
  burgerCheckbox.checked = false;
});
