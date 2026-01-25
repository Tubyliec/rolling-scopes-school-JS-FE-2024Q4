import { bestGifts } from '../../widgets/modal/modal.js';
import { createSlider } from '../../widgets/slider/slider.js';
import {
  COUNTDOWN_CONFIG,
  CSS_CLASSES,
  SELECTORS,
} from '../../shared/constants/config.js';

const body = document.querySelector(SELECTORS.BODY);
const popoverWrapper = document.querySelector(SELECTORS.OVERLAY);

const days = document.querySelector(SELECTORS.COUNTDOWN_DAYS);
const hours = document.querySelector(SELECTORS.COUNTDOWN_HOURS);
const minutes = document.querySelector(SELECTORS.COUNTDOWN_MINUTES);
const seconds = document.querySelector(SELECTORS.COUNTDOWN_SECONDS);

function countdown() {
  const currentDate = new Date();
  const targetDate = new Date(
    Date.UTC(
      currentDate.getFullYear() + 1,
      COUNTDOWN_CONFIG.TARGET_MONTH,
      COUNTDOWN_CONFIG.TARGET_DAY,
      COUNTDOWN_CONFIG.TARGET_HOUR,
      COUNTDOWN_CONFIG.TARGET_MINUTE,
      COUNTDOWN_CONFIG.TARGET_SECOND,
    ),
  );
  const remainingTime = targetDate - currentDate;
  const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
  const remainingHours = Math.floor(
    (remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60),
  );
  const remainingMinutes = Math.floor(
    (remainingTime % (1000 * 60 * 60)) / (1000 * 60),
  );
  const remainingSeconds = Math.floor((remainingTime % (1000 * 60)) / 1000);

  days.innerText = remainingDays.toString().padStart(1, '0');
  hours.innerText = remainingHours.toString().padStart(1, '0');
  minutes.innerText = remainingMinutes.toString().padStart(1, '0');
  seconds.innerText = remainingSeconds.toString().padStart(1, '0');
}

setInterval(countdown, COUNTDOWN_CONFIG.UPDATE_INTERVAL);

createSlider();

bestGifts().catch((err) => console.log(err));

popoverWrapper.addEventListener('click', () => {
  body.classList.remove(CSS_CLASSES.NO_SCROLL);
  popoverWrapper.classList.remove(CSS_CLASSES.OVERLAY_OPEN);

  const buttonUp = document.querySelector('.scroll-top');
  if (buttonUp) {
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
      buttonUp.classList.add('scroll-top--visible');
    }
  }
});
