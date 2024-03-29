function locationSearch(event) {
    event.preventDefault();
    let searchInput = document.querySelector("#location-search");
    let locationElement = document.querySelector("#location");
    locationElement.innerHTML = searchInput.value;
}

let searchFormElement = document.querySelector("#search-form");
searchFormElement.addEventListener("submit", locationSearch);

