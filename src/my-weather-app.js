
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
    let today = document.querySelector("#day");
    today.innerHTML = formatDate(date);
    let iconElement = document.querySelector("#weather-icon");
    let iconCode = response.data.weather[0].icon;
    iconElement.innerHTML = `<img class="weather-icon" src="https://openweathermap.org/img/wn/${iconCode}.png" />`;
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

function displayForecast() {
    let forecast = document.querySelector("#forecast");
    let forecastHtml = " ";

    let days = ["Wed", "Thur", "Fri", "Sat", "Sun"];

    days.forEach(function(day) {
    forecastHtml = 
    forecastHtml +
    `<div class="forecast-1">
    <div class="day-1">${day}</div>
    <img class="day-1-icon" src= "https://openweathermap.org/img/wn/50d@2x.png" />
    <div class="max-min-temp">
        <span class="max-temp"><strong>19 c</strong></span><span class="min-temp"> 25 c</span>
    </div></div>`;
    });

    forecast.innerHTML = forecastHtml;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", locationSearch);

searchLocation("Durban");
displayForecast();