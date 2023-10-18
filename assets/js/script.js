// Add Day.js plugin for Ordinal Date Format - https://day.js.org/docs/en/plugin/loading-into-browser
dayjs.extend(window.dayjs_plugin_localizedFormat);

// Define global variables
var searchInput = document.querySelector('#search-input');
var searchButton = document.querySelector('#search-button');
var weatherContainer = document.querySelector('#weather-container');
var searchHistoryContainer = document.querySelector('#search-history');
var previousSearchHeading = document.querySelector('#previous-search-heading');
var clearHistoryButton = document.querySelector('#clear-history-button');
var currentWeatherContainer = document.querySelector('#current-weather-container');
var forecastWeatherContainers = document.getElementsByClassName('forecast-weather-container');

const API_KEY = '302392b3827a5512bab59a356ac0fa88';

// FUNCTION to fetch weather data from the API
function fetchCurrentWeather(city) {
    // Make a fetch request to the Weather API using the city use the deprecated built-in geocoding
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Use template-literals to insert 'city' parameter and 'API_KEY' constant and get temperature in celsius (metric).
    fetch(apiUrl) //initiates HTTP GET request
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetch Error (${response.statusText}). Please check you have entered a valid city and try again.`); //  https://www.youtube.com/watch?v=cFTFtuEQ-10 see more comments next to fetch
      }
    })
    .then(function (weatherData){
        displayCurrentWeather(weatherData);
        saveSearch(weatherData); // Save search was moved here to share call-data for city-name & countr-code
    })
    .catch(function (error) {
      alert('Could not get current weather data: ' + error.message); // if there is a run-time error, the message will be displayed here. If however, there is a fetch error, it will be displayed as thrown above.
    });
}
  
// FUNCTION to fetch forecast data from the API
function fetchForecastWeather(city) {
    // Make a fetch request to the Weather API using the city
    // NOTE: The better solution (which would simplify a lot of code) is hidden behind a paywall; https://api.openweathermap.org/data/2.5/forecast/***daily***?q=${city}&appid=${API_KEY}&units=metric
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`; // Use template-literals to insert 'city' parameter and 'API_KEY' constant and get temperature in celsius (metric).
    fetch(apiUrl) //initiates HTTP GET request
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetch Error (${response.statusText}). Please check you have entered a valid city and try again.`);
      }
    })
    .then(function (forecastData){
        displayForecastWeather(forecastData);
    })
    .catch(function (error) {
      alert('Could not get forecast weather data: ' + error.message); // if there is a run-time error, the message will be displayed here. If however, there is a fetch error, it will be displayed as thrown above.
    });
}

// FUNCTION to display weather data
function displayCurrentWeather(weatherData) {
    // Clear the #current-weather-container
    currentWeatherContainer.innerHTML = "";

    // Raw Weather Data
    const cityName = weatherData.name;
    const countryCode = weatherData.sys.country;
    const dataTimestamp = weatherData.dt;
    const weatherIconCode = weatherData.weather[0].icon;
    const weatherDescription = weatherData.weather[0].description;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed; // In m/s by default

    // Dependants 
    const windSpeedKmh = (windSpeed * 3.6).toFixed(2); // Converts windspeed from m/s to km/h and round to 2 decimal places
    const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
    const formattedTimestamp = dayjs.unix(dataTimestamp).format('ll');

    // Create HTML code for the current weather card
    const currentWeatherCardHTML = `
        <div class="card">
            <h3 class="card-header text-center">
                <strong>${cityName}, ${countryCode}</strong> (${formattedTimestamp})
                <div><img src="${weatherIconUrl}" alt="${weatherDescription}"></div>
            </h3>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>Temperature:</strong> ${temperature}°C
                </li>
                <li class="list-group-item">
                    <strong>Humidity:</strong> ${humidity}%
                </li>
                <li class="list-group-item">
                    <strong>Wind-Speed:</strong> ${windSpeedKmh}km/h
                </li>
            </ul>
        </div>
    `;

    // Set the HTML string as the innerHTML of the currentWeatherContainer
    currentWeatherContainer.innerHTML = currentWeatherCardHTML;
}
  
// FUNCTION to display forecast data
function displayForecastWeather(forecastData) {

    // Iterate through and clear each forecast container
    for (let i = 0; i < forecastWeatherContainers.length; i++) {
        const eachContainer = forecastWeatherContainers[i];
        eachContainer.innerHTML = "";
        }

    // Iterate through the forecast data and create a card for every 8 item in array (corresponding to 24 intervals)
    for (let i = 7; i < forecastData.list.length ; i+= 8) { //i must be less than number of forecast items (i = 7 + (4*8) = 39 < 40 items in array)
        const singleForecast = forecastData.list[i];
        const singleForecastCard = document.createElement("div");
        singleForecastCard.className = "card";

       // Extract (raw) relevant data
       const dataTimestamp = singleForecast.dt;
       const temperature = singleForecast.main.temp;
       const weatherIconCode = singleForecast.weather[0].icon;
       const weatherDescription = singleForecast.weather[0].description;
       const humidity = singleForecast.main.humidity;
       const windSpeed = singleForecast.wind.speed; // In m/s by default

       // Dependants / formatted data
       const windSpeedKmh = (windSpeed * 3.6).toFixed(2); // Converts windspeed from m/s to km/h and round to 2 decimal places
       const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
       const formattedTimestamp = dayjs.unix(dataTimestamp).format('ll');

       // Create an HTML string for the forecast card
       const forecastCardHTML = `
           <div class="card">
               <h4 class="card-header text-center">
                   ${formattedTimestamp}
                   <div><img src="${weatherIconUrl}" alt="${weatherDescription}"><div>
               </h4>
               <ul class="list-group list-group-flush">
                   <li class="list-group-item">
                       <strong>Temperature:</strong> ${temperature}°C
                   </li>
                   <li class="list-group-item">
                       <strong>Humidity:</strong> ${humidity}%
                   </li>
                   <li class="list-group-item">
                       <strong>Wind-Speed:</strong> ${windSpeedKmh}km/h
                   </li>
               </ul>
           </div>
       `;

       // Set the HTML string as the innerHTML of the corresponding forecast container
       // Requires manipulation of i to create multiple of 8, divide by 8 and subtract by 1. This creates and index of 0-4 (with 5 cards)
       forecastWeatherContainers[((i + 1) / 8) - 1].innerHTML = forecastCardHTML;
   }
}

  // FUNCTION to save search to local storage and update search history
  function saveSearch(weatherData) {
  // Get City Name and Country Code from API and use to save search data
    const cityName = weatherData.name;
    const countryCode = weatherData.sys.country;
    const searchData = `${cityName}, ${countryCode}`;
    // Get search history from localStorage, or initialise empty array
    const searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // check to see if current search already exists: See https://stackoverflow.com/questions/64590887/check-if-user-is-already-existed-in-localstorage
    const existingSearch = searchHistory.find(search => search === searchData);
    // if already exists, do nothing
    if (existingSearch) {
      return
    } else {
      // Push the new search to the list
    searchHistory.push(searchData);
    // Save the updated city list to local Storage
    localStorage.setItem('searchHistory', JSON.stringify(searchHistory));
    // Generate a button element for the search history
    const citySearchButton = document.createElement('button');
    // Add class-names required for Bootstrap
    citySearchButton.className = "btn btn-outline-secondary";
    //Set button text to city that was searched
    citySearchButton.innerText = searchData;
    // Append the button element
    searchHistoryContainer.appendChild(citySearchButton);
    // Add an event listener to the button to perform a new search when clicked
    citySearchButton.addEventListener('click', function() {
      fetchCurrentWeather(searchData);
      fetchForecastWeather(searchData);
    })
    displayHistorySection();
    } 
}

// FUNCTION to display the 'Previous Search' heading and 'Clear History' button
function displayHistorySection() {
    // Show Search History Heading:
    previousSearchHeading.style.display = 'block';
    // Show the "Clear Searches" button
    clearHistoryButton.style.display = 'block';
}

// EVENT listener for search submission via 'click'
searchButton.addEventListener("click", function (event) {
    event.preventDefault();
    // Get the user's input from the search field
    let city = searchInput.value;
    // Make a fetch request to the Weather API using the submitted city
    fetchCurrentWeather(city);
    fetchForecastWeather(city);
    // Clear Input Field
    searchInput.value = '';
});

// EVENT listener for search submission via 'enter' key
searchInput.addEventListener("keydown", function (event) {
    if (event.key === "Enter") {
        event.preventDefault();
        // Get the user's input from the search field
        let city = searchInput.value;
        // Make a fetch request to the Weather API using the submitted city
        fetchCurrentWeather(city);
        fetchForecastWeather(city);
        // Clear Input Field
        searchInput.value = '';
    }
});

// EVENT listener for clearing search history
clearHistoryButton.addEventListener("click", function () {
    // Clear  search history from localStorage
    localStorage.removeItem('searchHistory');
    // Remove each button (using innerHTML = '' would wipe heading)
    const buttons = searchHistoryContainer.querySelectorAll('button');
        buttons.forEach(button => {
            button.remove();
        });
    //Hide heading 
    previousSearchHeading.style.display = 'none'
    // Hide the "Clear History" button
    clearHistoryButton.style.display = 'none';
});

function init() {
    // Check if there are previous searches in local storage, or initialize an empty array
    let searchHistory = JSON.parse(localStorage.getItem('searchHistory')) || [];
    // ITERATE through each existing search and create a button.
    if (searchHistory.length > 0) {
        for (let i = 0; i < searchHistory.length; i++) {
            const searchData = searchHistory[i];
            const citySearchButton = document.createElement('button');
            citySearchButton.className = "btn btn-outline-secondary";
            citySearchButton.innerText = searchData;
            searchHistoryContainer.appendChild(citySearchButton);
            citySearchButton.addEventListener('click', function() {
                fetchCurrentWeather(searchData);
                fetchForecastWeather(searchData);
            });
        }
        displayHistorySection();
    } 
}

// CALL the init function to initialize the app
init();

