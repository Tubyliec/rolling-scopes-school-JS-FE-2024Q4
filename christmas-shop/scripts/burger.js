// Identifiers

const body = document.querySelector('body');

const burgerCheckbox = document.querySelector('.header__burger-checkbox');
const navigationPanel = document.querySelector('.burger-menu');
const menuPopup = document.getElementById('burger-menu');

// Burger

burgerCheckbox.addEventListener('click', function () {
  body.classList.toggle('no-scroll');
});

navigationPanel.addEventListener('click', function (e) {
  if (e.target.classList.contains('header__nav-link')) {
    body.classList.remove('no-scroll');
    menuPopup.hidePopover();
    burgerCheckbox.checked = false;
  }
});

window.addEventListener('resize', () => {
  body.classList.remove('no-scroll');
  menuPopup.hidePopover();
  burgerCheckbox.checked = false;
});
