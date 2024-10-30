const apiKey = '182178604672049776c34d6afbbef86c';

document.getElementById('search-button').addEventListener('click', () => {
    const city = document.getElementById('city-input').value;
    if (city) {
        getWeather(city);
    }
});

async function getWeather(city) {
    const currentWeatherResponse = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`);
    const currentWeatherData = await currentWeatherResponse.json();

    if (currentWeatherData.cod === 200) {
        document.getElementById('location').innerText = `${currentWeatherData.name}, ${currentWeatherData.sys.country}`;
        document.getElementById('temp').innerText = `Temperature: ${currentWeatherData.main.temp} °C`;
        document.getElementById('humidity').innerText = `Humidity: ${currentWeatherData.main.humidity}%`;
        document.getElementById('wind').innerText = `Wind Speed: ${currentWeatherData.wind.speed} m/s`;
        
        const weatherIcon = document.getElementById('weather-icon');
        weatherIcon.src = `http://openweathermap.org/img/wn/${currentWeatherData.weather[0].icon}@2x.png`;

        const forecastResponse = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${apiKey}&units=metric`);
        const forecastData = await forecastResponse.json();
        displayForecast(forecastData);
    } else {
        alert("City not found. Please try again.");
    }
}

function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Weather Icon" />
            <p>Temp: ${data.list[i].main.temp} °C</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
            <p>Wind: ${data.list[i].wind.speed} m/s</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}


function displayForecast(data) {
    const forecastContainer = document.getElementById('forecast-container');
    forecastContainer.innerHTML = '';
    for (let i = 0; i < data.list.length; i += 8) {
        const forecastItem = document.createElement('div');
        forecastItem.classList.add('forecast-item');
        forecastItem.innerHTML = `
            <p>${new Date(data.list[i].dt * 1000).toLocaleDateString()}</p>
            <img src="http://openweathermap.org/img/wn/${data.list[i].weather[0].icon}@2x.png" alt="Weather Icon" />
            <p>Temp: ${data.list[i].main.temp} °C</p>
            <p>Humidity: ${data.list[i].main.humidity}%</p>
            <p>Wind: ${data.list[i].wind.speed} m/s</p>
        `;
        forecastContainer.appendChild(forecastItem);
    }
}
