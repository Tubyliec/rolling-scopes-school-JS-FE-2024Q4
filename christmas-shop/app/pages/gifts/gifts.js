import { allGifts } from '../../widgets/modal/modal.js';
import { createBurger } from '../../widgets/burger/burger.js';
import { GIFT_CATEGORIES } from '../../shared/constants/api.js';
import {
  SELECTORS,
  CSS_CLASSES,
  UI_CONFIG,
} from '../../shared/constants/config.js';

const body = document.querySelector(SELECTORS.BODY);
const buttonUp = document.querySelector(SELECTORS.SCROLL_TOP);
const giftsContainer = document.querySelector(SELECTORS.GIFTS_LIST);

const filterButtonAll = document.querySelector(SELECTORS.FILTER_BUTTON_ALL);
const filterButtonWork = document.querySelector(SELECTORS.FILTER_BUTTON_WORK);
const filterButtonHealth = document.querySelector(
  SELECTORS.FILTER_BUTTON_HEALTH,
);
const filterButtonHarmony = document.querySelector(
  SELECTORS.FILTER_BUTTON_HARMONY,
);

const popoverWrapper = document.querySelector(SELECTORS.OVERLAY);

if (buttonUp) {
  window.addEventListener('scroll', function () {
    if (
      window.scrollY > UI_CONFIG.SCROLL_TOP_THRESHOLD ||
      document.documentElement.scrollTop > UI_CONFIG.SCROLL_TOP_THRESHOLD
    ) {
      buttonUp.classList.add(CSS_CLASSES.SCROLL_TOP_VISIBLE);
    } else {
      buttonUp.classList.remove(CSS_CLASSES.SCROLL_TOP_VISIBLE);
    }
  });

  buttonUp.addEventListener('click', function () {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
  });
}

filterButtonAll.classList.add(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);

createBurger();

allGifts(GIFT_CATEGORIES.ALL).catch((err) => console.log(err));

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

filterButtonAll.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.ALL).catch((err) => console.log(err));
  filterButtonHealth.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonWork.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonHarmony.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  this.classList.add(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

filterButtonWork.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_WORK).catch((err) => console.log(err));
  filterButtonAll.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonHealth.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonHarmony.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  this.classList.add(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

filterButtonHealth.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_HEALTH).catch((err) => console.log(err));
  filterButtonAll.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonWork.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonHarmony.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  this.classList.add(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

filterButtonHarmony.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts(GIFT_CATEGORIES.FOR_HARMONY).catch((err) => console.log(err));
  filterButtonAll.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonWork.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  filterButtonHealth.classList.remove(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
  this.classList.add(CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
});

popoverWrapper.addEventListener('click', () => {
  body.classList.remove(CSS_CLASSES.NO_SCROLL);
  popoverWrapper.classList.remove(CSS_CLASSES.OVERLAY_OPEN);

  if (buttonUp) {
    if (
      window.scrollY > UI_CONFIG.SCROLL_TOP_THRESHOLD ||
      document.documentElement.scrollTop > UI_CONFIG.SCROLL_TOP_THRESHOLD
    ) {
      buttonUp.classList.add(CSS_CLASSES.SCROLL_TOP_VISIBLE);
    }
  }
});
