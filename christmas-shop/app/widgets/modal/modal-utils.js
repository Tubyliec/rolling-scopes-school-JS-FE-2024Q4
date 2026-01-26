import { IMAGE_PATHS } from '../../shared/constants/api.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import {
  addEventListener,
  createElement,
} from '../../shared/utilities/dom-helpers.js';

export function createGiftItem(giftData, clickHandler) {
  const newItem = createElement(
    'div',
    CSS_CLASSES.GIFTS_ITEM,
    `
      <div class="${CSS_CLASSES.GIFTS_IMAGE}">
          <img src="${IMAGE_PATHS.PUBLIC_IMAGES}/${giftData.category}.png" alt="gift">
      </div>
      <div class="${CSS_CLASSES.GIFTS_DESCRIPTION_WRAPPER}">
          <div class="${CSS_CLASSES.GIFTS_DESCRIPTION}">
              <p class="${giftData.category.toLowerCase().replace(' ', '_')}">${giftData.category}</p>
              <h3>${giftData.name}</h3>
          </div>
      </div>
    `,
  );

  addEventListener(newItem, 'click', clickHandler);
  return newItem;
}

export function getUniqueRandomIndices(count, max) {
  if (count >= max) {
    return Array.from({ length: max }, (_, i) => i);
  }

  const indices = Array.from({ length: max }, (_, i) => i);

  for (let i = 0; i < count; i++) {
    const randomIndex = Math.floor(Math.random() * (max - i)) + i;
    [indices[i], indices[randomIndex]] = [indices[randomIndex], indices[i]];
  }

  return indices.slice(0, count);
}

export function convertSuperpowersToStars(superpowers) {
  const starRatings = {
    '+500': `<img src="${IMAGE_PATHS.STAR_RATINGS.FIVE_STARS}" alt="gift">`,
    '+400': `<img src="${IMAGE_PATHS.STAR_RATINGS.FOUR_STARS}" alt="gift">`,
    '+300': `<img src="${IMAGE_PATHS.STAR_RATINGS.THREE_STARS}" alt="gift">`,
    '+200': `<img src="${IMAGE_PATHS.STAR_RATINGS.TWO_STARS}" alt="gift">`,
    '+100': `<img src="${IMAGE_PATHS.STAR_RATINGS.ONE_STAR}" alt="gift">`,
  };

  const result = {};
  for (const [key, value] of Object.entries(superpowers)) {
    result[key] = starRatings[value] || value;
  }

  return result;
}

export function handleModalOpen() {
  const buttonUp = document.querySelector('.scroll-top');
  if (buttonUp) {
    buttonUp.classList.remove('scroll-top--visible');
  }
}

export function handleModalClose(popupModal, body, popoverWrapper) {
  popupModal.togglePopover();
  body.classList.remove(CSS_CLASSES.NO_SCROLL);
  popoverWrapper.classList.remove(CSS_CLASSES.OVERLAY_OPEN);
}
