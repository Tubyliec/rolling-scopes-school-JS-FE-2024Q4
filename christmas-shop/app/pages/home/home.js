import { bestGifts } from '../../widgets/modal/modal.js';
import { createSlider } from '../../widgets/slider/slider.js';
import { createBurger } from '../../widgets/burger/burger.js';
import {
  COUNTDOWN_CONFIG,
  CSS_CLASSES,
  SELECTORS,
} from '../../shared/constants/config.js';
import {
  addClass,
  isScrolledPast,
  removeClass,
  selectElement,
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

window.setInterval(countdown, COUNTDOWN_CONFIG.UPDATE_INTERVAL);

createSlider();

createBurger();

bestGifts().catch((err) => console.log(err));

popoverWrapper.addEventListener('click', () => {
  removeClass(body, CSS_CLASSES.NO_SCROLL);
  removeClass(popoverWrapper, CSS_CLASSES.OVERLAY_OPEN);

  const buttonUp = selectElement('.scroll-top');
  if (buttonUp && isScrolledPast(300)) {
    addClass(buttonUp, 'scroll-top--visible');
  }
});