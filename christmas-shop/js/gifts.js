// Import
import { allGifts } from './modal.js';

// Identifiers
const body = document.body;
const buttonUp = document.querySelector('.button_top');
const giftsContainer = document.querySelector('.best_gifts');

const filterButtonAll = document.querySelector(
  '.buttons_panel_list li:nth-child(1)',
);
const filterButtonWork = document.querySelector(
  '.buttons_panel_list li:nth-child(2)',
);
const filterButtonHealth = document.querySelector(
  '.buttons_panel_list li:nth-child(3)',
);
const filterButtonHarmony = document.querySelector(
  '.buttons_panel_list li:nth-child(4)',
);

const popoverWrapper = document.querySelector('.popover_wrapper');

// Button to top

window.addEventListener('scroll', function () {
  if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
    buttonUp.classList.add('visible');
  } else {
    buttonUp.classList.remove('visible');
  }
});

buttonUp.addEventListener('click', function () {
  window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth',
  });
});

// Cards

filterButtonAll.classList.add('active_panel_items');

allGifts('All');

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

filterButtonAll.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('All');
  filterButtonHealth.classList.remove('active_panel_items');
  filterButtonWork.classList.remove('active_panel_items');
  filterButtonHarmony.classList.remove('active_panel_items');
  this.classList.add('active_panel_items');
});

filterButtonWork.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Work');
  filterButtonAll.classList.remove('active_panel_items');
  filterButtonHealth.classList.remove('active_panel_items');
  filterButtonHarmony.classList.remove('active_panel_items');
  this.classList.add('active_panel_items');
});

filterButtonHealth.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Health');
  filterButtonAll.classList.remove('active_panel_items');
  filterButtonWork.classList.remove('active_panel_items');
  filterButtonHarmony.classList.remove('active_panel_items');
  this.classList.add('active_panel_items');
});

filterButtonHarmony.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Harmony');
  filterButtonAll.classList.remove('active_panel_items');
  filterButtonWork.classList.remove('active_panel_items');
  filterButtonHealth.classList.remove('active_panel_items');
  this.classList.add('active_panel_items');
});

popoverWrapper.addEventListener('click', () => {
  body.classList.remove('no_scroll');
  popoverWrapper.classList.remove('wrapper_open');
});
