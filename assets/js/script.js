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

    // Create components on the weather card and set classes for Bootstrap formatting
    // Main Card
    const currentWeatherCard = document.createElement("div");
    currentWeatherCard.className = "card";
    // Card Heading
    const currentWeatherHeadingEl = document.createElement("h3");
    currentWeatherHeadingEl.className = "card-header";
    currentWeatherHeadingEl.innerHTML = `<strong>${cityName}, ${countryCode}</strong> (${formattedTimestamp})`; // need to add dynamic date and link icon to jpg // maybe strong tags to cityname
    // Weather Icon Img Element
    const iconImageEl = document.createElement('img');
    iconImageEl.src = weatherIconUrl;
    iconImageEl.alt = weatherDescription;


    // TODO: REFACTOR THIS WHOLE SECTION TO GENERATE ONE CARD WITH THE BELOW ALL AS .innerHTML
    // Weather Details Container;
    const currentWeatherBodyEl = document.createElement("ul");
    currentWeatherBodyEl.classList.add("list-group", "list-group-flush");
    // Temperature Item
    const currentTempEl = document.createElement("li");
    currentTempEl.className = "list-group-item";
    currentTempEl.innerHTML = `<strong>Temperature:</strong> ${temperature}°C`;
    // Humidity Item
    const currentHumidityEl = document.createElement("li");
    currentHumidityEl.className = "list-group-item";
    currentHumidityEl.innerHTML = `<strong>Humidity:</strong> ${humidity}%`;
    // Windspeed Item
    const currentWindEl = document.createElement("li");
    currentWindEl.className = "list-group-item";
    currentWindEl.innerHTML = `<strong>Wind-Speed:</strong> ${windSpeedKmh}km/h`;

    // Combine all to complete card and add to DOM
    // Add list-items to list
    currentWeatherBodyEl.appendChild(currentTempEl);
    currentWeatherBodyEl.appendChild(currentHumidityEl);
    currentWeatherBodyEl.appendChild(currentWindEl);
    // Add icon image to Heading
    currentWeatherHeadingEl.appendChild(iconImageEl);
    // Add heading and list to card
    currentWeatherCard.appendChild(currentWeatherHeadingEl);
    currentWeatherCard.appendChild(currentWeatherBodyEl);
    // Add card to container
    currentWeatherContainer.appendChild(currentWeatherCard);

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
        const windSpeedKmh = (windSpeed * 3.6).toFixed(2); // Converts windspeed from m/s to km/h and round to 2 decimal places
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;
        const formattedTimestamp = dayjs.unix(dataTimestamp).format('ll');

        // Create card content with formatted data and include bootstrap element classes for required formatting
        singleForecastCard.innerHTML = `
            <h4 class="card-header">${formattedTimestamp} <img src="${weatherIconUrl}" alt="${weatherDescription}"></h4>
            <ul class="list-group list-group-flush">
                <li class="list-group-item">
                    <strong>Temperature:</strong>
                    ${temperature}°C
                </li>
                <li class="list-group-item"><strong>Humidity:</strong> ${humidity}%</li>
                <li class="list-group-item"><strong>Wind-Speed:</strong> ${windSpeedKmh}km/h</li>
            </ul>
        `;

        // Append the forecast card to the corresponding forecast container
        forecastWeatherContainers[i].appendChild(singleForecastCard);
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