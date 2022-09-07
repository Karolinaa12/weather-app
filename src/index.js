function getForecast(coordinates) {
  console.log(coordinates);
  let apiKey = "c95d60a1e3adbeb286133f1ebebc2579";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coordinates.lat}&lon=${coordinates.lon}&appid=${apiKey}&units=metric`;
  axios.get(apiUrl).then(displayForecast);
  console.log(apiUrl);
}

function formatDay(timestamp) {
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}

function displayForecast(response) {
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast");
  let forecastHTML = `<div class="row">`;

  forecast.forEach(function (forecastDay, index) {
    if (index < 6) {
      forecastHTML =
        forecastHTML +
        `
    <div class="col-2">
                <div class="weather-forecast-date">${formatDay(forecastDay.dt)}
                </div>
                <img src="http://openweathermap.org/img/wn/${
                  forecastDay.weather[0].icon
                }@2x.png"
                width="50"/>
                <div class="weather-forecast-temperature">
                  <span class="weather-forecast-temperature-max">${Math.round(
                    forecastDay.temp.max
                  )}°C</span>
                  <span class="weather-forecast-temperature-min">${Math.round(
                    forecastDay.temp.min
                  )}°C</span>
                </div>
              </div>
    `;
    }
  });

  forecastHTML = forecastHTML + `</div>`;
  forecastElement.innerHTML = forecastHTML;
  console.log(forecastHTML);
}

let apiKey = "ecc0d5f5b2ad413f8733e1ac7c345029";
let units = "metric";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;
axios.get(apiUrl).then(displayWeatherCondition);

function backgroundColor() {
  let hours = currentTime.getHours();
  if (hours > 18) {
    let backgroundEvening = document.querySelector("#background");
    backgroundEvening.classList.add("night");
  }
  if (hours > 0 && hours < 6) {
    let backgroundNight = document.querySelectorAll("#background");
    backgroundNight.classList.add("night");
  }
}

function backgroundColorForecast() {
  let hours = currentTime.getHours();
  if (hours > 18) {
    let backgroundEveningForecast = document.querySelector(
      "#backgroundForecast"
    );
    backgroundEveningForecast.classList.add("nightt");
  }
  if (hours > 0 && hours < 6) {
    let backgroundNightForecast = document.querySelectorAll(
      "#backgroundForecast"
    );
    backgroundNightForecast.classList.add("nightt");
  }
}

//1 date
function formatDate(date) {
  let hours = currentTime.getHours();
  if (hours < 10) {
    hours = `0${hours}`;
  }
  let minutes = currentTime.getMinutes();
  if (minutes < 10) {
    minutes = `0${minutes}`;
  }

  let dayIndex = currentTime.getDay();
  let days = [
    "sunday",
    "monday",
    "tuesday",
    "wednesday",
    "thursday",
    "friday",
    "satday",
    "sunday",
  ];

  let currentDay = days[dayIndex];

  let currentDate = currentTime.getDate();

  let monthIndex = currentTime.getMonth();
  let months = [
    "jan",
    "feb",
    "mar",
    "apr",
    "may",
    "jun",
    "jul",
    "aug",
    "sep",
    "oct",
    "nov",
    "dec",
  ];
  let currentMonth = months[monthIndex];
  return `${hours}:${minutes} ${currentDay}, ${currentDate} ${currentMonth}`;
}

let displayedDate = document.querySelector("#date");
let currentTime = new Date();
displayedDate.innerHTML = formatDate(currentTime);

//2 search engine
//input city weather
function displayWeatherCondition(response) {
  let iconElement = document.querySelector("#icon");

  console.log(response.data);

  celsiusTemperature = response.data.main.temp;

  document.querySelector("#city").innerHTML = response.data.name;
  document.querySelector("#description").innerHTML =
    response.data.weather[0].main;
  document.querySelector("#temperature-display").innerHTML = Math.round(
    response.data.main.temp
  );
  document.querySelector("#feels-like").innerHTML =
    response.data.main.feels_like;
  document.querySelector("#humidity").innerHTML = response.data.main.humidity;
  document.querySelector("#wind").innerHTML = Math.round(
    response.data.wind.speed
  );

  iconElement.setAttribute(
    "src",
    `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
  );

  getForecast(response.data.coord);
}

function search(city) {
  let apiKey = "ecc0d5f5b2ad413f8733e1ac7c345029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

function handleSubmit(event) {
  event.preventDefault();
  let city = document.querySelector("#city-input").value;
  search(city);
}

let form = document.querySelector("#search-engine");
form.addEventListener("submit", handleSubmit);

//3 converting celcius to fahrenheit
function convertToF(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-display");

  celsiusLink.classList.remove("active");
  farenheitLink.classList.add("active");
  let fahrenheitTemperature = celsiusTemperature * 1.8 + 32;
  temperatureElement.innerHTML = Math.round(fahrenheitTemperature);
}

function convertToC(event) {
  event.preventDefault();
  let temperatureElement = document.querySelector("#temperature-display");

  celsiusLink.classList.add("active");
  farenheitLink.classList.remove("active");
  temperatureElement.innerHTML = Math.round(celsiusTemperature);
}

let celsiusLink = document.querySelector("#celsius-link");
celsiusLink.addEventListener("click", convertToC);

let farenheitLink = document.querySelector("#fahrenheit-link");
farenheitLink.addEventListener("click", convertToF);

//current location
function getCurrentLocation(event) {
  event.preventDefault();
  navigator.geolocation.getCurrentPosition(showLocation);
}

//Current location button function
function showLocation(position) {
  let latitude = position.coords.latitude;
  let longitude = position.coords.longitude;
  let apiKey = "ecc0d5f5b2ad413f8733e1ac7c345029";
  let units = "metric";
  let apiUrl = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${apiKey}&units=${units}`;

  axios.get(apiUrl).then(displayWeatherCondition);
}

let celsiusTemperature = null;
//Current location button
let currentLocationButton = document.querySelector("#current-location-button");
currentLocationButton.addEventListener("click", getCurrentLocation);

backgroundColor();
backgroundColorForecast();
search("Lisbon");
