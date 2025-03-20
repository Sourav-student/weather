const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const locationCity = document.getElementById("location");
const area = document.getElementById("area");
const weatherImage = document.getElementById("weatherImage");
const temp = document.getElementById("temp");
const humidity = document.getElementById("humidity");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const degree = document.getElementById("degree");
const speed = document.getElementById("speed");
const conditionWeather = document.getElementById("conditionWeather");
const pressure = document.getElementById("pressure");
const feels_like = document.getElementById("feels_like");
const weatherResult = document.getElementById("weatherResult");
const bgImg = document.querySelector(".bgImg");

let bgImages = [
    {
        src: "earlymorning.png",
        alt: "morning"
    },
    {
        src: "morning.jpg",
        alt: "morning"
    },
    {
        src: "afternoon.jpg",
        alt: "afternoon"
    },
    {
        src: "evening.jpg",
        alt: "evening"
    },
    {
        src: "night.png",
        alt: "night"
    },
    {
        src: "midnight.jpg",
        alt: "midnight"
    },
]

async function weather(city) {
    try {
        const apiKey = "23a53467954c92a6eb387719b8a599e6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            if (response.status === 404) {
                alert("Location not found. Please check the city name and try again.");
            } else {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            return;
        }

        const data = await response.json();
        locationCity.innerHTML = data.name;
        area.innerHTML = data.sys.country;
        conditionWeather.innerHTML = data.weather[0].description;

        //Main 
        temp.innerHTML = (data.main.temp - 273.15).toFixed(2);
        humidity.innerHTML = data.main.humidity;
        maxTemp.innerHTML = (data.main.temp_max - 273.15).toFixed(2);
        minTemp.innerHTML = (data.main.temp_min - 273.15).toFixed(2);
        pressure.innerHTML = data.main.pressure.toFixed(2);
        feels_like.innerHTML = (data.main.feels_like - 273.15).toFixed(2);
        weatherImage.innerHTML = `<img src="https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png" alt="Weather_Condition" class = "img1">`

        //Wind
        degree.innerHTML = data.wind.deg;
        speed.innerHTML = (data.wind.speed * (18 / 5)).toFixed(2);
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