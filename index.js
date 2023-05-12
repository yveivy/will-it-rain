document.getElementById('searchForm').addEventListener('submit', function (event) {
    event.preventDefault();

    const cityName = document.getElementById('cityInput').value;

    const apiKey = "6cdc1c1147e37a8245edcc10145f0367";

    const requestUrl = `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&limit=5&appid=${apiKey}&units=imperial`;

    fetch(requestUrl)
        .then(response => response.json())
        .then(data => {

            console.log(data);
            // grabbing the lat & lon for the next API call
            const lat = data.coord.lat;
            const lon = data.coord.lon;
            console.log(lat, lon);
            // rounding the temps so we don't get decimals
            const currentTemp = Math.round(data.main.temp);
            const highTemp = Math.round(data.main.temp_max);
            const lowTemp = Math.round(data.main.temp_min);
            const feelsLike = Math.round(data.main.feels_like);
            const pressure = data.main.pressure;
            const windSpeed = data.wind.speed;
            const humidity = data.main.humidity;
            const location = data.name;


            forecast(lat, lon); 
            renderCurrentWeather(currentTemp, highTemp, lowTemp, feelsLike, pressure, windSpeed, humidity, location);
            // City name appears on the aside under search bar
            const displayLocation = document.getElementById("city-weather")
            displayLocation.textContent = "Enjoy the weather in " + location;
            console.log(location);
   
        })

});
// second API call to get the forecast for the next week
function forecast(lat, lon) {
    const apiKey = "6cdc1c1147e37a8245edcc10145f0367";
    const forecastUrl = `https://api.openweathermap.org/data/2.5/forecast?lat=${lat}&lon=${lon}&appid=${apiKey}&units=imperial`
 
    fetch(forecastUrl)
        .then(response => response.json())
        .then(data => {
            
            console.log(data);
            const daily = []
            // iterating through the daily array to get the weather for each upcoming day
            for (let i = 0; i < data.list.length; i+=8) {
                const dayData = data.list[i];
            //  rounding the temp to prevent decimals
                const temperature = Math.round(dayData.main.temp);
                const dateTimeString = dayData.dt_txt;
                // Date object. The Z indicates UTC
                const date = new Date(dateTimeString + 'Z');
                // UTC time offset between local time with offset conversion to milliseconds
                const timeZoneOffset = date.getTimezoneOffset() * 60 * 1000;
                // adding offset to time date object
                const adjustedDate = new Date(date.getTime() +timeZoneOffset);
                // extracts day of week so we can display in our day cards with new variable dayOfWeek
                const dayOfWeek = adjustedDate.toLocaleDateString('en-US', {weekday: 'long'});
                console.log(`${dayOfWeek}: ${temperature}`);
                daily.push({
                    dayOfWeek,
                    temperature
                })
            }
           renderDailyWeather(daily)
        })
         
};
// Cool little helper function that saves time and space and you can just plug in the selector, and value 
function setValue(selector, value, {parent = document} = {}) {
    parent.querySelector(`[data-${selector}]`).textContent = value
}

function renderCurrentWeather(currentTemp, highTemp, lowTemp, feelsLike, pressure, windSpeed, humidity) {
    setValue("current-temp", currentTemp)
    setValue("current-high", highTemp)
    setValue("current-low", lowTemp)
    setValue("current-fl-high", feelsLike)
    setValue("current-pressure", pressure)
    setValue("current-wind", windSpeed)
    setValue("current-humidity", humidity)
  
}
// grabbing the forecast section so we can display our weather for the next week so we can display the week day and temperature for that each day
const dailySection = document.querySelector("[data-day-section]")
const dayCardTemplate = document.getElementById("day-card-template")
function renderDailyWeather(daily) {
    dailySection.innerHTML = ""
    daily.forEach(day => {
        const element = dayCardTemplate.content.cloneNode(true)
        setValue("temp", day.temperature, { parent: element })
        setValue("date", day.dayOfWeek, { parent: element})

        // tried to dynamically change the font size and text color of the daily weather but ended up removing because it didn't look great.
        // const tempElement = element.querySelector("[data-temp]");
        // tempElement.style.fontSize = "3rem";
       
        // const dateElement = element.querySelector("[data-date]");
        // dateElement.style.fontSize = "2rem";
        // dateElement.style.color = "navy";
        dailySection.append(element)
        
    })
}




