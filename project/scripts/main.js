/* scripts/main.js */

// 1. LISTA DE PRODUCTOS
const products = [
    {
        id: 1,
        name: "Concha de Vainilla",
        price: 15.00,
        type: "dulce",
        image: "images/conchas.jpg", 
        description: "Clásica concha con costra de azúcar."
    },
    {
        id: 2,
        name: "Puerquito",
        price: 5.00,
        type: "salado",
        image: "images/puerquito.jpg",
        description: "Ideal para acompañar el café."
    },
    {
        id: 3,
        name: "Dona de Chocolate",
        price: 18.00,
        type: "dulce",
        image: "images/dona-chocolate.jpg",
        description: "Cubierta con chocolate semiamargo."
    },
    {
        id: 4,
        name: "Cuernito",
        price: 12.00,
        type: "salado",
        image: "images/cuernito.jpg",
        description: "Suave por dentro, crujiente por fuera."
    },
    {
        id: 5,
        name: "Berlina",
        price: 10.00,
        type: "dulce",
        image: "images/berlinas.jpg",
        description: "Rellena de crema pastelera."
    },
    {
        id: 6,
        name: "Muffin",
        price: 14.00,
        type: "dulce",
        image: "images/muffin.jpg",
        description: "Esponjosa con toque de naranja."
    }
];

// 2. RENDERIZAR PRODUCTOS
function renderProducts(breadList) {
    const container = document.getElementById("product-container");
    
    if (container) {
        container.innerHTML = ""; 

        breadList.forEach(bread => {
            const cardHTML = `
                <div class="card">
                    <img src="${bread.image}" alt="${bread.name}" loading="lazy">
                    <div class="product-info">
                        <h3>${bread.name}</h3>
                        <p>${bread.description}</p>
                        <div class="price">$${bread.price.toFixed(2)}</div>
                    </div>
                    <div class="qty-controls-index">
                        <button class="btn-add-index" onclick="addToCart('${bread.name}')">AGREGAR</button>
                    </div>
                </div>
            `;
            container.innerHTML += cardHTML;
        });
    }
}

// 3. FUNCIONES DEL CARRITO
function addToCart(productName) {
    let currentCount = parseInt(localStorage.getItem('cartCount') || 0);
    currentCount++;
    localStorage.setItem('cartCount', currentCount);
    updateCounterDisplay();
    
    // AQUÍ ESTÁ EL CAMBIO: En lugar de alert(), usamos nuestra notificación personalizada
    showToast(`¡${productName} agregado al carrito!`);
}

function updateCounterDisplay() {
    const badge = document.getElementById('cart-count');
    const count = localStorage.getItem('cartCount') || 0;
    if (badge) {
        badge.textContent = count;
    }
}

// 4. NUEVA FUNCIÓN: NOTIFICACIÓN FLOTANTE (TOAST)
function showToast(message) {
    // Creamos el div del mensaje
    const toast = document.createElement("div");
    toast.className = "toast";
    toast.textContent = message;
    
    // Lo agregamos al cuerpo de la página
    document.body.appendChild(toast);
    
    // Hacemos que aparezca (activando la clase 'show' después de un momentito)
    setTimeout(() => { toast.classList.add("show"); }, 100);
    
    // Hacemos que desaparezca después de 3 segundos
    setTimeout(() => {
        toast.classList.remove("show");
        // Lo borramos del HTML para no dejar basura
        setTimeout(() => { document.body.removeChild(toast); }, 300);
    }, 3000);
}

// INICIALIZACIÓN
document.addEventListener('DOMContentLoaded', () => {
    renderProducts(products);
    updateCounterDisplay();
});