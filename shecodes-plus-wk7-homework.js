function displayWeatherCondition(response){
    let cityElement = document.querySelector("#city")
    cityElement.innerHTML = response.data.name
    let temperatureElement = document.querySelector("#temperature")
    temperatureElement.innerHTML = response.data.main.temp
    let discriptionElement = document.querySelector("#discription")
    discriptionElement.innerHTML = response.data.weather[0].description
    let feelLikeElement = document.querySelector("#feel-like")
    feelLikeElement.innerHTML = response.data.main.feels_like
    let windElement = document.querySelector("#wind");
    windElement.innerHTML = response.data.wind.speed
}

let apiKey = "f2c2fbe1921af33c1d9afdc04239ba4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition)