import { bestGifts } from '../../shared/ui/modal.js';
import {
  SELECTORS,
  CSS_CLASSES,
  SLIDER_CONFIG,
  COUNTDOWN_CONFIG,
} from '../../shared/constants/config.js';

const body = document.querySelector(SELECTORS.BODY);
const popoverWrapper = document.querySelector(SELECTORS.OVERLAY);

const days = document.querySelector(SELECTORS.COUNTDOWN_DAYS);
const hours = document.querySelector(SELECTORS.COUNTDOWN_HOURS);
const minutes = document.querySelector(SELECTORS.COUNTDOWN_MINUTES);
const seconds = document.querySelector(SELECTORS.COUNTDOWN_SECONDS);

const slider = document.querySelector(SELECTORS.SLIDER_TRACK);
const buttonLeft = document.querySelector(SELECTORS.SLIDER_BTN_LEFT);
const buttonRight = document.querySelector(SELECTORS.SLIDER_BTN_RIGHT);

let currentStep = 0;
let stepCount = SLIDER_CONFIG.DEFAULT_STEP_COUNT;
let stepWidth = SLIDER_CONFIG.DEFAULT_STEP_WIDTH;

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

buttonLeft.classList.add(CSS_CLASSES.SLIDER_BTN_DISABLED);

function widthCount() {
  window.innerWidth <= SLIDER_CONFIG.MOBILE_BREAKPOINT
    ? (stepCount = SLIDER_CONFIG.MOBILE_STEP_COUNT)
    : (stepCount = SLIDER_CONFIG.DEFAULT_STEP_COUNT);
  stepWidth = Math.round((slider.scrollWidth - slider.clientWidth) / stepCount);
}

function moveSlider() {
  slider.style.left = -currentStep * stepWidth + 'px';
  if (
    currentStep === 0 &&
    !buttonLeft.classList.contains(CSS_CLASSES.SLIDER_BTN_DISABLED)
  ) {
    buttonLeft.classList.add(CSS_CLASSES.SLIDER_BTN_DISABLED);
  } else {
    buttonLeft.classList.remove(CSS_CLASSES.SLIDER_BTN_DISABLED);
  }
  if (
    currentStep === stepCount &&
    !buttonRight.classList.contains(CSS_CLASSES.SLIDER_BTN_DISABLED)
  ) {
    buttonRight.classList.add(CSS_CLASSES.SLIDER_BTN_DISABLED);
  } else {
    buttonRight.classList.remove(CSS_CLASSES.SLIDER_BTN_DISABLED);
  }
}

buttonLeft.addEventListener('click', () => {
  widthCount();
  currentStep -= 1;
  if (currentStep < 0) currentStep = 0;
  moveSlider();
});

buttonRight.addEventListener('click', () => {
  widthCount();
  currentStep += 1;
  if (currentStep > stepCount) currentStep = stepCount;
  moveSlider();
});

window.addEventListener('resize', () => {
  slider.style.left = `-${currentStep * stepWidth}px`;
  currentStep = 0;
  buttonLeft.classList.add(CSS_CLASSES.SLIDER_BTN_DISABLED);
  buttonRight.classList.remove(CSS_CLASSES.SLIDER_BTN_DISABLED);
});

bestGifts().catch((err) => console.log(err));

popoverWrapper.addEventListener('click', () => {
  body.classList.remove(CSS_CLASSES.NO_SCROLL);
  popoverWrapper.classList.remove(CSS_CLASSES.OVERLAY_OPEN);
});
