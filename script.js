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


        if (typeof data.timezone === "number") {
            const utcTime = new Date(Date.now());
            const localTime = new Date(utcTime.getTime() + (data.timezone * 1000));
            const hour = localTime.getUTCHours();

            if (hour >= 4 && hour < 7) {
                bgImg.innerHTML = `<img src=${bgImages[0].src} alt=${bgImages[0].alt} class = "bg-img">`; // Morning
            }
            else if (hour >= 7 && hour < 12) {
                bgImg.innerHTML = `<img src=${bgImages[1].src} alt=${bgImages[1].alt} class = "bg-img">`; // Morning
            }
            else if (hour >= 12 && hour < 17) {
                bgImg.innerHTML = `<img src=${bgImages[2].src} alt=${bgImages[2].alt} class = "bg-img">`; // Afternoon
            }
            else if (hour >= 17 && hour < 21) {
                bgImg.innerHTML = `<img src=${bgImages[3].src} alt=${bgImages[3].alt} class = "bg-img">`; // Evening
            }
            else if((hour>=21 && hour<24) || (hour<4)) {
                bgImg.innerHTML = `<img src=${bgImages[4].src} alt=${bgImages[4].alt} class = "bg-img">`; // Night
            }
            else{
                bgImg.innerHTML = `<img src=${bgImages[5].src} alt=${bgImages[5].alt} class = "bg-img">`; // MidNight
            }
        }

    }
    catch (error) {
        console.error("An error occurred:", error.message);
    }
}

weather("Mumbai");

async function getWeather(city) {
    const apiKey = 'e1a380ed9ba63b882eb4177d7d17ff46';
    const url = `https://api.openweathermap.org/data/2.5/forecast?q=${city}&cnt=80&units=metric&appid=${apiKey}`;

    try {
        const res = await fetch(url);
        const weatherData = await res.json();
        console.log(weatherData)
        
        let forecast = weatherData.list.map((item) => (
            `<div><h3>Date : ${item.dt_txt}</h3>
            <h4>Temperature : ${item.main.temp}</h4>
            <h4>Description : ${item.weather[0].description}</h4>
            <img src="https://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png" alt="Weather_Condition" class = "img2"></div>`

        )).join("");
        

        weatherResult.innerHTML = `${forecast}`;

    } catch (error) {
        console.error("An error occurred:", error.message);
    }

}

getWeather("Mumbai");


function showWeather() {
    //This is for Phone
    searchBtn.addEventListener("click", () => {
        const city = searchBar.value;
        weather(city);
        getWeather(city);
    })

    //This is for PC
    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") { // Check if the "Enter" key was pressed
            const city = searchBar.value;
            weather(city); // Call the weather function with the city input
            getWeather(city);
        }
    });
}

showWeather();