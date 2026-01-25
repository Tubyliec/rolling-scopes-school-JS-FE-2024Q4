import { SELECTORS, CSS_CLASSES } from '../../shared/constants/config.js';

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
      this.body.classList.toggle(CSS_CLASSES.NO_SCROLL);
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
    this.body = document.querySelector(SELECTORS.BODY);
    this.burgerCheckbox = document.querySelector(
      SELECTORS.HEADER_BURGER_CHECKBOX,
    );
    this.navigationPanel = document.querySelector(SELECTORS.BURGER_MENU);
    this.menuPopup = document.querySelector(SELECTORS.BURGER_MENU_ID);

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
    this.burgerCheckbox.addEventListener('click', this.handleBurgerClick);

    this.navigationPanel.addEventListener('click', this.handleNavigationClick);

    window.addEventListener('resize', this.handleResize);
  }

  closeMenu() {
    this.body.classList.remove(CSS_CLASSES.NO_SCROLL);
    this.menuPopup.hidePopover();
    this.burgerCheckbox.checked = false;
  }

  destroy() {
    if (this.burgerCheckbox) {
      this.burgerCheckbox.removeEventListener('click', this.handleBurgerClick);
    }
    if (this.navigationPanel) {
      this.navigationPanel.removeEventListener(
        'click',
        this.handleNavigationClick,
      );
    }
    window.removeEventListener('resize', this.handleResize);
  }
}

export function createBurger(options = {}) {
  return new Burger(options);
}
