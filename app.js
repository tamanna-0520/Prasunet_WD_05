const apiKey = "3c4901e1d17c920a7a20acc59ccd1caf";
const weatherContainer = document.getElementById('weather-container');
const searchBtn = document.getElementById('search-btn');
const locationInput = document.getElementById('search-bar');
// const weatherIcon = document.querySelector(".weather-icon");

searchBtn.addEventListener('click', () => {
    const location = locationInput.value;
    if (location) {
        fetchWeatherData(location);
    } else {
        alert('Please enter a location.');
    }
});

function fetchWeatherData(location) {
    fetch(`https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`)
        .then(response => response.json())
        .then(data => displayWeatherData(data))
        .catch(error => {
            weatherContainer.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
        });
}

function displayWeatherData(data) {
    if (data.cod === 200) {
        const { name, main, weather } = data;
        weatherContainer.innerHTML = `
            <div id="city-name">Weather in ${name}</div>
            <div class="weather-item">Temperature: ${main.temp} °C</div>
            <div class="weather-item">Humidity: ${main.humidity} %</div>
            <div class="weather-item">Conditions: ${weather[0].description}</div>
        `;
    } else {
        weatherContainer.innerHTML = `<p>${data.message}</p>`;
    }
}

// Optionally, fetch weather data based on user's current location
function fetchWeatherByGeolocation() {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position => {
            const { latitude, longitude } = position.coords;
            fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=metric`)
                .then(response => response.json())
                .then(data => displayWeatherData(data))
                .catch(error => {
                    weatherContainer.innerHTML = `<p>Error fetching weather data: ${error.message}</p>`;
                });
        });
    } else {
        weatherContainer.innerHTML = '<p>Geolocation is not supported by this browser.</p>';
    }
}

// Automatically fetch weather data based on user's location on page load
window.onload = fetchWeatherByGeolocation;

//Changing the weather icon
if(data.weather[0].description=="scattered clouds") {
    weatherIcon.src = "clouds.png";
} 
else if(data.weather[0].description=="Clear") {
    weatherIcon.src = "clear.png";
} 
else if(data.weather[0].description=="Rain") {
    weatherIcon.src = "rain.png";
}
else if(data.weather[0].description=="Drizzle") {
    weatherIcon.src = "drizzle.png";
}