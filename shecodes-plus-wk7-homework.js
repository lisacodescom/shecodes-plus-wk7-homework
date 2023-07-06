let apiKey = "f2c2fbe1921af33c1d9afdc04239ba4f";
let apiUrl = `https://api.openweathermap.org/data/2.5/weather?q=Dallas&appid=${apiKey}&units=metric`;
axios.get(apiUrl).then(displayWeatherCondition)