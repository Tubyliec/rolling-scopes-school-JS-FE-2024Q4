// Import

import {modalWindow} from './modal.js';
import {getGifts} from './modal.js';
import {allGifts} from './modal.js';

// Identifiers

const BUTTON_UP = document.querySelector('.button_top');
const GIFTS_CONTAINER = document.querySelector('.best_gifts');

const BUTTONS_LIST = document.querySelector('.buttons_panel_list');

const FILTER_BUTTON_ALL = document.querySelector('.buttons_panel_list li:nth-child(1)');
const FILTER_BUTTON_WORK = document.querySelector('.buttons_panel_list li:nth-child(2)');
const FILTER_BUTTON_HEALTH = document.querySelector('.buttons_panel_list li:nth-child(3)');
const FILTER_BUTTON_HARMONY = document.querySelector('.buttons_panel_list li:nth-child(4)');

const POPOVER_WRAPPER = document.querySelector('.popover_wrapper');
const POPUP_MODAL = document.querySelector('.modal_window');

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

FILTER_BUTTON_ALL.classList.add('active_panel_items');

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


POPOVER_WRAPPER.addEventListener('click', () => {
    BODY.classList.remove('no_scroll');
    POPOVER_WRAPPER.classList.remove('wrapper_open');
});

