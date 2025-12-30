// Import

import {bestGifts} from './modal.js';

// Identifiers

const popoverWrapper = document.querySelector('.popover_wrapper');

const days = document.querySelector('.days');
const hours = document.querySelector('.hours');
const minutes = document.querySelector('.minutes');
const seconds = document.querySelector('.seconds');

const slider = document.querySelector('.slider');
const buttonLeft = document.querySelector('.button_left');
const buttonRight = document.querySelector('.button_right');

let currentStep = 0;
let stepCount = 3;
let stepWidth = 178 ;

// Counter

function countdown() {
    const currentDate = new Date();
    const targetDate = new Date(Date.UTC(currentDate.getFullYear() + 1, 0, 1, 0, 0, 0));
    const remainingTime = targetDate - currentDate;
    const remainingDays = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    const remainingHours = Math.floor(remainingTime % (1000 * 60 * 60 * 24) / (1000 * 60 * 60));
    const remainingMinutes = Math.floor(remainingTime % (1000 * 60 * 60) / (1000 * 60));
    const remainingSeconds = Math.floor(remainingTime % (1000 * 60) / 1000);

    days.innerText = remainingDays.toString().padStart(1, '0')
    hours.innerText = remainingHours.toString().padStart(1, '0')
    minutes.innerText = remainingMinutes.toString().padStart(1, '0')
    seconds.innerText = remainingSeconds.toString().padStart(1, '0')
}

setInterval(countdown, 1000);

// Slider

buttonLeft.classList.add('disabled');

function widthCount() {
    window.innerWidth <= 768 ? stepCount = 6 : stepCount = 3;
    stepWidth = Math.round((slider.scrollWidth - slider.clientWidth) / stepCount)
}

function moveSlider() {
    slider.style.left = -currentStep * stepWidth + 'px';
    if (currentStep === 0 && !buttonLeft.classList.contains('disabled')) {
        buttonLeft.classList.add('disabled');
    } else {
        buttonLeft.classList.remove('disabled');
    }
    if (currentStep === stepCount && !buttonRight.classList.contains('disabled')) {
        buttonRight.classList.add('disabled');
    } else {
        buttonRight.classList.remove('disabled');
    }
}

buttonLeft.addEventListener("click", () => {
    widthCount();
    currentStep -= 1;
    if (currentStep < 0) currentStep = 0;
    moveSlider();
});

buttonRight.addEventListener("click", () => {
    widthCount();
    currentStep += 1;
    if (currentStep > stepCount) currentStep = stepCount;
    moveSlider();
});

window.addEventListener("resize", () => {
    slider.style.left = `-${currentStep * stepWidth}px`;
    currentStep = 0;
    buttonLeft.classList.add('disabled');
    buttonRight.classList.remove('disabled');
});

// Cards

bestGifts()

//

popoverWrapper.addEventListener('click', () => {
    body.classList.remove('no_scroll');
    popoverWrapper.classList.remove('wrapper_open');
});