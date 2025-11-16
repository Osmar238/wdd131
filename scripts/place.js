/* ----------------------------------- */
/* --- 1. DATOS DEL FOOTER (PIE DE PÁGINA) --- */
/* ----------------------------------- */

// Criterio #9: Año actual
// Obtenemos el elemento <span> con id "current-year"
const yearSpan = document.getElementById("current-year");
// Obtenemos el año actual con el objeto Date()
const currentYear = new Date().getFullYear();
// Escribimos el año en ese <span>
yearSpan.textContent = currentYear;


// Criterio #9: Fecha de última modificación
// Obtenemos el elemento <span> con id "last-modified"
const modifiedSpan = document.getElementById("last-modified");
// 'document.lastModified' es una propiedad del navegador que nos da la fecha
modifiedSpan.textContent = document.lastModified;


/* ----------------------------------- */
/* --- 2. CÁLCULO DEL WIND CHILL --- */
/* ----------------------------------- */

// Criterio #8: Valores estáticos (tomados de tu HTML)
const temperature = 10; // Temperatura en °C
const windSpeed = 5; // Velocidad del viento en km/h

// Criterio #8: Función 'calculateWindChill'
// Esta es la fórmula para unidades métricas (°C, km/h)
function calculateWindChill(temp, speed) {
    // Requerido: Debe ser una sola línea de código
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

// Criterio #8: Lógica de condiciones
// Solo calculamos si T <= 10°C Y V > 4.8 km/h
let windChillValue = "N/A"; // Valor por defecto si no se cumplen

if (temperature <= 10 && windSpeed > 4.8) {
    // Si se cumplen, llamamos a la función
    const chill = calculateWindChill(temperature, windSpeed);
    // Redondeamos a un decimal y añadimos "°C"
    windChillValue = `${chill.toFixed(1)} °C`;
}

// Criterio #8: Mostrar el resultado en la página
// Obtenemos el elemento <dd> con id "windchill"
const windChillElement = document.getElementById("windchill");
// Escribimos el valor (ya sea "N/A" o el cálculo)
windChillElement.textContent = windChillValue;