import { SLIDER_CONFIG } from '../../shared/constants/slider-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import {
  selectElement,
  addEventListener,
  addClass,
  removeClass,
  addEventListenerWithCleanup,
  removeAllEventListeners,
} from '../../shared/utilities/dom-helpers.js';

export class Slider {
  constructor(options = {}) {
    this.config = {
      stepCount: SLIDER_CONFIG.DEFAULT_STEP_COUNT,
      stepWidth: SLIDER_CONFIG.DEFAULT_STEP_WIDTH,
      mobileBreakpoint: SLIDER_CONFIG.MOBILE_BREAKPOINT,
      mobileStepCount: SLIDER_CONFIG.MOBILE_STEP_COUNT,
      ...options,
    };

    this.currentStep = 0;
    this.slider = null;
    this.buttonLeft = null;
    this.buttonRight = null;

    this.init();
  }

  init() {
    this.slider = selectElement(SELECTORS.SLIDER_TRACK);
    this.buttonLeft = selectElement(SELECTORS.SLIDER_BTN_LEFT);
    this.buttonRight = selectElement(SELECTORS.SLIDER_BTN_RIGHT);

    if (!this.slider || !this.buttonLeft || !this.buttonRight) {
      console.warn('Slider elements not found');
      return;
    }

    this.setupEventListeners();
    this.updateSliderState();
  }

  setupEventListeners() {
    addEventListenerWithCleanup(this.buttonLeft, 'click', () => this.moveLeft());
    addEventListenerWithCleanup(this.buttonRight, 'click', () => this.moveRight());
    addEventListenerWithCleanup(window, 'resize', () => this.handleResize());
  }

  calculateStepWidth() {
    if (window.innerWidth <= this.config.mobileBreakpoint) {
      this.config.stepCount = this.config.mobileStepCount;
    } else {
      this.config.stepCount = SLIDER_CONFIG.DEFAULT_STEP_COUNT;
    }
    this.config.stepWidth = Math.round(
      (this.slider.scrollWidth - this.slider.clientWidth) /
        this.config.stepCount,
    );
  }

  moveSlider() {
    const translateX = -this.currentStep * this.config.stepWidth;
    this.slider.style.transform = `translateX(${translateX}px)`;
    this.updateButtonStates();
  }

  updateButtonStates() {
    const sliderItems = this.slider.querySelectorAll('.slider__item');
    const maxStep = Math.max(0, sliderItems.length - 1);

    if (
      this.currentStep === 0 &&
      !this.buttonLeft.classList.contains(CSS_CLASSES.SLIDER_BTN_DISABLED)
    ) {
      addClass(this.buttonLeft, CSS_CLASSES.SLIDER_BTN_DISABLED);
    } else {
      removeClass(this.buttonLeft, CSS_CLASSES.SLIDER_BTN_DISABLED);
    }

    if (
      this.currentStep >= maxStep &&
      !this.buttonRight.classList.contains(CSS_CLASSES.SLIDER_BTN_DISABLED)
    ) {
      addClass(this.buttonRight, CSS_CLASSES.SLIDER_BTN_DISABLED);
    } else {
      removeClass(this.buttonRight, CSS_CLASSES.SLIDER_BTN_DISABLED);
    }
  }

  updateSliderState() {
    this.calculateStepWidth();
    this.moveSlider();
  }

  moveLeft() {
    this.calculateStepWidth();
    this.currentStep -= 1;
    if (this.currentStep < 0) this.currentStep = 0;
    this.moveSlider();
  }

  moveRight() {
    this.calculateStepWidth();
    const sliderItems = this.slider.querySelectorAll('.slider__item');
    const maxStep = Math.max(0, sliderItems.length - 1);

    this.currentStep += 1;
    if (this.currentStep > maxStep) this.currentStep = maxStep;
    this.moveSlider();
  }

  handleResize() {
    const translateX = -this.currentStep * this.config.stepWidth;
    this.slider.style.transform = `translateX(${translateX}px)`;
    this.currentStep = 0;
    addClass(this.buttonLeft, CSS_CLASSES.SLIDER_BTN_DISABLED);
    removeClass(this.buttonRight, CSS_CLASSES.SLIDER_BTN_DISABLED);
    this.calculateStepWidth();
  }

  destroy() {
    if (this.buttonLeft) {
      removeAllEventListeners(this.buttonLeft);
    }
    if (this.buttonRight) {
      removeAllEventListeners(this.buttonRight);
    }
    removeAllEventListeners(window);
  }
}

export function createSlider(options = {}) {
  return new Slider(options);
}