// Identifiers

const DAYS = document.querySelector('.days');
const HOURS = document.querySelector('.hours');
const MINUTES = document.querySelector('.minutes');
const SECONDS = document.querySelector('.seconds');

const TARGET_DATE = new Date(Date.UTC(2025, 0, 1, 0, 0, 0));



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