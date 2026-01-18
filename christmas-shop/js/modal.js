/* global fetch */

const giftsContainer = document.querySelector('.best_gifts');
const popoverWrapper = document.querySelector('.popover_wrapper');
const popupModal = document.querySelector('.modal_window');
const body = document.body;

export async function getGifts() {
  const result = await fetch('./assets/json/gifts.json');
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
    newItem.classList.add('gifts_item');
    newItem.innerHTML = `
        <div class="gift_img">
            <img src="./assets/images/${giftsData[item].category}.png" alt="gift">
        </div>
        <div class="gift_description_wrapper">
            <div class="gift_description">
                <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                <h3>${giftsData[item].name}</h3>
            </div>
        </div>
        `;
    newItem.addEventListener('click', () => {
      popupModal.togglePopover();
      body.classList.toggle('no_scroll');
      popoverWrapper.classList.add('wrapper_open');
      popupModal.innerHTML = '';
      modalWindow(item);
    });
    document.querySelector('.best_gifts').appendChild(newItem);
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
      newItem.classList.add('gifts_item');
      newItem.innerHTML = `
                <div class="gift_img">
                    <img src="./assets/images/${giftsData[item].category}.png" alt="gift">
                </div>
                <div class="gift_description_wrapper">
                    <div class="gift_description">
                        <p class="${giftsData[item].category.toLowerCase().replace(' ', '_')}">${giftsData[item].category}</p>
                        <h3>${giftsData[item].name}</h3>
                    </div>
                </div>
            `;
      newItem.addEventListener('click', () => {
        popupModal.togglePopover();
        body.classList.toggle('no_scroll');
        popoverWrapper.classList.add('wrapper_open');
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
        item[key] = `<img src="./assets/icons/5stars.svg" alt="gift">`;
      }
      if (item[key] === '+400') {
        item[key] = `<img src="./assets/icons/4stars.svg" alt="gift">`;
      }
      if (item[key] === '+300') {
        item[key] = `<img src="./assets/icons/3stars.svg" alt="gift">`;
      }
      if (item[key] === '+200') {
        item[key] = `<img src="./assets/icons/2stars.svg" alt="gift">`;
      }
      if (item[key] === '+100') {
        item[key] = `<img src="./assets/icons/1stars.svg" alt="gift">`;
      }
    }
  });

  let modalClose = document.createElement('div');
  modalClose.classList.add('modal_close');
  modalClose.innerHTML = `
        <img src="./assets/icons/close.svg" alt="gift">
        `;

  let modalBlock = document.createElement('div');

  modalBlock.classList.add('modal_block');
  modalBlock.innerHTML = `
        <div class="gift_img">
            <img src="./assets/images/${giftsData[number].category}.png" alt="gift">
        </div>
        <div class="gift_description_wrapper">
            <div class="gift_description">
                <h4 class="${giftsData[number].category.toLowerCase().replace(' ', '_')}">${giftsData[number].category}</h4>
                <h3>${giftsData[number].name}</h3>
                <p>${giftsData[number].description}</p>
            </div>
            <div class="superpowers">
                <h4>Adds superpowers to:</h4>
                <div class="powers_list">
                    <div class="powers_name">
                        <ul>
                            <li>Live</li>
                            <li>Create</li>
                            <li>Love</li>
                            <li>Dream</li>
                        </ul>
                    </div>
                    <div class="powers_rate">
                        <ul>
                            <li>${giftsData[number].superpowers.live}</li>
                            <li>${giftsData[number].superpowers.create}</li>
                            <li>${giftsData[number].superpowers.love}</li>
                            <li>${giftsData[number].superpowers.dream}</li>
                        </ul>
                        <ul class="snowflakes_list">
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
    body.classList.remove('no_scroll');
    popoverWrapper.classList.remove('wrapper_open');
  });
}
