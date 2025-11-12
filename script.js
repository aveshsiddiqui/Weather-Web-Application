const temperatureField = document.querySelector(".temp p");
const locationField = document.querySelector(".time_location p");
const dateandTimeField = document.querySelector(".time_location span");
const conditionField = document.querySelector(".condition p");
const searchField = document.querySelector(".search_area");
const form = document.querySelector("form");

form.addEventListener('submit', searchLocation);

let targetLocation = 'Delhi';

// Fetch weather data
const fetchResult = async (targetLocation) => {
  const url = `https://api.weatherapi.com/v1/current.json?key=fd2cdb5933fd4eab8e9114816251211&q=${targetLocation}&aqi=no`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    console.log(data);

    let locationName = data.location.name;
    let time = data.location.localtime;
    let temp = data.current.temp_c;
    let condition = data.current.condition.text;

    updateDetails(temp, time, locationName, condition);
  } catch (err) {
    console.log("Error fetching data:", err);
  }
};

// Update UI with fetched data
function updateDetails(temp, time, localName, condition) {
  let [splitDate, splitTime] = time.split(' ');
  let currentDay = getDayName(new Date(splitDate).getDay());

  temperatureField.innerText = `${temp}°C`;
  locationField.innerText = localName;
  dateandTimeField.innerText = `${splitDate} ${currentDay} ${splitTime}`;
  conditionField.innerText = condition;

  // 🌈 Dynamic background based on condition
  const container = document.querySelector('.container');
  container.className = 'container'; // reset previous
  const conditionLower = condition.toLowerCase();

  if (conditionLower.includes('sun')) {
    container.classList.add('sunny');
  } else if (conditionLower.includes('cloud')) {
    container.classList.add('cloudy');
  } else if (conditionLower.includes('rain')) {
    container.classList.add('rainy');
  } else if (conditionLower.includes('mist') || conditionLower.includes('fog')) {
    container.classList.add('mist');
  } else if (conditionLower.includes('clear')) {
    container.classList.add('clear');
  }
}

// Handle search
function searchLocation(e) {
  e.preventDefault();
  targetLocation = searchField.value;
  fetchResult(targetLocation);
}

// Initial call
fetchResult(targetLocation);

// Get day name
function getDayName(number) {
  switch (number) {
    case 0: return 'Sunday';
    case 1: return 'Monday';
    case 2: return 'Tuesday';
    case 3: return 'Wednesday';
    case 4: return 'Thursday';
    case 5: return 'Friday';
    case 6: return 'Saturday';
  }
}
