// Import
import { allGifts } from '../../shared/ui/modal.js';

// Identifiers
const body = document.body;
const buttonUp = document.querySelector('.scroll-top');
const giftsContainer = document.querySelector('.gifts__list');

const filterButtonAll = document.querySelector('.filter ul li:nth-child(1)');
const filterButtonWork = document.querySelector('.filter ul li:nth-child(2)');
const filterButtonHealth = document.querySelector('.filter ul li:nth-child(3)');
const filterButtonHarmony = document.querySelector(
  '.filter ul li:nth-child(4)',
);

const popoverWrapper = document.querySelector('.overlay');

// Button to top

if (buttonUp) {
  window.addEventListener('scroll', function () {
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
      buttonUp.classList.add('scroll-top--visible');
    } else {
      buttonUp.classList.remove('scroll-top--visible');
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

// Cards

filterButtonAll.classList.add('buttons-panel__item--active');

allGifts('All').catch((err) => console.log(err));

function removeAllChildNodes(parent) {
  while (parent.firstChild) {
    parent.removeChild(parent.firstChild);
  }
}

filterButtonAll.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('All').catch((err) => console.log(err));
  filterButtonHealth.classList.remove('buttons-panel__item--active');
  filterButtonWork.classList.remove('buttons-panel__item--active');
  filterButtonHarmony.classList.remove('buttons-panel__item--active');
  this.classList.add('buttons-panel__item--active');
});

filterButtonWork.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Work').catch((err) => console.log(err));
  filterButtonAll.classList.remove('buttons-panel__item--active');
  filterButtonHealth.classList.remove('buttons-panel__item--active');
  filterButtonHarmony.classList.remove('buttons-panel__item--active');
  this.classList.add('buttons-panel__item--active');
});

filterButtonHealth.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Health').catch((err) => console.log(err));
  filterButtonAll.classList.remove('buttons-panel__item--active');
  filterButtonWork.classList.remove('buttons-panel__item--active');
  filterButtonHarmony.classList.remove('buttons-panel__item--active');
  this.classList.add('buttons-panel__item--active');
});

filterButtonHarmony.addEventListener('click', function () {
  removeAllChildNodes(giftsContainer);
  allGifts('For Harmony').catch((err) => console.log(err));
  filterButtonAll.classList.remove('buttons-panel__item--active');
  filterButtonWork.classList.remove('buttons-panel__item--active');
  filterButtonHealth.classList.remove('buttons-panel__item--active');
  this.classList.add('buttons-panel__item--active');
});

popoverWrapper.addEventListener('click', () => {
  body.classList.remove('no-scroll');
  popoverWrapper.classList.remove('overlay--open');
});
