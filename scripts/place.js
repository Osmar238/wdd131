
const yearSpan = document.getElementById("current-year");
const currentYear = new Date().getFullYear();
yearSpan.textContent = currentYear;
const modifiedSpan = document.getElementById("last-modified");
modifiedSpan.textContent = document.lastModified;

const temperature = 10;
const windSpeed = 5; 

function calculateWindChill(temp, speed) {
    return 13.12 + 0.6215 * temp - 11.37 * Math.pow(speed, 0.16) + 0.3965 * temp * Math.pow(speed, 0.16);
}

let windChillValue = "N/A"; 

if (temperature <= 10 && windSpeed > 4.8) {

    const chill = calculateWindChill(temperature, windSpeed);
    windChillValue = `${chill.toFixed(1)} °C`;
}

const windChillElement = document.getElementById("windchill");
windChillElement.textContent = windChillValue;