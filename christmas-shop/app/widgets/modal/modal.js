import {
  API_ENDPOINTS,
  IMAGE_PATHS,
  GIFT_CATEGORIES,
  SUPERPOWER_RATINGS,
} from '../../shared/constants/api.js';
import { SUPERPOWER_CATEGORIES } from '../../shared/constants/superpower-constants.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import {
  selectElement,
  createElement,
  addEventListener,
} from '../../shared/utilities/dom-helpers.js';

const giftsContainer = selectElement(SELECTORS.GIFTS_LIST);
const popoverWrapper = selectElement(SELECTORS.OVERLAY);
const popupModal = selectElement(SELECTORS.MODAL);
const body = selectElement(SELECTORS.BODY);

export async function getGifts() {
  const result = await fetch(API_ENDPOINTS.GIFTS_DATA);
  return await result.json();
}

export async function bestGifts() {
  const giftsData = await getGifts();
  let giftsArray = [];

  for (let i = 0; i < UI_CONFIG.RANDOM_GIFTS_COUNT; i++) {
    giftsArray[i] = Math.floor(Math.random() * (giftsData.length - 1));
    for (let j = 0; j < i; j++) {
      if (giftsArray[i] === giftsArray[j]) i--;
    }
  }

  giftsArray.forEach((item) => {
    let newItem = createElement(
      'div',
      CSS_CLASSES.GIFTS_ITEM,
      `
        <div class="${CSS_CLASSES.GIFTS_IMAGE}">
            <img src="${IMAGE_PATHS.PUBLIC_IMAGES}/${giftsData[item].category}.png" alt="gift">
        </div>
        <div class="${CSS_CLASSES.GIFTS_DESCRIPTION_WRAPPER}">
            <div class="${CSS_CLASSES.GIFTS_DESCRIPTION}">
                <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                <h3>${giftsData[item].name}</h3>
            </div>
        </div>
        `,
    );
    addEventListener(newItem, 'click', () => {
      popupModal.togglePopover();
      body.classList.toggle(CSS_CLASSES.NO_SCROLL);
      popoverWrapper.classList.add(CSS_CLASSES.OVERLAY_OPEN);
      popupModal.innerHTML = '';

      const buttonUp = document.querySelector('.scroll-top');
      if (buttonUp) {
        buttonUp.classList.remove('scroll-top--visible');
      }

      modalWindow(item);
    });
    giftsContainer.appendChild(newItem);
  });
}

export async function allGifts(itemCategory) {
  const giftsData = await getGifts();
  let giftsArray = [];

  for (let i = 0; i < giftsData.length; i++) {
    giftsArray[i] = i;
  }

  giftsArray.forEach((item) => {
    if (
      giftsData[item].category === itemCategory ||
      itemCategory === GIFT_CATEGORIES.ALL
    ) {
      let newItem = document.createElement('div');
      newItem.classList.add(CSS_CLASSES.GIFTS_ITEM);
      newItem.innerHTML = `
                <div class="${CSS_CLASSES.GIFTS_IMAGE}">
                    <img src="${IMAGE_PATHS.PUBLIC_IMAGES}/${giftsData[item].category}.png" alt="gift">
                </div>
                <div class="${CSS_CLASSES.GIFTS_DESCRIPTION_WRAPPER}">
                    <div class="${CSS_CLASSES.GIFTS_DESCRIPTION}">
                        <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                        <h3>${giftsData[item].name}</h3>
                    </div>
                </div>
            `;
      newItem.addEventListener('click', () => {
        popupModal.togglePopover();
        body.classList.toggle(CSS_CLASSES.NO_SCROLL);
        popoverWrapper.classList.add(CSS_CLASSES.OVERLAY_OPEN);
        popupModal.innerHTML = '';

        const buttonUp = document.querySelector('.scroll-top');
        if (buttonUp) {
          buttonUp.classList.remove('scroll-top--visible');
        }

        modalWindow(item);
      });
      giftsContainer.appendChild(newItem);
    }
  });
}

export async function modalWindow(number) {
  const giftsData = await getGifts();
  const giftsStarData = await getGifts();

  let superpowersArray = [];
  for (let i = 0; i < giftsStarData.length; i++) {
    superpowersArray.push(giftsStarData[i].superpowers);
  }
  superpowersArray.forEach((item) => {
    for (let key in item) {
      if (item[key] === SUPERPOWER_RATINGS.PLUS_500) {
        item[key] =
          `<img src="${IMAGE_PATHS.STAR_RATINGS.FIVE_STARS}" alt="gift">`;
      }
      if (item[key] === SUPERPOWER_RATINGS.PLUS_400) {
        item[key] =
          `<img src="${IMAGE_PATHS.STAR_RATINGS.FOUR_STARS}" alt="gift">`;
      }
      if (item[key] === SUPERPOWER_RATINGS.PLUS_300) {
        item[key] =
          `<img src="${IMAGE_PATHS.STAR_RATINGS.THREE_STARS}" alt="gift">`;
      }
      if (item[key] === SUPERPOWER_RATINGS.PLUS_200) {
        item[key] =
          `<img src="${IMAGE_PATHS.STAR_RATINGS.TWO_STARS}" alt="gift">`;
      }
      if (item[key] === SUPERPOWER_RATINGS.PLUS_100) {
        item[key] =
          `<img src="${IMAGE_PATHS.STAR_RATINGS.ONE_STAR}" alt="gift">`;
      }
    }
  });

  let modalClose = document.createElement('div');
  modalClose.classList.add(CSS_CLASSES.MODAL_CLOSE);
  modalClose.innerHTML = `
        <img src="${IMAGE_PATHS.CLOSE_ICON}" alt="gift">
        `;

  let modalBlock = document.createElement('div');

  modalBlock.classList.add(CSS_CLASSES.MODAL_CONTENT);
  modalBlock.innerHTML = `
        <div class="${CSS_CLASSES.MODAL_IMAGE}">
            <img src="${IMAGE_PATHS.PUBLIC_IMAGES}/${giftsData[number].category}.png" alt="gift">
        </div>
        <div class="${CSS_CLASSES.MODAL_DESCRIPTION_WRAPPER}">
            <div class="${CSS_CLASSES.MODAL_DESCRIPTION}">
                <h4 class="${giftsData[number].category.toLowerCase().replace(' ', '_')}">${giftsData[number].category}</h4>
                <h3>${giftsData[number].name}</h3>
                <p>${giftsData[number].description}</p>
            </div>
            <div class="${CSS_CLASSES.MODAL_POWERS}">
                <h4>Adds superpowers to:</h4>
                <div class="${CSS_CLASSES.MODAL_POWERS_LIST}">
                    <div class="${CSS_CLASSES.POWERS_NAME}">
                        <ul>
                            <li>Live</li>
                            <li>Create</li>
                            <li>Love</li>
                            <li>Dream</li>
                        </ul>
                    </div>
                    <div class="${CSS_CLASSES.MODAL_POWERS_RATE}">
                        <ul>
                            <li>${giftsData[number].superpowers[SUPERPOWER_CATEGORIES.LIVE]}</li>
                            <li>${giftsData[number].superpowers[SUPERPOWER_CATEGORIES.CREATE]}</li>
                            <li>${giftsData[number].superpowers[SUPERPOWER_CATEGORIES.LOVE]}</li>
                            <li>${giftsData[number].superpowers[SUPERPOWER_CATEGORIES.DREAM]}</li>
                        </ul>
                        <ul class="${CSS_CLASSES.MODAL_SNOWFLAKES}">
                            <li>${superpowersArray[number][SUPERPOWER_CATEGORIES.LIVE]}</li>
                            <li>${superpowersArray[number][SUPERPOWER_CATEGORIES.CREATE]}</li>
                            <li>${superpowersArray[number][SUPERPOWER_CATEGORIES.LOVE]}</li>
                            <li>${superpowersArray[number][SUPERPOWER_CATEGORIES.DREAM]}</li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        `;
  popupModal.appendChild(modalBlock);
  popupModal.appendChild(modalClose);
  modalClose.addEventListener('click', () => {
    popupModal.togglePopover();
    body.classList.remove(CSS_CLASSES.NO_SCROLL);
    popoverWrapper.classList.remove(CSS_CLASSES.OVERLAY_OPEN);
  });
}
