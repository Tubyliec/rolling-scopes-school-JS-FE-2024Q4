import { allGifts } from '../../widgets/modal/modal.js';
import { createBurger } from '../../widgets/burger/burger.js';
import { GIFT_CATEGORIES } from '../../shared/constants/api.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import {
  selectElement,
  addClass,
  removeClass,
  removeChildNodes,
  scrollToTop,
  isScrolledPast,
  addEventListener,
  removeAllEventListeners,
} from '../../shared/utilities/dom-helpers.js';

const body = selectElement(SELECTORS.BODY);
const buttonUp = selectElement(SELECTORS.SCROLL_TOP);
const giftsContainer = selectElement(SELECTORS.GIFTS_LIST);

const filterButtonAll = selectElement(SELECTORS.FILTER_BUTTON_ALL);
const filterButtonWork = selectElement(SELECTORS.FILTER_BUTTON_WORK);
const filterButtonHealth = selectElement(SELECTORS.FILTER_BUTTON_HEALTH);
const filterButtonHarmony = selectElement(SELECTORS.FILTER_BUTTON_HARMONY);

const popoverWrapper = selectElement(SELECTORS.OVERLAY);

let burger = null;
let scrollListener = null;
let filterListeners = [];

burger = createBurger();

if (buttonUp) {
  scrollListener = function () {
    if (isScrolledPast(UI_CONFIG.SCROLL_TOP_THRESHOLD)) {
      addClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
    } else {
      removeClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
    }
  };
  
  addEventListener(window, 'scroll', scrollListener);

  addEventListener(buttonUp, 'click', function () {
    scrollToTop();
  });
}

addClass(filterButtonAll, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);

allGifts(GIFT_CATEGORIES.ALL).catch((err) => console.log(err));

const filterConfigs = [
  { button: filterButtonAll, category: GIFT_CATEGORIES.ALL },
  { button: filterButtonWork, category: GIFT_CATEGORIES.FOR_WORK },
  { button: filterButtonHealth, category: GIFT_CATEGORIES.FOR_HEALTH },
  { button: filterButtonHarmony, category: GIFT_CATEGORIES.FOR_HARMONY }
];

filterConfigs.forEach(config => {
  const listener = function () {
    removeChildNodes(giftsContainer);
    allGifts(config.category).catch((err) => console.log(err));
    
    filterConfigs.forEach(({ button }) => {
      removeClass(button, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
    });
    
    addClass(this, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  };
  
  addEventListener(config.button, 'click', listener);
  filterListeners.push({ element: config.button, listener });
});

addEventListener(popoverWrapper, 'click', () => {
  removeClass(body, CSS_CLASSES.NO_SCROLL);
  removeClass(popoverWrapper, CSS_CLASSES.OVERLAY_OPEN);

  if (buttonUp && isScrolledPast(UI_CONFIG.SCROLL_TOP_THRESHOLD)) {
    addClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
  }
});

window.addEventListener('beforeunload', () => {
  if (burger && typeof burger.destroy === 'function') {
    burger.destroy();
  }
  
  if (scrollListener) {
    window.removeEventListener('scroll', scrollListener);
  }
  
  if (buttonUp) {
    buttonUp.removeEventListener('click', scrollToTop);
  }
  
  filterListeners.forEach(({ element, listener }) => {
    element.removeEventListener('click', listener);
  });
  
  removeAllEventListeners(popoverWrapper);
});