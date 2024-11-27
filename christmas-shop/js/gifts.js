// Identifiers

const BUTTON_UP = document.querySelector('.button_top');

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