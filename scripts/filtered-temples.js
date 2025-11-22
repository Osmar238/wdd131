document.addEventListener('DOMContentLoaded', () => {

  // --------------------------------------------------
  // 1. FOOTER Y MENU (Tu código original)
  // --------------------------------------------------
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

  // --------------------------------------------------
  // 2. ARRAY DE TEMPLOS
  // --------------------------------------------------
  const temples = [
    {
      templeName: "Aba Nigeria",
      location: "Aba, Nigeria",
      dedicated: "2005, August, 7",
      area: 11500,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/aba-nigeria/400x250/aba-nigeria-temple-lds-273999-wallpaper.jpg"
    },
    {
      templeName: "Manti Utah",
      location: "Manti, Utah, United States",
      dedicated: "1888, May, 21",
      area: 74792,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/manti-utah/400x250/manti-temple-768192-wallpaper.jpg"
    },
    {
      templeName: "Payson Utah",
      location: "Payson, Utah, United States",
      dedicated: "2015, June, 7",
      area: 96630,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/payson-utah/400x225/payson-utah-temple-exterior-1416671-wallpaper.jpg"
    },
    {
      templeName: "Yigo Guam",
      location: "Yigo, Guam",
      dedicated: "2020, May, 2",
      area: 6861,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/yigo-guam/400x250/yigo_guam_temple_2.jpg"
    },
    {
      templeName: "Washington D.C.",
      location: "Kensington, Maryland, United States",
      dedicated: "1974, November, 19",
      area: 156558,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/washington-dc/400x250/washington_dc_temple-exterior-2.jpeg"
    },
    {
      templeName: "Lima Perú",
      location: "Lima, Perú",
      dedicated: "1986, January, 10",
      area: 9600,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/lima-peru/400x250/lima-peru-temple-evening-1075606-wallpaper.jpg"
    },
    {
      templeName: "Mexico City Mexico",
      location: "Mexico City, Mexico",
      dedicated: "1983, December, 2",
      area: 116642,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/mexico-city-mexico/400x250/mexico-city-temple-exterior-1518361-wallpaper.jpg"
    },
    // TUS TEMPLOS NUEVOS
    {
      templeName: "Arequipa Peru Temple",
      location: "Arequipa, Peru",
      dedicated: "2019, December, 15",
      area: 26969,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/arequipa-peru/400x250/1-55f6c59ce8f9c093a9c689067f8674335de544e2.jpeg"
    },
    {
      templeName: "Barranquilla Colombia",
      location: "Barranquilla, Colombia",
      dedicated: "2018, December, 9",
      area: 25349,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/barranquilla-colombia/400x250/2-Barranquilla-Columblia-Temple-2135201.jpg"
    },
    {
      templeName: "Baton Rouge Louisiana",
      location: "Baton Rouge, Louisiana, United States",
      dedicated: "2000, July, 16",
      area: 10890,
      imageUrl:
      "https://content.churchofjesuschrist.org/templesldsorg/bc/Temples/photo-galleries/baton-rouge-louisiana/400x250/1-ea20b19384c9f98d17ef56b627c79c3a75f62cb3.jpeg"
    }
  ];

  // --------------------------------------------------
  // 3. FUNCION PARA GENERAR LAS TARJETAS (NUEVO)
  // --------------------------------------------------
  function createTempleCard(filteredTemples) {
    document.querySelector("#album").innerHTML = "";
    filteredTemples.forEach(temple => {
      let card = document.createElement("section");
      let name = document.createElement("h3");
      let location = document.createElement("p");
      let dedication = document.createElement("p");
      let area = document.createElement("p");
      let img = document.createElement("img");

      name.textContent = temple.templeName;
      location.innerHTML = `<span class="label">Location:</span> ${temple.location}`;
      dedication.innerHTML = `<span class="label">Dedicated:</span> ${temple.dedicated}`;
      area.innerHTML = `<span class="label">Size:</span> ${temple.area} sq ft`;
      img.setAttribute("src", temple.imageUrl);
      img.setAttribute("alt", `${temple.templeName} Temple`);
      img.setAttribute("loading", "lazy");

      card.appendChild(name);
      card.appendChild(location);
      card.appendChild(dedication);
      card.appendChild(area);
      card.appendChild(img);

      document.querySelector("#album").appendChild(card);
    });
  }

  // 4. LLAMADA INICIAL (Para que se vean al cargar la página)
  createTempleCard(temples);
// --------------------------------------------------
  // 5. FILTROS (LISTENERS)
  // --------------------------------------------------

  const homeLink = document.querySelector("#home");
  const oldLink = document.querySelector("#old");
  const newLink = document.querySelector("#new");
  const largeLink = document.querySelector("#large");
  const smallLink = document.querySelector("#small");

  // Filtro: Home (Todos)
  homeLink.addEventListener("click", () => {
    createTempleCard(temples);
  });

  // Filtro: Old (Anteriores a 1900)
  oldLink.addEventListener("click", () => {
    const filtered = temples.filter(temple => {
        const year = parseInt(temple.dedicated.substring(0, 4));
        return year < 1900;
    });
    createTempleCard(filtered);
  });

  // Filtro: New (Posteriores a 2000)
  newLink.addEventListener("click", () => {
    const filtered = temples.filter(temple => {
        const year = parseInt(temple.dedicated.substring(0, 4));
        return year > 2000;
    });
    createTempleCard(filtered);
  });

  // Filtro: Large (Mayores a 90,000 sq ft)
  largeLink.addEventListener("click", () => {
    const filtered = temples.filter(temple => temple.area > 90000);
    createTempleCard(filtered);
  });

  // Filtro: Small (Menores a 10,000 sq ft)
  smallLink.addEventListener("click", () => {
    const filtered = temples.filter(temple => temple.area < 10000);
    createTempleCard(filtered);
  });
});