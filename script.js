const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const locationCity = document.getElementById("location");
const area = document.getElementById("area");
const weatherImage = document.getElementById("weatherImage");
const weatherResult = document.getElementById("weatherResult");

async function weather(city) {
    try {
        const apiKey = "23a53467954c92a6eb387719b8a599e6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        const data = await response.json();


        locationCity.innerHTML = data.name;
        area.innerHTML = data.sys.country;
        weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather_Condition" class = "img1">`

        const weatherCondition = 
        `<section>
        <p><b>Description - ${data.weather[0].description}</b></p>
        <p><b>Temperature - ${(data.main.temp - 273.15).toFixed(2)}&deg;C</b></p>
        <p><b>Humidity - ${data.main.humidity}%</b></p>
        </section>
        <ul>
        <li>Max Temperature - ${(data.main.temp_max - 273.15).toFixed(2)}&deg;C</li>
        <li>Min Temperature - ${(data.main.temp_min - 273.15).toFixed(2)}&deg;C</li>
        <li>Feel Like - ${(data.main.feels_like - 273.15).toFixed(2)}&deg;C</li>
        <li>Pressure - ${data.main.pressure.toFixed(2)}hPa</li>
        <li>Wind Speed - ${(data.wind.speed * (18 / 5)).toFixed(2)}km/h</li>
        <li>Visibility - ${(data.visibility / 1000).toFixed(2)}km</li>
        </ul>`
        
        weatherResult.innerHTML = weatherCondition;
    }
    catch (error) {
        console.error("An error occurred:", error.message);
    }
}

weather("Mumbai");

function showWeather() {
    //This is for Phone
    searchBtn.addEventListener("click", () => {
        const city = searchBar.value;
        weather(city);
    })

    //This is for PC
    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") { 
            const city = searchBar.value;
            weather(city);
        }
    });
}

showWeather();