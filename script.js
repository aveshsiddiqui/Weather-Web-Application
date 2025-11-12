const temperatureField = document.querySelector("#temperature");
const locationField = document.querySelector("#location");
const dateandTimeField = document.querySelector("#datetime");
const conditionField = document.querySelector("#condition");
const searchForm = document.querySelector("#searchForm");
const searchInput = document.querySelector("#searchInput");
const animationContainer = document.querySelector("#weatherAnimation");
const rain = document.querySelector(".rain");
const sun = document.querySelector(".sun");
const cloud = document.querySelector(".cloud");

let targetLocation = "Delhi";

const fetchWeather = async (targetLocation) => {
  try {
    const url = `https://api.weatherapi.com/v1/current.json?key=fd2cdb5933fd4eab8e9114816251211&q=${targetLocation}&aqi=no`;
    const res = await fetch(url);
    const data = await res.json();

    updateWeather(data);
  } catch (error) {
    alert("Location not found!");
  }
};

function updateWeather(data) {
  const temp = data.current.temp_c;
  const locationName = data.location.name;
  const condition = data.current.condition.text;

  const now = new Date();
  const options = {
    timeZone: "Asia/Kolkata",
    weekday: "long",
    hour: "2-digit",
    minute: "2-digit",
    day: "numeric",
    month: "short",
    year: "numeric"
  };
  const istTime = new Intl.DateTimeFormat("en-IN", options).format(now);

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = locationName;
  dateandTimeField.innerText = istTime;
  conditionField.innerText = condition;

  setWeatherAnimation(condition);
}

function setWeatherAnimation(condition) {
  // Reset all
  rain.style.display = "none";
  sun.style.display = "none";
  cloud.style.display = "none";

  // Change animation and background
  if (condition.includes("Rain")) {
    animationContainer.style.background = "linear-gradient(to bottom, #283e51, #485563)";
    rain.style.display = "block";
  } else if (condition.includes("Sunny") || condition.includes("Clear")) {
    animationContainer.style.background = "linear-gradient(to bottom right, #f2994a, #f2c94c)";
    sun.style.display = "block";
  } else if (condition.includes("Cloud")) {
    animationContainer.style.background = "linear-gradient(to bottom right, #bdc3c7, #2c3e50)";
    cloud.style.display = "block";
  } else if (condition.includes("Mist") || condition.includes("Fog")) {
    animationContainer.style.background = "linear-gradient(to bottom right, #757f9a, #d7dde8)";
    cloud.style.display = "block";
  } else {
    animationContainer.style.background = "linear-gradient(to bottom right, #4facfe, #00f2fe)";
  }
}

searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const locationValue = searchInput.value.trim();
  if (locationValue === "") return;
  fetchWeather(locationValue);
});

fetchWeather(targetLocation);
