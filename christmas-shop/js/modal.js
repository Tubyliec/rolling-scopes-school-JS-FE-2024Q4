const POPOVER_WRAPPER = document.querySelector('.popover_wrapper');
const POPUP_MODAL = document.querySelector('.modal_window');
const GIFTS_CONTAINER = document.querySelector('.best_gifts');


export async function getGifts() {
    const RESULT = await fetch('./assets/json/gifts.json');
    const GIFTS = await RESULT.json();
    return GIFTS;
}

export async function bestGifts() {
    const GIFTS_DATA = await getGifts();
    let giftsArray = [];

    for (let i = 0; i < 4; i++) {
        giftsArray[i] = Math.floor(Math.random() * (GIFTS_DATA.length - 1))
        for (let j = 0; j < i; j++) {
            if (giftsArray[i] === giftsArray[j]) i--;
          }
    }

    giftsArray.forEach(item => {
        let newItem = document.createElement('div');
        newItem.classList.add('gifts_item');
        newItem.innerHTML = `
        <div class="gift_img">
            <img src="./assets/images/${GIFTS_DATA[item].category}.png" alt="gift">
        </div>
        <div class="gift_description_wrapper">
            <div class="gift_description">
                <p class="${GIFTS_DATA[item].category.toLowerCase().replace(" ", "_")}">${GIFTS_DATA[item].category}</p>
                <h3>${GIFTS_DATA[item].name}</h3>
            </div>
        </div>
        `;
        newItem.addEventListener('click', () => {
            POPUP_MODAL.togglePopover();
            BODY.classList.toggle('no_scroll');
            POPOVER_WRAPPER.classList.add('wrapper_open');
            POPUP_MODAL.innerHTML = '';
            modalWindow(item);
        });
        document.querySelector('.best_gifts').appendChild(newItem);
    });
}

export async function allGifts(itemCategory) {
    const GIFTS_DATA = await getGifts();
    let giftsArray = [];

    for (let i = 0; i < GIFTS_DATA.length; i++) {
        giftsArray[i] = i;
    }


    giftsArray.forEach(item => {
        if (GIFTS_DATA[item].category === itemCategory || itemCategory === 'All') {
            let newItem = document.createElement('div');
            newItem.classList.add('gifts_item');
            newItem.innerHTML = `
                <div class="gift_img">
                    <img src="./assets/images/${GIFTS_DATA[item].category}.png" alt="gift">
                </div>
                <div class="gift_description_wrapper">
                    <div class="gift_description">
                        <p class="${GIFTS_DATA[item].category.toLowerCase().replace(" ", "_")}">${GIFTS_DATA[item].category}</p>
                        <h3>${GIFTS_DATA[item].name}</h3>
                    </div>
                </div>
            `;
            newItem.addEventListener('click', () => {
                POPUP_MODAL.togglePopover();
                BODY.classList.toggle('no_scroll');
                POPOVER_WRAPPER.classList.add('wrapper_open');
                POPUP_MODAL.innerHTML = '';
                modalWindow(item);
            });
            GIFTS_CONTAINER.appendChild(newItem);
        }
    });
}

export async function modalWindow(number) {
    const GIFTS_DATA = await getGifts();

    let modalClose = document.createElement('div');
    modalClose.classList.add('modal_close');
    modalClose.innerHTML = `
        <img src="./assets/icons/close.svg" alt="gift">
        `;

    let modalBlock = document.createElement('div');

    modalBlock.classList.add('modal_block');
    modalBlock.innerHTML = `
        <div class="gift_img">
            <img src="./assets/images/${GIFTS_DATA[number].category}.png" alt="gift">
        </div>
        <div class="gift_description_wrapper">
            <div class="gift_description">
                <h4 class="${GIFTS_DATA[number].category.toLowerCase().replace(" ", "_")}">${GIFTS_DATA[number].category}</h4>
                <h3>${GIFTS_DATA[number].name}</h3>
                <p>${GIFTS_DATA[number].description}</p>
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
                            <li>${GIFTS_DATA[number].superpowers.live}</li>
                            <li>${GIFTS_DATA[number].superpowers.create}</li>
                            <li>${GIFTS_DATA[number].superpowers.love}</li>
                            <li>${GIFTS_DATA[number].superpowers.dream}</li>
                        </ul>
                        <ul class="snowflakes_list">
                            <li>
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                            </li>
                            <li>
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                            </li>
                            <li>
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                            </li>
                            <li>
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                                <img src="./assets/icons/snowflake.svg" alt="snowflake">
                            </li>
                        </ul>
                    </div>

                </div>
            </div>
        </div>
        `
    POPUP_MODAL.appendChild(modalBlock);
    POPUP_MODAL.appendChild(modalClose);
    modalClose.addEventListener('click', () => {
        POPUP_MODAL.togglePopover();
        BODY.classList.remove('no_scroll');
        POPOVER_WRAPPER.classList.remove('wrapper_open');
    });
}