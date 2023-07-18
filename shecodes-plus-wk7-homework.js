function displayDay(timestamp){
  let date = new Date(timestamp * 1000);
  let day = date.getDay();
  let days = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

  return days[day];
}


function displayForecast(response){
  console.log(response.data.daily)
  let forecast = response.data.daily
  let forecastElement = document.querySelector("#forecast")
  let forecastHTML = `<div class ="row">`
  
  forecast.forEach(function (forecastDay,index) {
    if (index < 6){
    forecastHTML += `
           <div class="col-2">
          <div class="weather-forecast-date">${displayDay(forecastDay.dt)}</div>
          <img
          src="http://openweathermap.org/img/wn/${
            forecastDay.weather[0].icon
          }@2x.png"
          alt=""
          width="42"
        />
          <span>${Math.round(forecastDay.temp.max)}</span>°C <br>
          <span class="weather-forecast-temperature-min"> ${Math.round(
            forecastDay.temp.min
          )}</span><span class="metric">°C</span>
            </div>`;
    }
  });
 forecastHTML = forecastHTML + `</div>`;                            
  forecastElement.innerHTML = forecastHTML
}


function getForcast(coord){

  let apiKey = "72bb9dab46b9ec3d65f423c63f27a9b8";
  let apiUrl = `https://api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
 
  axios.get(apiUrl).then(displayForecast)
  
}

function displayWeatherCondition(response){
 
    document.querySelector("#city").innerHTML = response.data.name
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = response.data.main.temp
    let iconElement = document.querySelector("#icon")
    iconElement.setAttribute(
      "src",
      `http://openweathermap.org/img/wn/${response.data.weather[0].icon}@2x.png`
    );
    iconElement.setAttribute("alt", response.data.weather[0].description);
    
    let humidityElement = document.querySelector("#humidity")
    humidityElement.innerHTML = response.data.main.humidity
    let discriptionElement = document.querySelector("#discription")
    discriptionElement.innerHTML = response.data.weather[0].description
    let feelLikeElement = document.querySelector("#feel-like")
    feelLikeElement.innerHTML = response.data.main.feels_like
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed
     console.log(response);
    getForcast(response.data.coord);
}
    
    function searchCity(city){
         let apiKey = "f2c2fbe1921af33c1d9afdc04239ba4f";
         let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        
         axios.get(apiUrl).then(displayWeatherCondition)
       
    }

    function handleSubmit(event) {
      event.preventDefault();
      let city = document.querySelector("#city-input").value;
      searchCity(city);
    }

let searchForm = document.querySelector("#search-form");
searchForm.addEventListener("submit", handleSubmit);


function formatDate(date){
    let hours = date.getHours()
    if (hours < 10){
        hours = `0${hours}`
    }
    let minutes = date.getMinutes()
    if (minutes < 10){
        minutes = `0${minutes}`
    }
    let dayIndex = date.getDay()
    let days = [
      "Sunday",
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
    ]
    let day = days[date.getDay()];
  return `${day} ${hours}:${minutes}`
}

let dateElement = document.querySelector("#date");
let currentTime = new Date();
dateElement.innerHTML = formatDate(currentTime);

searchCity("dallas")
displayForecast()
