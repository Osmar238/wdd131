// script.js
// 1. FUNCIONALIDAD: MENÚ DE NAVEGACIÓN FIJO (Sticky Navbar)
const mainNavbar = document.querySelector('.main-nav');
const smallNavbar = document.querySelector('.top-bar');

function stickyNavbar(navbarElement) {
    if (!navbarElement) return; 

    let stickyPosition = navbarElement.offsetTop;

    if (window.pageYOffset >= stickyPosition) {
        navbarElement.classList.add("sticky");
    } else {
        navbarElement.classList.remove("sticky");
    }
}

window.onscroll = function() {
    stickyNavbar(mainNavbar);
    stickyNavbar(smallNavbar);
};


// 2. FUNCIONALIDAD: CONTROL DE CANTIDAD


const qtyInput = document.getElementById('qty');
const btnMinus = document.querySelector('.qty-btn-minus');
const btnPlus = document.querySelector('.qty-btn-plus');

if (qtyInput && btnMinus && btnPlus) {

    btnMinus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        let minValue = parseInt(qtyInput.min);

        if (currentValue > minValue) {
            qtyInput.value = currentValue - 1;
        }
    });

    btnPlus.addEventListener('click', () => {
        let currentValue = parseInt(qtyInput.value);
        qtyInput.value = currentValue + 1;
    });
}
