
function currentWeatherConditions(response) {
    let tempElement = document.querySelector("#temp");
    let currentTemp = response.data.main.temp;
    tempElement.innerHTML = Math.round(currentTemp)
    let locationElement = document.querySelector("#location");
    locationElement.innerHTML = response.data.name;
    let descriptionElement = document.querySelector("#description");
    descriptionElement.innerHTML = response.data.weather[0].description;
    let currentHumidity = document.querySelector("#humidity");
    currentHumidity.innerHTML = `${response.data.main.humidity}%`;
    let wind = document.querySelector("#wind-speed");
    wind.innerHTML = `${response.data.wind.speed}m/s`;
    let date = new Date(response.data.dt * 1000);
    let timeElement = document.querySelector("#time");
    timeElement.innerHTML = `${date.getHours()}:${date.getMinutes()}`;
    let minutes = date.getMinutes;
    let today = document.querySelector("#day");
    today.innerHTML = formatDate(date);
    let iconElement = document.querySelector("#weather-icon");
    let iconCode = response.data.weather[0].icon;
    iconElement.innerHTML = `<img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}.png" />`;

    if (minutes < 10) {
        minutes = `0${minutes}` ;
    }
    getForecast(response.data.name);
}

function formatDate(date) {
    let days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
    let day = days[date.getDay()];
return `${day}`;
}

function searchLocation(location) {
let apiKey = "a9498979f933b4259d63b76dd499f095";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${location}&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(currentWeatherConditions);
}

function locationSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#location-search");

    searchLocation(searchInput.value)
}

function formatDay(timestamp) {
let date = new Date(timestamp*1000);
let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

return days[date.getDay()];
}

function getForecast(location) {
    let apiKey = "a9498979f933b4259d63b76dd499f095";
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${location}&appid=${apiKey}&units=metric`;
    axios.get(apiUrl).then(displayForecast);
}


function displayForecast(response) {
    
    let forecast = document.querySelector("#forecast");
    let forecastHtml = " ";

    response.data.list.forEach(function(day, index) {
        if (index === 8 || index === 16 || index === 24 || index === 32 || index === 40) {
    forecastHtml = 
    forecastHtml +
    `<div class="forecast-1">
    <div class="day-1">${formatDay(day.dt)}</div>
    <img class="day-1-icon" src= "https://openweathermap.org/img/wn/${day.weather[0].icon}.png" />
    <div class="max-min-temp">
        <span class="max-temp"><strong>${Math.round(day.main.temp_max)}° </strong></span><span class="min-temp">${Math.round(day.main.temp_min)}°</span>
    </div></div>`;
    }});

    forecast.innerHTML = forecastHtml;
    console.log(response.data.list);
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", locationSearch);

searchLocation("Durban");