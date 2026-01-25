const giftsContainer = document.querySelector('.gifts__list');
const popoverWrapper = document.querySelector('.overlay');
const popupModal = document.querySelector('.modal');
const body = document.body;

export async function getGifts() {
  const result = await fetch('../../../public/json/gifts.json');
  return await result.json();
}

export async function bestGifts() {
  const giftsData = await getGifts();
  let giftsArray = [];

  for (let i = 0; i < 4; i++) {
    giftsArray[i] = Math.floor(Math.random() * (giftsData.length - 1));
    for (let j = 0; j < i; j++) {
      if (giftsArray[i] === giftsArray[j]) i--;
    }
  }

  giftsArray.forEach((item) => {
    let newItem = document.createElement('div');
    newItem.classList.add('gifts__item');
    newItem.innerHTML = `
        <div class="gifts__image">
            <img src="../../../public/images/${giftsData[item].category}.png" alt="gift">
        </div>
        <div class="gifts__description-wrapper">
            <div class="gifts__description">
                <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                <h3>${giftsData[item].name}</h3>
            </div>
        </div>
        `;
    newItem.addEventListener('click', () => {
      popupModal.togglePopover();
      body.classList.toggle('no-scroll');
      popoverWrapper.classList.add('overlay--open');
      popupModal.innerHTML = '';
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
    if (giftsData[item].category === itemCategory || itemCategory === 'All') {
      let newItem = document.createElement('div');
      newItem.classList.add('gifts__item');
      newItem.innerHTML = `
                <div class="gifts__image">
                    <img src="../../../public/images/${giftsData[item].category}.png" alt="gift">
                </div>
                <div class="gifts__description-wrapper">
                    <div class="gifts__description">
                        <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                        <h3>${giftsData[item].name}</h3>
                    </div>
                </div>
            `;
      newItem.addEventListener('click', () => {
        popupModal.togglePopover();
        body.classList.toggle('no-scroll');
        popoverWrapper.classList.add('overlay--open');
        popupModal.innerHTML = '';
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
      if (item[key] === '+500') {
        item[key] = `<img src="../../../public/icons/5stars.svg" alt="gift">`;
      }
      if (item[key] === '+400') {
        item[key] = `<img src="../../../public/icons/4stars.svg" alt="gift">`;
      }
      if (item[key] === '+300') {
        item[key] = `<img src="../../../public/icons/3stars.svg" alt="gift">`;
      }
      if (item[key] === '+200') {
        item[key] = `<img src="../../../public/icons/2stars.svg" alt="gift">`;
      }
      if (item[key] === '+100') {
        item[key] = `<img src="../../../public/icons/1stars.svg" alt="gift">`;
      }
    }
  });

  let modalClose = document.createElement('div');
  modalClose.classList.add('modal__close');
  modalClose.innerHTML = `
        <img src="../../../public/icons/close.svg" alt="gift">
        `;

  let modalBlock = document.createElement('div');

  modalBlock.classList.add('modal__content');
  modalBlock.innerHTML = `
        <div class="modal__image">
            <img src="../../../public/images/${giftsData[number].category}.png" alt="gift">
        </div>
        <div class="modal__description-wrapper">
            <div class="modal__description">
                <h4 class="${giftsData[number].category.toLowerCase().replace(' ', '_')}">${giftsData[number].category}</h4>
                <h3>${giftsData[number].name}</h3>
                <p>${giftsData[number].description}</p>
            </div>
            <div class="modal__powers">
                <h4>Adds superpowers to:</h4>
                <div class="modal__powers-list">
                    <div class="powers_name">
                        <ul>
                            <li>Live</li>
                            <li>Create</li>
                            <li>Love</li>
                            <li>Dream</li>
                        </ul>
                    </div>
                    <div class="modal__powers-rate">
                        <ul>
                            <li>${giftsData[number].superpowers.live}</li>
                            <li>${giftsData[number].superpowers.create}</li>
                            <li>${giftsData[number].superpowers.love}</li>
                            <li>${giftsData[number].superpowers.dream}</li>
                        </ul>
                        <ul class="modal__snowflakes">
                            <li>${superpowersArray[number].live}</li>
                            <li>${superpowersArray[number].create}</li>
                            <li>${superpowersArray[number].love}</li>
                            <li>${superpowersArray[number].dream}</li>
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
    body.classList.remove('no-scroll');
    popoverWrapper.classList.remove('overlay--open');
  });
}
