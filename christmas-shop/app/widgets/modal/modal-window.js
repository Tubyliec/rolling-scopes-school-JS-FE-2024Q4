import { IMAGE_PATHS } from '../../shared/constants/api.js';
import { SUPERPOWER_CATEGORIES } from '../../shared/constants/superpower-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';

export function createModalWindow(giftData, superpowersArray, giftIndex) {
  const modalClose = document.createElement('div');
  modalClose.classList.add(CSS_CLASSES.MODAL_CLOSE);
  modalClose.innerHTML = `
        <img src="${IMAGE_PATHS.CLOSE_ICON}" alt="gift">
        `;

  const modalBlock = document.createElement('div');
  modalBlock.classList.add(CSS_CLASSES.MODAL_CONTENT);
  modalBlock.innerHTML = `
        <div class="${CSS_CLASSES.MODAL_IMAGE}">
            <img src="${IMAGE_PATHS.PUBLIC_IMAGES}/${giftData.category}.png" alt="gift">
        </div>
        <div class="${CSS_CLASSES.MODAL_DESCRIPTION_WRAPPER}">
            <div class="${CSS_CLASSES.MODAL_DESCRIPTION}">
                <h4 class="${giftData.category.toLowerCase().replace(' ', '_')}">${giftData.category}</h4>
                <h3>${giftData.name}</h3>
                <p>${giftData.description}</p>
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
                            <li>${giftData.superpowers[SUPERPOWER_CATEGORIES.LIVE]}</li>
                            <li>${giftData.superpowers[SUPERPOWER_CATEGORIES.CREATE]}</li>
                            <li>${giftData.superpowers[SUPERPOWER_CATEGORIES.LOVE]}</li>
                            <li>${giftData.superpowers[SUPERPOWER_CATEGORIES.DREAM]}</li>
                        </ul>
                        <ul class="${CSS_CLASSES.MODAL_SNOWFLAKES}">
                            <li>${superpowersArray[giftIndex][SUPERPOWER_CATEGORIES.LIVE]}</li>
                            <li>${superpowersArray[giftIndex][SUPERPOWER_CATEGORIES.CREATE]}</li>
                            <li>${superpowersArray[giftIndex][SUPERPOWER_CATEGORIES.LOVE]}</li>
                            <li>${superpowersArray[giftIndex][SUPERPOWER_CATEGORIES.DREAM]}</li>
                        </ul>
                    </div>
                </div>
            </div>
        </div>
        `;

  return { modalBlock, modalClose };
}