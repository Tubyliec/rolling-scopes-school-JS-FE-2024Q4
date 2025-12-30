// Identifiers

const body = document.querySelector('body');

const burgerCheckbox = document.querySelector('.burger-checkbox');
const navigationPanel = document.querySelector('.navigation_panel_burger');
const menuPopup = document.getElementById('menu_popup');

// Burger

burgerCheckbox.addEventListener('click', function() {
    body.classList.toggle('no_scroll');
});

navigationPanel.addEventListener('click', function(e) {
    if (e.target.classList.contains('navigation_link')){
        body.classList.remove('no_scroll');
        menuPopup.hidePopover();
        burgerCheckbox.checked = false;
    }
});

window.addEventListener("resize", () => {
    body.classList.remove('no_scroll');
    menuPopup.hidePopover();
    burgerCheckbox.checked = false;
});