// Slider configuration
export const SLIDER_CONFIG = {
  DEFAULT_STEP_COUNT: 3,
  MOBILE_STEP_COUNT: 6,
  DEFAULT_STEP_WIDTH: 178,
  MOBILE_BREAKPOINT: 768,
};

// Countdown configuration
export const COUNTDOWN_CONFIG = {
  UPDATE_INTERVAL: 1000, // milliseconds
  TARGET_MONTH: 0, // January (0-indexed)
  TARGET_DAY: 1, // January 1st
  TARGET_HOUR: 0,
  TARGET_MINUTE: 0,
  TARGET_SECOND: 0,
};

// UI configuration
export const UI_CONFIG = {
  SCROLL_TOP_THRESHOLD: 300,
  RANDOM_GIFTS_COUNT: 4,
  MODAL_ANIMATION_DURATION: 300, // milliseconds (if needed)
};

// CSS classes
export const CSS_CLASSES = {
  OVERLAY: 'overlay',
  OVERLAY_OPEN: 'overlay--open',
  MODAL: 'modal',
  MODAL_CLOSE: 'modal__close',
  MODAL_CONTENT: 'modal__content',
  NO_SCROLL: 'no-scroll',
  GIFTS_ITEM: 'gifts__item',
  GIFTS_LIST: 'gifts__list',
  GIFTS_IMAGE: 'gifts__image',
  GIFTS_DESCRIPTION: 'gifts__description',
  GIFTS_DESCRIPTION_WRAPPER: 'gifts__description-wrapper',
  SCROLL_TOP: 'scroll-top',
  SCROLL_TOP_VISIBLE: 'scroll-top--visible',
  SLIDER_TRACK: 'slider__track',
  SLIDER_BTN_LEFT: 'slider__btn--left',
  SLIDER_BTN_RIGHT: 'slider__btn--right',
  SLIDER_BTN_DISABLED: 'disabled',
  BUTTONS_PANEL_ITEM: 'buttons-panel__item',
  BUTTONS_PANEL_ITEM_ACTIVE: 'buttons-panel__item--active',
  HEADER_BURGER_CHECKBOX: 'header__burger-checkbox',
  HEADER_NAV_LINK: 'header__nav-link',
  BURGER_MENU: 'burger-menu',
  MODAL_IMAGE: 'modal__image',
  MODAL_DESCRIPTION: 'modal__description',
  MODAL_DESCRIPTION_WRAPPER: 'modal__description-wrapper',
  MODAL_POWERS: 'modal__powers',
  MODAL_POWERS_LIST: 'modal__powers-list',
  MODAL_POWERS_RATE: 'modal__powers-rate',
  MODAL_SNOWFLAKES: 'modal__snowflakes',
  POWERS_NAME: 'powers_name',
};

// Selectors
export const SELECTORS = {
  BODY: 'body',
  OVERLAY: '.overlay',
  MODAL: '.modal',
  GIFTS_LIST: '.gifts__list',
  SCROLL_TOP: '.scroll-top',
  SLIDER_TRACK: '.slider__track',
  SLIDER_BTN_LEFT: '.slider__btn--left',
  SLIDER_BTN_RIGHT: '.slider__btn--right',
  FILTER_BUTTON_ALL: '.filter ul li:nth-child(1)',
  FILTER_BUTTON_WORK: '.filter ul li:nth-child(2)',
  FILTER_BUTTON_HEALTH: '.filter ul li:nth-child(3)',
  FILTER_BUTTON_HARMONY: '.filter ul li:nth-child(4)',
  HEADER_BURGER_CHECKBOX: '.header__burger-checkbox',
  BURGER_MENU: '.burger-menu',
  BURGER_MENU_ID: '#burger-menu',
  HEADER_NAV_LINK: '.header__nav-link',
  COUNTDOWN_DAYS: '.days',
  COUNTDOWN_HOURS: '.hours',
  COUNTDOWN_MINUTES: '.minutes',
  COUNTDOWN_SECONDS: '.seconds',
};

// Superpower categories
export const SUPERPOWER_CATEGORIES = {
  LIVE: 'live',
  CREATE: 'create',
  LOVE: 'love',
  DREAM: 'dream',
};
