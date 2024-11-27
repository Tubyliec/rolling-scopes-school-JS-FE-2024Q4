// Identifiers

const BODY = document.querySelector('body');

const BURGER_CHECKBOX = document.querySelector('.burger-checkbox');
const NAVIGATION_PANEL = document.querySelector('.navigation_panel_burger');
const MENU_BUTTON = document.querySelector('menu_button');
const MENU_POPUP = document.getElementById('menu_popup');

// Burger

BURGER_CHECKBOX.addEventListener('click', function(e) {
    BODY.classList.toggle('no_scroll');
});

NAVIGATION_PANEL.addEventListener('click', function(e) {
    if (e.target.classList.contains('navigation_link')){
        BODY.classList.remove('no_scroll');
        MENU_POPUP.hidePopover();
        BURGER_CHECKBOX.checked = false;
    }
});