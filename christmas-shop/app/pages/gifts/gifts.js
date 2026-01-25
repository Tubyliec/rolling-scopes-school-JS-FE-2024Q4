import { allGifts } from '../../widgets/modal/modal.js';
import { createBurger } from '../../widgets/burger/burger.js';
import { GIFT_CATEGORIES } from '../../shared/constants/api.js';
import {
  SELECTORS,
  CSS_CLASSES,
  UI_CONFIG,
} from '../../shared/constants/config.js';
import {
  selectElement,
  addClass,
  removeClass,
  removeChildNodes,
  scrollToTop,
  isScrolledPast,
  addEventListener,
} from '../../shared/utilities/dom-helpers.js';

const body = selectElement(SELECTORS.BODY);
const buttonUp = selectElement(SELECTORS.SCROLL_TOP);
const giftsContainer = selectElement(SELECTORS.GIFTS_LIST);

const filterButtonAll = selectElement(SELECTORS.FILTER_BUTTON_ALL);
const filterButtonWork = selectElement(SELECTORS.FILTER_BUTTON_WORK);
const filterButtonHealth = selectElement(SELECTORS.FILTER_BUTTON_HEALTH);
const filterButtonHarmony = selectElement(SELECTORS.FILTER_BUTTON_HARMONY);

const popoverWrapper = selectElement(SELECTORS.OVERLAY);

if (buttonUp) {
  addEventListener(window, 'scroll', function () {
    if (isScrolledPast(UI_CONFIG.SCROLL_TOP_THRESHOLD)) {
      addClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
    } else {
      removeClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
    }
  });

  addEventListener(buttonUp, 'click', function () {
    scrollToTop();
  });
}

addClass(filterButtonAll, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);

createBurger();

allGifts(GIFT_CATEGORIES.ALL).catch((err) => console.log(err));

addEventListener(filterButtonAll, 'click', function () {
  removeChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.ALL).catch((err) => console.log(err));
  removeClass(filterButtonHealth, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonWork, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonHarmony, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  addClass(this, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

addEventListener(filterButtonWork, 'click', function () {
  removeChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_WORK).catch((err) => console.log(err));
  removeClass(filterButtonAll, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonHealth, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonHarmony, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  addClass(this, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

addEventListener(filterButtonHealth, 'click', function () {
  removeChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_HEALTH).catch((err) => console.log(err));
  removeClass(filterButtonAll, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonWork, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonHarmony, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  addClass(this, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

addEventListener(filterButtonHarmony, 'click', function () {
  removeChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_HARMONY).catch((err) => console.log(err));
  removeClass(filterButtonAll, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonWork, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  removeClass(filterButtonHealth, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  addClass(this, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

addEventListener(popoverWrapper, 'click', () => {
  removeClass(body, CSS_CLASSES.NO_SCROLL);
  removeClass(popoverWrapper, CSS_CLASSES.OVERLAY_OPEN);

  if (buttonUp && isScrolledPast(UI_CONFIG.SCROLL_TOP_THRESHOLD)) {
    addClass(buttonUp, CSS_CLASSES.SCROLL_TOP_VISIBLE);
  }
});
