// FUNCTION to execute code only run after the DOM is fully loaded

// Add Day.js plugin for Ordinal Date Format - https://day.js.org/docs/en/plugin/loading-into-browser
dayjs.extend(window.dayjs_plugin_localizedFormat);

// Define global variables
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
let weatherContainer = document.querySelector('#weather-container');
let searchHistoryContainer = document.querySelector('#search-history');
let clearHistoryButton = document.querySelector('#clear-history-button');
let currentWeatherContainer = document.querySelector('#current-weather-container');
let forecastWeatherContainers = document.getElementsByClassName('forecast-weather-container');

// Going to use the deprecated built-in geocoding
const API_KEY = '302392b3827a5512bab59a356ac0fa88';
// let requestUrl = 'api.openweathermap.org/data/2.5/forecast?q={city name}&appid={API key}'; forecast




// Function to fetch weather data from the API
function fetchCurrentWeather(city) {
    // Make a fetch request to the Weather API using the city
    let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`; // Use template-literals to insert 'city' parameter and 'API_KEY' constant and get temperature in celsius (metric).
    fetch(apiUrl) //initiates HTTP GET request
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetch Error (${response.statusText})`); //  https://www.youtube.com/watch?v=cFTFtuEQ-10 see more comments next to fetch
      }
    })
    .then(function (weatherData){
        displayCurrentWeather(weatherData);
    })
    .catch(function (error) {
      alert('Could not get current weather data: ' + error.message); // if there is a run-time error, the message will be displayed here. If however, there is a fetch error, it will be displayed as thrown above.
    });
        // Parse the response data
    // Display the weather data
    // Generate and display weather cards for the five-day forecast
    console.log(apiUrl);
}

// fetchCurrentWeather();
  
// Function to fetch forecast data from the API
function fetchForecastWeather(city) {
    // Make a fetch request to the Weather API using the city
    // NOTE: The better solution (which would simplify a lot of code) is hidden behind a paywall; https://api.openweathermap.org/data/2.5/forecast/***daily***?q=${city}&appid=${API_KEY}&units=metric
    let apiUrl = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`; // Use template-literals to insert 'city' parameter and 'API_KEY' constant and get temperature in celsius (metric).
    fetch(apiUrl) //initiates HTTP GET request
    .then(function (response) {
      if (response.ok) {
        return response.json();
      } else {
        throw new Error(`Fetch Error (${response.statusText})`);
      }
    })
    .then(function (forecastData){
        displayForecastWeather(forecastData);
    })
    .catch(function (error) {
      alert('Could not get forecast weather data: ' + error.message); // if there is a run-time error, the message will be displayed here. If however, there is a fetch error, it will be displayed as thrown above.
    });
        // Parse the response data
    // Display the weather data
    // Generate and display weather cards for the five-day forecast
    console.log(apiUrl);
}

// Function to display weather data
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


    // Create and display the main weather card for today

    // Create HTML code for the current weather card
    const currentWeatherCardHTML = `
        <div class="card">
            <h3 class="card-header">
                <strong>${cityName}, ${countryCode}</strong> (${formattedTimestamp})
                <img src="${weatherIconUrl}" alt="${weatherDescription}">
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

    console.log(weatherData);

}
  
// Function to display forecast data
function displayForecastWeather(forecastData) {

    console.log(forecastData);
    // Filter out only the fetched data to only include 1 object per day (at noon)
    // used: https://chat.openai.com/share/879bd8cf-c22c-4e1c-9142-0ecbf45872e6 as a starting point to achive this
    // Defines the filtering criteria where the .dt_txt key contains a property of "12:00:00"
    function filterForecastResults(item){
        return item.dt_txt.endsWith("12:00:00");
    }

    // Uses the filter method to go through 'list' array and create a new array containing only the elements meeting the criteria defined in the related function above
    const noonForecasts = forecastData.list.filter(filterForecastResults);

    console.log(noonForecasts);
    // Create and display weather cards for the five-day forecast

    // Iterate through and clear each forecast container
    for (let i = 0; i < forecastWeatherContainers.length; i++) {
        const eachContainer = forecastWeatherContainers[i];
        eachContainer.innerHTML = "";
        }

    // Iterate through the filtered forecast data and create a card for each
    for (let i = 0; i < noonForecasts.length && i < forecastWeatherContainers.length; i++) { //i must be less than number of forecast items and containers (should = 5)
        const singleForecast = noonForecasts[i];
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
       const windSpeedKmh = (windSpeed * 3.6).toFixed(2);
       const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
       const formattedTimestamp = dayjs.unix(dataTimestamp).format('ll');

       // Create an HTML string for the forecast card
       const forecastCardHTML = `
           <div class="card">
               <h4 class="card-header">
                   ${formattedTimestamp}
                   <img src="${weatherIconUrl}" alt="${weatherDescription}">
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
       forecastWeatherContainers[i].innerHTML = forecastCardHTML;
   }
}



  // Function to save search to local storage and update search history
  function saveSearch(city) {
    // Save the city to local storage
    // Generate and append a button element for the search history
    // Add an event listener to the button to perform a new search when clicked
    // Update the search history container
    // Show the "Clear Searches" button
}


// Event listener for form submission
searchButton.addEventListener("click", function (event) {
    event.preventDefault();

    // Get the user's input from the search field
    let city = searchInput.value;
    // Make a fetch request to the Weather API using the submitted city
    fetchCurrentWeather(city);
    fetchForecastWeather(city);
    saveSearch(city);
    searchInput.value = '';
});


// Event listener for clearing search history
clearHistoryButton.addEventListener("click", function () {
  // Clear the search history from local storage
  // Clear the search history container
  // Hide the "Clear History" button
});

// Function to initialize the app
function init() {
  // Check if there are previous searches in local storage
  // If there are, generate and display buttons for each search
  // Show or hide the "Clear History" button based on search history
}

// Call the init function to initialize the app
init();