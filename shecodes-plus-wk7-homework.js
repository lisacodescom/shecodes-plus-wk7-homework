function displayForecast(response){
  let forecast = response.data.daily;
  let forecastElement = document.querySelector("#forecast")
  let forecastHTML = `<div class ="row">`
  let days = ["Thu", "Fri", "Sat", "Sun"]
  days.forEach(function (day){
  forecastHTML =
    forecastHTML +`
                               <div class="col-2">
                                ${day}
                                <img src="data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAADAAAAAwCAYAAABXAvmHAAAABHNCSVQICAgIfAhkiAAAAAlwSFlzAAALEgAACxIB0t1+/AAAAdVJREFUaN7tmc1thDAQRimBElwCJVBCSvAxR5fgEiiBEiiBErhyIx24A2cc2WhiAf4ZA1rJkZ4UZZPN9/AwHrON1rr5ZJoqUAWqQBWoAlWgxJf++WaAAGZAAdpD2dfM7zDS/yopAGE6YDoIHMLIdK8KQIAWGIAtQ8Bh/r59bQWQjCBILCkSJIF1XVuAA9Jivm9ROd0ukS0AQTtgA7SH+Vn31EoEBSAMA2YUUAHiJDyWcCtBuidIArZEroJewVEpjQSJjiIgMsMbpHdjf53sCcEWSxEYCQKOyZQhkshZBZYkYEtHeLVPQSGJnHIS0QI2/FIo+L+VILTXOUVA3BD+D3Q/pAqoFIEebUxFQQLJN/Ojo0TEqDG/JgBv1hdgeVNAP4CKPSvkCKiCQc1KSMRs2+x902hO/Z4cYFhgWOQHY8zo9hOKgCCGH71BEXcqHjEBKDft5gowypVH4YeLgKE9ZSO10cxz7z7TFJqxOEUgZxyYbPi+0M4uSRuZPYCnCPBA6TwrYCWWyFbJImo/FTMpM6pAG5CYvDO0LDii7x2JNAtdSGxuQyp41Q87UqkHW8NJzYsbw+8d6Y5Hi+7qbw8IyOIPd9HRVD8qUD8fqAJVoApUgSrwqfwCJ6xaZshM+xMAAAAASUVORK5CYII=" width="40">
                                20° 18°
                               </div>`
  
})
 forecastHTML = forecastHTML + `</div>`;                            
  forecastElement.innerHTML = forecastHTML
}


function getForcast(coord){

  let apiKey = "f2c2fbe1921af33c1d9afdc04239ba4f";
  let apiUrl = `api.openweathermap.org/data/2.5/onecall?lat=${coord.lat}&lon=${coord.lon}&appid=${apiKey}&units=metric`;
 axios.get(apiUrl).then(displayForecast)
  
}

function displayWeatherCondition(response){
    document.querySelector("#city").innerHTML = response.data.name
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = response.data.main.temp
    let discriptionElement = document.querySelector("#discription")
    discriptionElement.innerHTML = response.data.weather[0].description
    let feelLikeElement = document.querySelector("#feel-like")
    feelLikeElement.innerHTML = response.data.main.feels_like
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed
    getForcast(response.data.coord);
}
    
    function searchCity(city){
         let apiKey = "f2c2fbe1921af33c1d9afdc04239ba4f";
         let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`;
        console.log(apiUrl)
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
