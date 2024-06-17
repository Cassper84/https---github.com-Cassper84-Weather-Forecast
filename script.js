const apiKey = '186eb1c235f093a60286d4f110646e7d';
const url = 'https://api.openweathermap.org/data/2.5/weather?units=metric&q=';
const searchButton = document.getElementById("search-button");
const cityInput = document.getElementById("city-input");
const cityName = document.getElementById("city-name");
const weatherIcon = document.getElementById("weather-icon");
const weatherDescription = document.getElementById("weather-description");
const humiditySpan = document.getElementById("humidity");
const windSpeedSpan = document.getElementById("wind-speed");
const temp = document.getElementById("temperature");
const feels = document.getElementById("feels-like");
const error = document.getElementById("error-message");
const loading = document.getElementById("loading-indicator");
const contryName = document.getElementById("Country");

searchButton.addEventListener("click", () => {
  loading.style.display = "block"
  const city = cityInput.value.trim();
  if(city){
    fetchWeather(city);
  }  
});

async function fetchWeather (city){
  try {
    const response = await fetch(url + city + `&appid=${apiKey}`);
    const data = await response.json()
    console.log(data);
    if (data.cod === "404") {
             error.textContent = "City not found!";
             document.querySelector(".weather-info").style.display = "none";
             document.querySelector(".icon-container").style.display = "none";
             loading.style.display = "none";
          }
          if (data.cod !== "404") {
            error.textContent = ""; // Clear error message
            document.querySelector(".weather-info").style.display = "flex";
            document.querySelector(".icon-container").style.display = "flex"; 
            loading.style.display = "none"
            
          }
          
         
  cityName.textContent = data.name;
  temp.textContent = `${Math.round(data.main.temp)} °C`;
  feels.textContent = `Feels like ${Math.round(data.main.feels_like)} °C`;
  weatherIcon.src = `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`;
  weatherDescription.textContent = data.weather[0].description;
  humiditySpan.textContent = `${data.main.humidity} % Humidity`;
  windSpeedSpan.textContent = `${data.wind.speed} m/s Wind-speed`;
  contryName.textContent = data.sys.country;
  } catch (error) {
    console.error(`ERROR: ${error}`);
  }
 
}




  

