import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import {
  removeClass,
  selectElement,
  toggleClass,
  addEventListenerWithCleanup,
  removeAllEventListeners,
} from '../../shared/utilities/dom-helpers.js';

export class Burger {
  constructor(options = {}) {
    this.config = {
      body: null,
      burgerCheckbox: null,
      navigationPanel: null,
      menuPopup: null,
      ...options,
    };

    this.handleBurgerClick = () => {
      toggleClass(this.body, CSS_CLASSES.NO_SCROLL);
    };

    this.handleNavigationClick = (e) => {
      if (e.target.classList.contains(CSS_CLASSES.HEADER_NAV_LINK)) {
        this.closeMenu();
      }
    };

    this.handleResize = () => {
      this.closeMenu();
    };

    this.init();
  }

  init() {
    this.body = selectElement(SELECTORS.BODY);
    this.burgerCheckbox = selectElement(SELECTORS.HEADER_BURGER_CHECKBOX);
    this.navigationPanel = selectElement(SELECTORS.BURGER_MENU);
    this.menuPopup = selectElement(SELECTORS.BURGER_MENU_ID);

    if (
      !this.body ||
      !this.burgerCheckbox ||
      !this.navigationPanel ||
      !this.menuPopup
    ) {
      console.warn('Burger elements not found');
      return;
    }

    this.setupEventListeners();
  }

  setupEventListeners() {
    addEventListenerWithCleanup(this.burgerCheckbox, 'click', this.handleBurgerClick);

    addEventListenerWithCleanup(this.navigationPanel, 'click', this.handleNavigationClick);

    addEventListenerWithCleanup(window, 'resize', this.handleResize);
  }

  closeMenu() {
    removeClass(this.body, CSS_CLASSES.NO_SCROLL);
    this.menuPopup.hidePopover();
    this.burgerCheckbox.checked = false;
  }

  destroy() {
    if (this.burgerCheckbox) {
      removeAllEventListeners(this.burgerCheckbox);
    }
    if (this.navigationPanel) {
      removeAllEventListeners(this.navigationPanel);
    }
    removeAllEventListeners(window);
  }
}

export function createBurger(options = {}) {
  return new Burger(options);
}