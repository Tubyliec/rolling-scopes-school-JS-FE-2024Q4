import { API_ENDPOINTS, GIFT_CATEGORIES } from '../../shared/constants/api.js';
import { UI_CONFIG } from '../../shared/constants/ui-constants.js';
import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { SELECTORS } from '../../shared/constants/selectors.js';
import { selectElement } from '../../shared/utilities/dom-helpers.js';
import {
  createGiftItem,
  getUniqueRandomIndices,
  handleModalOpen,
  handleModalClose,
} from './modal-utils.js';
import { createModalWindow } from './modal-window.js';
import { convertSuperpowersToStars } from './modal-utils.js';

const giftsContainer = selectElement(SELECTORS.GIFTS_LIST);
const popoverWrapper = selectElement(SELECTORS.OVERLAY);
const popupModal = selectElement(SELECTORS.MODAL);
const body = selectElement(SELECTORS.BODY);

let giftsDataCache = null;

export async function getGifts() {
  if (giftsDataCache) {
    return giftsDataCache;
  }

  try {
    const result = await fetch(API_ENDPOINTS.GIFTS_DATA);
    giftsDataCache = await result.json();
    return giftsDataCache;
  } catch (error) {
    console.error('Failed to fetch gifts data:', error);
    throw error;
  }
}

export async function bestGifts() {
  try {
    const giftsData = await getGifts();
    
    if (!giftsData || giftsData.length === 0) {
      console.warn('No gifts available to display');
      return;
    }

    const randomIndices = getUniqueRandomIndices(
      UI_CONFIG.RANDOM_GIFTS_COUNT,
      giftsData.length,
    );

    const fragment = document.createDocumentFragment();
    
    randomIndices.forEach((itemIndex) => {
      const giftData = giftsData[itemIndex];
      const clickHandler = () => {
        handleModalOpen();
        showModalWindow(itemIndex);
      };
      
      const newItem = createGiftItem(giftData, clickHandler);
      fragment.appendChild(newItem);
    });

    giftsContainer.appendChild(fragment);
  } catch (error) {
    console.error('Failed to display best gifts:', error);
    throw error;
  }
}

export async function allGifts(itemCategory) {
  try {
    const giftsData = await getGifts();

    giftsData.forEach((giftData, itemIndex) => {
      if (
        giftData.category === itemCategory ||
        itemCategory === GIFT_CATEGORIES.ALL
      ) {
        const clickHandler = () => {
          handleModalOpen();
          showModalWindow(itemIndex);
        };

        const newItem = createGiftItem(giftData, clickHandler);
        giftsContainer.appendChild(newItem);
      }
    });
  } catch (error) {
    console.error('Failed to display all gifts:', error);
    throw error;
  }
}

async function showModalWindow(giftIndex) {
  try {
    const giftsData = await getGifts();

    const superpowersArray = giftsData.map((gift) =>
      convertSuperpowersToStars(gift.superpowers),
    );

    popupModal.innerHTML = '';

    popupModal.togglePopover();
    body.classList.toggle(CSS_CLASSES.NO_SCROLL);
    popoverWrapper.classList.add(CSS_CLASSES.OVERLAY_OPEN);

    const { modalBlock, modalClose } = createModalWindow(
      giftsData[giftIndex],
      superpowersArray,
      giftIndex,
    );

    popupModal.appendChild(modalBlock);
    popupModal.appendChild(modalClose);

    modalClose.addEventListener('click', () =>
      handleModalClose(popupModal, body, popoverWrapper),
    );
  } catch (error) {
    console.error('Failed to show modal window:', error);
    throw error;
  }
}