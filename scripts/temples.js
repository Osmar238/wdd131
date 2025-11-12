document.addEventListener('DOMContentLoaded', (event) => {
    
    const yearSpan = document.getElementById('currentyear');
    const currentYear = new Date().getFullYear();
    yearSpan.textContent = currentYear;

    const modifiedSpan = document.getElementById('lastModified');
    const lastModifiedDate = document.lastModified;
    modifiedSpan.textContent = lastModifiedDate;

    const menuButton = document.getElementById('menu-button');
    const nav = document.querySelector('header nav');

    menuButton.addEventListener('click', () => {
        nav.classList.toggle('open');
        
        if (nav.classList.contains('open')) {
            menuButton.textContent = 'X';
        } else {
            menuButton.textContent = '☰';
        }
    });

});s