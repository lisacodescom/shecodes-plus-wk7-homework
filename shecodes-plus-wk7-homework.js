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

searchCity("New York");
