function displayDate(timestamp) {
  let now = new Date(timestamp);
  let hours = now.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let mins = now.getMinutes();
  if (mins < 10) {
    mins = `0${mins}`;
  }

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
  return `Last updated: ${day}, ${hours}:${mins}`;
}
displayDate();

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class = "row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `

    <div class= "col-2">
   
      <div class="weather-forecast-date">${formatDay(forecastDay.dt)}</div>
      <img
        src="http://openweathermap.org/img/wn/${
          forecastDay.weather[0].icon
        }@2x.png"
        alt=""
        width="50px"
      />
      <div class="weather-forecast-temperatures">
        <span class="weather-forecast-temperature-maximum">${Math.round(
          forecastDay.temp.max
        )}°</span>
        <span class="weather-forecast-temperature-minimum">${Math.round(
          forecastDay.temp.min
        )}°</span>
      </div>
    
    </div>
   

  `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
}

function getForecast(coordinates) {
  let apiKey = "73acc0b3796ba1b95c56bb718cffc4c2";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric
`;
  console.log(apiUrl);
  axios.get(apiUrl).then(displayForecast);
}

function showWeather(response) {
  document.querySelector("#current-city").innerHTML = response.data.name;
  let currentTemp = Math.round(response.data.main.temp);
  document.querySelector("#current-temperature").innerHTML = currentTemp;
  let currentDescription = response.data.weather[0].description;
  document.querySelector("#weather-description").innerHTML = currentDescription;
  let dateBanner = document.querySelector("#current-date");
  dateBanner.innerHTML = displayDate(response.data.dt * 1000);
  let iconElement = document.querySelector("#icon");
  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );
  iconElement.setAttribute("alt", response.data.weather[0].description);
  celsiusTemperature = response.data.main.temp;

  getForecast(response.data.coord);
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
