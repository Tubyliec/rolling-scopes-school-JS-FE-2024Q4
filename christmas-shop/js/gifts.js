// Identifiers

const BUTTON_UP = document.querySelector('.button_top');
const GIFTS_CONTAINER = document.querySelector('.best_gifts');

const BUTTONS_LIST = document.querySelector('.buttons_panel_list');


const FILTER_BUTTON_ALL = document.querySelector('.buttons_panel_list li:nth-child(1)');
const FILTER_BUTTON_WORK = document.querySelector('.buttons_panel_list li:nth-child(2)');
const FILTER_BUTTON_HEALTH = document.querySelector('.buttons_panel_list li:nth-child(3)');
const FILTER_BUTTON_HARMONY= document.querySelector('.buttons_panel_list li:nth-child(4)');

// Button to top

window.addEventListener("scroll", function (e) {
    if (window.scrollY > 300 || document.documentElement.scrollTop > 300) {
        BUTTON_UP.classList.add('visible');
    } else {
        BUTTON_UP.classList.remove('visible');
    }
});

BUTTON_UP.addEventListener("click", function (e) {
window.scrollTo({
    top: 0,
    left: 0,
    behavior: 'smooth'
    });
});

// Cards

async function getGifts() {
    const RESULT = await fetch('./assets/json/gifts.json');
    const GIFTS = await RESULT.json();
    return GIFTS;
}

async function allGifts(itemCategory) {
    const GIFTS_DATA = await getGifts();
    let giftsArray = [];

    for (i = 0; i < GIFTS_DATA.length; i++) {
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
            GIFTS_CONTAINER.appendChild(newItem);
        }
    });
}

allGifts('All');

function removeAllChildNodes(parent) {
    while (parent.firstChild) {
        parent.removeChild(parent.firstChild);
    }
}

FILTER_BUTTON_ALL.addEventListener("click", function (e) {
    removeAllChildNodes(GIFTS_CONTAINER)
    allGifts('All');
    FILTER_BUTTON_HEALTH.classList.remove('active_panel_items');
    FILTER_BUTTON_WORK.classList.remove('active_panel_items');
    FILTER_BUTTON_HARMONY.classList.remove('active_panel_items');
    this.classList.add('active_panel_items');
});

FILTER_BUTTON_WORK.addEventListener("click", function (e) {
    removeAllChildNodes(GIFTS_CONTAINER)
    allGifts('For Work');
    FILTER_BUTTON_ALL.classList.remove('active_panel_items');
    FILTER_BUTTON_HEALTH.classList.remove('active_panel_items');
    FILTER_BUTTON_HARMONY.classList.remove('active_panel_items');
    this.classList.add('active_panel_items');
});

FILTER_BUTTON_HEALTH.addEventListener("click", function (e) {
    removeAllChildNodes(GIFTS_CONTAINER)
    allGifts('For Health');
    FILTER_BUTTON_ALL.classList.remove('active_panel_items');
    FILTER_BUTTON_WORK.classList.remove('active_panel_items');
    FILTER_BUTTON_HARMONY.classList.remove('active_panel_items');
    this.classList.add('active_panel_items');
});

FILTER_BUTTON_HARMONY.addEventListener("click", function (e) {
    removeAllChildNodes(GIFTS_CONTAINER)
    allGifts('For Harmony');
    FILTER_BUTTON_ALL.classList.remove('active_panel_items');
    FILTER_BUTTON_WORK.classList.remove('active_panel_items');
    FILTER_BUTTON_HEALTH.classList.remove('active_panel_items');
    this.classList.add('active_panel_items');
});