function currentWeatherConditions(response) {
    let tempElement = document.querySelector("#temp");
    let currentTemp = response.data.main.temp;
    let locationElement = document.querySelector("#location");
    
    
    locationElement.innerHTML = response.data.name;
    tempElement.innerHTML = Math.round(currentTemp)
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

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", locationSearch);

searchLocation("Durban")