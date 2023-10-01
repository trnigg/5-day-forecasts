

//GET WEATHER
// EventListener and Text Input:
    // On Submit take Text Input:
        // Make fetch request to WeatherAPI using submitted city
        // Parse Data
        // DISPLAY WEATHER
            // Generate Weather Cards
                //Different Weather card class for first card, then remaining 5 cards
            // Append weather cards


// PREVIOUS SEARCHES
//On get weather function
    // Save Search to LocalStorage
        // Generate and append a button element
        //GET WEATHER
            // Use search term/city as name for button
            // apply the API instructions to delegate event listeners across the collection of buttons and make relevent search when corresponding button is clicked
                // DISPLAY WEATHER
        // If at least one button containing a prevously searched city exists, appened a "Clear Searches" Button


// CLEAR SEARCH HISTORY
    // EventListener when clicked clear previous searches from local memory and clear the created city buttons

// _________________________________________________________________________________________________

// Define global variables
let searchInput = document.querySelector('#search-input');
let searchButton = document.querySelector('#search-button');
let weatherContainer = document.querySelector('#weather-container');
let searchHistoryContainer = document.querySelector('#search-history');
let clearHistoryButton = document.querySelector('#clear-history-button');
let currentWeatherContainer = document.querySelector('#current-weather-container');
let forecastWeatherContainers = document.getElementsByClassName('forecast-weather-containers');

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

    // Required Weather Data
    const cityName = weatherData.name;
    const countryCode = weatherData.sys.country;
    const weatherIcon = weatherData.weather[0].icon;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed; // In m/s by default
    const windSpeedKmh = (windSpeed * 3.6).toFixed(2); // Converts windspeed from m/s to km/h and round to 2 decimal places


    // Create and display the main weather card for today

    // Create components on the weather card and set classes for Bootstrap formatting
    // Main Card
    const currentWeatherCard = document.createElement("div");
    currentWeatherCard.className = "card";
    // Card Heading
    const currentWeatherHeadingEl = document.createElement("h3");
    currentWeatherHeadingEl.className = "card-header";
    currentWeatherHeadingEl.innerHTML = `<strong>${cityName}, ${countryCode}</strong> (Today, 1st Oct 2023) ${weatherIcon}`; // need to add dynamic date and link icon to jpg // maybe strong tags to cityname
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
    // Add heading and list to card
    currentWeatherCard.appendChild(currentWeatherHeadingEl);
    currentWeatherCard.appendChild(currentWeatherBodyEl);
    // Add card to container
    currentWeatherContainer.appendChild(currentWeatherCard);




    console.log(cityName);
    console.log(countryCode);
    console.log(temperature);
    console.log(humidity);
    console.log(windSpeed); // need to convert to km/h
    console.log(weatherIcon);
    console.log(weatherData);

}
  
  // Function to display forecast data
  function displayForecastWeather(forecastData) {
    
    // Create and display weather cards for the five-day forecast
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