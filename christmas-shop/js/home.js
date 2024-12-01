// Identifiers

const DAYS = document.querySelector('.days');
const HOURS = document.querySelector('.hours');
const MINUTES = document.querySelector('.minutes');
const SECONDS = document.querySelector('.seconds');

const TARGET_DATE = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));

const SLIDER = document.querySelector('.slider');
const BUTTON_LEFT = document.querySelector('.button_left');
const BUTTON_RIGHT = document.querySelector('.button_right');

let currentStep = 0;
let stepCount = 3;
let stepWidth = 178;

// Counter

function countdown() {
    const CURRENT_DATE = new Date();
    const REMAINING_TIME = TARGET_DATE - CURRENT_DATE;
    const REMAINING_DAYS = Math.floor(REMAINING_TIME / (1000 * 60 * 60 * 24));
    const REMAINING_HOURS = Math.floor(REMAINING_TIME % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const REMAINING_MINUTES = Math.floor(REMAINING_TIME % (1000 * 60 * 60) / (1000 * 60));
    const REMAINING_SECONDS = Math.floor(REMAINING_TIME % (1000 * 60) / 1000);

    DAYS.innerText = REMAINING_DAYS.toString().padStart(2, '0')
    HOURS.innerText = REMAINING_HOURS.toString().padStart(2, '0')
    MINUTES.innerText = REMAINING_MINUTES.toString().padStart(2, '0')
    SECONDS.innerText = REMAINING_SECONDS.toString().padStart(2, '0')
}

setInterval(countdown, 1000);

// Slider

BUTTON_LEFT.classList.add('disabled');

function widthCount() {
    window.innerWidth <= 768 ? stepCount = 6 : stepCount = 3;
    stepWidth = Math.round((SLIDER.scrollWidth - SLIDER.clientWidth) / stepCount)
}

function moveSlider() {
    SLIDER.style.left = -currentStep * stepWidth + 'px';
    if (currentStep === 0 && !BUTTON_LEFT.classList.contains('disabled')) {
        BUTTON_LEFT.classList.add('disabled');
    } else {
        BUTTON_LEFT.classList.remove('disabled');
    }
    if (currentStep === stepCount && !BUTTON_RIGHT.classList.contains('disabled')) {
        BUTTON_RIGHT.classList.add('disabled');
    } else {
        BUTTON_RIGHT.classList.remove('disabled');
    }
}

BUTTON_LEFT.addEventListener("click", (e) => {
    widthCount();
    currentStep -= 1;
    if (currentStep < 0) currentStep = 0;
    moveSlider();
});

BUTTON_RIGHT.addEventListener("click", (e) => {
    widthCount();
    currentStep += 1;
    if (currentStep > stepCount) currentStep = stepCount;
    moveSlider();
});

// Cards

async function getGifts() {
    const RESULT = await fetch('./assets/json/gifts.json');
    const GIFTS = await RESULT.json();
    return GIFTS;
}


async function bestGifts() {
    const GIFTS_DATA = await getGifts();
    let giftsArray = [];

    for (i = 0; i < 4; i++) {
        giftsArray[i] = Math.floor(Math.random() * (GIFTS_DATA.length - 1))
        for (j = 0; j < i; j++) {
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
        document.querySelector('.best_gifts').appendChild(newItem);
    });
}

bestGifts()

//