import { bestGifts } from '../../widgets/modal/modal.js';
import { createSlider } from '../../widgets/slider/slider.js';
import { createBurger } from '../../widgets/burger/burger.js';
import { COUNTDOWN_CONFIG } from '../../shared/constants/countdown-constants.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import {
  addClass,
  isScrolledPast,
  removeClass,
  selectElement,
  removeAllEventListeners,
} from '../../shared/utilities/dom-helpers.js';
import {
  createTargetDate,
  getTimeRemaining,
  padNumber,
} from '../../shared/utilities/date-utils.js';

const body = selectElement(SELECTORS.BODY);
const popoverWrapper = selectElement(SELECTORS.OVERLAY);

const days = selectElement(SELECTORS.COUNTDOWN_DAYS);
const hours = selectElement(SELECTORS.COUNTDOWN_HOURS);
const minutes = selectElement(SELECTORS.COUNTDOWN_MINUTES);
const seconds = selectElement(SELECTORS.COUNTDOWN_SECONDS);

let countdownInterval = null;
let popoverListener = null;

function countdown() {
  const targetDate = createTargetDate(
    COUNTDOWN_CONFIG.TARGET_MONTH,
    COUNTDOWN_CONFIG.TARGET_DAY,
    COUNTDOWN_CONFIG.TARGET_HOUR,
    COUNTDOWN_CONFIG.TARGET_MINUTE,
    COUNTDOWN_CONFIG.TARGET_SECOND,
  );
  const timeRemaining = getTimeRemaining(targetDate);

  days.innerText = padNumber(timeRemaining.days, 1);
  hours.innerText = padNumber(timeRemaining.hours, 1);
  minutes.innerText = padNumber(timeRemaining.minutes, 1);
  seconds.innerText = padNumber(timeRemaining.seconds, 1);
}

countdownInterval = window.setInterval(
  countdown,
  COUNTDOWN_CONFIG.UPDATE_INTERVAL,
);

const slider = createSlider();
const burger = createBurger();

bestGifts().catch((err) => console.log(err));

popoverListener = () => {
  removeClass(body, CSS_CLASSES.NO_SCROLL);
  removeClass(popoverWrapper, CSS_CLASSES.OVERLAY_OPEN);

  const buttonUp = selectElement('.scroll-top');
  if (buttonUp && isScrolledPast(UI_CONFIG.SCROLL_TOP_THRESHOLD)) {
    addClass(buttonUp, 'scroll-top--visible');
  }
};

popoverWrapper.addEventListener('click', popoverListener);

window.addEventListener('beforeunload', () => {
  if (countdownInterval) {
    window.clearInterval(countdownInterval);
  }
  if (slider && typeof slider.destroy === 'function') {
    slider.destroy();
  }
  if (burger && typeof burger.destroy === 'function') {
    burger.destroy();
  }
  if (popoverWrapper && popoverListener) {
    popoverWrapper.removeEventListener('click', popoverListener);
  }
  removeAllEventListeners(popoverWrapper);
});
