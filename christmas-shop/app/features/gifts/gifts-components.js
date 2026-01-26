import { CSS_CLASSES } from '../../shared/constants/css-classes.js';
import { IMAGE_PATHS } from '../../shared/constants/api.js';
import { addClass, createElement } from '../../shared/utilities/dom-helpers.js';

export class GiftComponent {
  static create(gift, options = {}) {
    const {
      showDescription = true,
      showSuperpowers = true,
      showImage = true,
      onClick = null,
      className = '',
    } = options;

    const giftElement = createElement(
      'div',
      `${CSS_CLASSES.GIFTS_ITEM} ${className}`,
    );

    if (showImage) {
      const imageElement = GiftComponent.createImageElement(gift);
      giftElement.appendChild(imageElement);
    }

    const descriptionWrapper = GiftComponent.createDescriptionWrapper(
      gift,
      showDescription,
    );
    giftElement.appendChild(descriptionWrapper);

    if (showSuperpowers) {
      const superpowersElement = GiftComponent.createSuperpowersElement(gift);
      descriptionWrapper.appendChild(superpowersElement);
    }

    if (onClick) {
      giftElement.addEventListener('click', () => onClick(gift));
    }

    return giftElement;
  }

  static createImageElement(gift) {
    const imageWrapper = createElement('div', CSS_CLASSES.GIFTS_IMAGE);
    const image = createElement('img');
    image.src = gift.imagePath;
    image.alt = gift.name;
    image.title = gift.name;

    imageWrapper.appendChild(image);
    return imageWrapper;
  }

  static createDescriptionWrapper(gift, showDescription = true) {
    const wrapper = createElement('div', CSS_CLASSES.GIFTS_DESCRIPTION_WRAPPER);

    if (showDescription) {
      const description = createElement('div', CSS_CLASSES.GIFTS_DESCRIPTION);

      const categoryElement = createElement(
        'p',
        gift.category.toLowerCase().replace(' ', '_'),
      );
      const nameElement = createElement('h3', gift.name);
      const descriptionText = createElement('p', gift.description);

      description.appendChild(categoryElement);
      description.appendChild(nameElement);
      description.appendChild(descriptionText);

      wrapper.appendChild(description);
    }

    return wrapper;
  }

  static createSuperpowersElement(gift) {
    const superpowersElement = createElement('div', CSS_CLASSES.MODAL_POWERS);

    const title = createElement('h4', 'Adds superpowers to:');
    superpowersElement.appendChild(title);

    const listElement = GiftComponent.createSuperpowersList(gift);
    superpowersElement.appendChild(listElement);

    return superpowersElement;
  }

  static createSuperpowersList(gift) {
    const listElement = createElement('div', CSS_CLASSES.MODAL_POWERS_LIST);

    const namesElement = GiftComponent.createSuperpowersNames(gift);
    const ratingsElement = GiftComponent.createSuperpowersRatings(gift);

    listElement.appendChild(namesElement);
    listElement.appendChild(ratingsElement);

    return listElement;
  }

  static createSuperpowersNames(gift) {
    const namesElement = createElement('div', CSS_CLASSES.POWERS_NAME);
    const ul = createElement('ul');

    const categories = Object.keys(gift.superpowers);
    categories.forEach((category) => {
      const li = createElement('li');
      li.textContent = category.charAt(0).toUpperCase() + category.slice(1);
      ul.appendChild(li);
    });

    namesElement.appendChild(ul);
    return namesElement;
  }

  static createSuperpowersRatings(gift) {
    const ratingsElement = createElement('div', CSS_CLASSES.MODAL_POWERS_RATE);

    const ratingsList = createElement('ul');
    const snowflakesList = createElement('ul', CSS_CLASSES.MODAL_SNOWFLAKES);

    Object.entries(gift.superpowers).forEach(([, rating]) => {
      const ratingLi = createElement('li');
      ratingLi.textContent = rating;
      ratingsList.appendChild(ratingLi);

      const snowflakeLi = createElement('li');
      const starImage = GiftComponent.createStarImage(rating);
      snowflakeLi.appendChild(starImage);
      snowflakesList.appendChild(snowflakeLi);
    });

    ratingsElement.appendChild(ratingsList);
    ratingsElement.appendChild(snowflakesList);

    return ratingsElement;
  }

  static createStarImage(rating) {
    const starMap = {
      '+500': IMAGE_PATHS.STAR_RATINGS.FIVE_STARS,
      '+400': IMAGE_PATHS.STAR_RATINGS.FOUR_STARS,
      '+300': IMAGE_PATHS.STAR_RATINGS.THREE_STARS,
      '+200': IMAGE_PATHS.STAR_RATINGS.TWO_STARS,
      '+100': IMAGE_PATHS.STAR_RATINGS.ONE_STAR,
    };

    const img = createElement('img');
    img.src = starMap[rating] || IMAGE_PATHS.STAR_RATINGS.ONE_STAR;
    img.alt = rating;
    img.title = rating;
    img.style.height = '16px';
    img.style.width = 'auto';

    return img;
  }

  static createModalContent(gift, options = {}) {
    const { onClose = null } = options;

    const modalBlock = createElement('div', CSS_CLASSES.MODAL_CONTENT);

    modalBlock.innerHTML = `
      <div class="${CSS_CLASSES.MODAL_IMAGE}">
        <img src="${gift.imagePath}" alt="${gift.name}">
      </div>
      <div class="${CSS_CLASSES.MODAL_DESCRIPTION_WRAPPER}">
        <div class="${CSS_CLASSES.MODAL_DESCRIPTION}">
          <h4 class="${gift.category.toLowerCase().replace(' ', '_')}">${gift.category}</h4>
          <h3>${gift.name}</h3>
          <p>${gift.description}</p>
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
                <li>${gift.superpowers.live}</li>
                <li>${gift.superpowers.create}</li>
                <li>${gift.superpowers.love}</li>
    <li>${gift.superpowers.dream}</li>
              </ul>
              <ul class="${CSS_CLASSES.MODAL_SNOWFLAKES}">
                <li>${GiftComponent.createStarImage(gift.superpowers.live).outerHTML}</li>
                <li>${GiftComponent.createStarImage(gift.superpowers.create).outerHTML}</li>
                <li>${GiftComponent.createStarImage(gift.superpowers.love).outerHTML}</li>
                <li>${GiftComponent.createStarImage(gift.superpowers.dream).outerHTML}</li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    `;

    if (onClose) {
      const closeBtn = createElement('div', CSS_CLASSES.MODAL_CLOSE);
      closeBtn.innerHTML = `<img src="${IMAGE_PATHS.CLOSE_ICON}" alt="Close">`;
      closeBtn.addEventListener('click', onClose);
      modalBlock.appendChild(closeBtn);
    }

    return modalBlock;
  }

  static createFilterButton(category, isActive = false, onClick = null) {
    const button = createElement('li');

    if (isActive) {
      addClass(button, CSS_CLASSES.BUTTONS_PANEL_ITEM_ACTIVE);
    }

    button.textContent =
      category === 'All' ? 'All Gifts' : category.replace('For ', '');

    if (onClick) {
      button.addEventListener('click', () => onClick(category));
    }

    return button;
  }

  static createLoadingState() {
    const loadingElement = createElement('div', 'loading-state');
    loadingElement.innerHTML = `
      <div class="spinner"></div>
      <p>Loading gifts...</p>
    `;
    return loadingElement;
  }

  static createErrorState(error) {
    const errorElement = createElement('div', 'error-state');
    errorElement.innerHTML = `
      <div class="error-icon">⚠️</div>
      <p>Error loading gifts: ${error}</p>
      <button class="retry-btn">Retry</button>
    `;
    return errorElement;
  }

  static createEmptyState() {
    const emptyElement = createElement('div', 'empty-state');
    emptyElement.innerHTML = `
      <div class="empty-icon">🎁</div>
      <p>No gifts found</p>
    `;
    return emptyElement;
  }
}
