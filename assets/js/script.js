

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
    // Clear the weather container
    weatherContainer.innerHTML = "";
    // Create and display the main weather card for today
    
    const cityName = weatherData.name;
    const weatherIcon = weatherData.weather[0].icon;
    const countryCode = weatherData.sys.country;
    const temperature = weatherData.main.temp;
    const humidity = weatherData.main.humidity;
    const windSpeed = weatherData.wind.speed; // need to convert to km/h

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