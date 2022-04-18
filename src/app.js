function displayDate() {
  let now = new Date();
  let hours = now.getHours();
  let mins = now.getMinutes();
  let days = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  let day = days[now.getDay()];
  let dateBanner = document.querySelector("#current-date");
  dateBanner.innerHTML = `It's ${day}, ${hours}:${mins}`;
}
displayDate();

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = `${currentTemp}°`;
  let currentDescription = response.data.weather[0].description;
  document.querySelector("#weather-description").innerHTML = currentDescription;
}

function searchCity(cityName) {
  let apiKey = "73acc0b3796ba1b95c56bb718cffc4c2";
  let weatherCityApiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${apiKey}&units=metric`;
  axios.get(weatherCityApiUrl).then(showWeather);
}

function handleSubmit(event) {
  event.preventDefault();
  let cityInput = document.querySelector("#city-input");
  let cityName = cityInput.value;
  searchCity(cityName);
}

let searchCityForm = document.querySelector("#city-search-bar");
searchCityForm.addEventListener("submit", handleSubmit);

searchCity("Tokyo");

function searchLocation(position) {
  let apiKey = "73acc0b3796ba1b95c56bb718cffc4c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${position.coords.latitude}&lon=${position.coords.longitude}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(showWeather);
}

function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(searchLocation);
}

let currentLocationButton = document.querySelector("#current-button");
currentLocationButton.addEventListener("click", getCurrentLocation);
