

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
let searchInput = document.querySelector("#search-input");
let searchButton = document.querySelector("#search-button");
let weatherContainer = document.querySelector("#weather-container");
let searchHistoryContainer = document.querySelector("#search-history");
let clearHistoryButton = document.querySelector("#clear-history-button");


// Function to fetch weather data from the API
function fetchWeather(city) {
    // Make a fetch request to the Weather API using the city
    // Parse the response data
    // Display the weather data
    // Generate and display weather cards for the five-day forecast
  }
  
  // Function to display weather data
  function displayWeather(weatherData) {
    // Clear the weather container
    weatherContainer.innerHTML = "";
  
    // Create and display the main weather card for today
    
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
  fetchWeather(city);
  displayWeather(weatherData);
});



// Event listener for clearing search history
clearSearchButton.addEventListener("click", function () {
  // Clear the search history from local storage
  // Clear the search history container
  // Hide the "Clear Searches" button
});

// Function to initialize the app
function init() {
  // Check if there are previous searches in local storage
  // If there are, generate and display buttons for each search
  // Show or hide the "Clear Searches" button based on search history
}

// Call the init function to initialize the app
init();