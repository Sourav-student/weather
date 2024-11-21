const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const main = document.getElementById("main");
const locationCity = document.getElementById("location");
const area = document.getElementById("area");
const weatherImage = document.getElementById("weatherImage");
const temp = document.getElementById("temp");
const bgUnique = document.querySelector('.bg-unique');
const humidity = document.getElementById("humidity");
const maxTemp = document.getElementById("maxTemp");
const minTemp = document.getElementById("minTemp");
const degree = document.getElementById("degree");
const speed = document.getElementById("speed");
const conditionWeather = document.getElementById("conditionWeather");
const pressure = document.getElementById("pressure");
const feels_like = document.getElementById("feels_like");

async function weather(city) {
    try {
        const apiKey = "23a53467954c92a6eb387719b8a599e6";
        const url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`;

        const response = await fetch(url);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        const data = await response.json();


        area.innerHTML = data.sys.country;

        const iconCode = data.weather[0].icon;
        const iconUrl = `https://openweathermap.org/img/wn/${iconCode}.png`;
        weatherImage.innerHTML = `<img src= ${iconUrl} alt="weatherImage" class = "img1">`;
        conditionWeather.innerHTML = data.weather[0].main;

        //Main 
        temp.innerHTML = Math.round(data.main.temp - 273.15);
        humidity.innerHTML = data.main.humidity;
        maxTemp.innerHTML = Math.round(data.main.temp_max - 273.15);
        minTemp.innerHTML = Math.round(data.main.temp_min - 273.15);
        pressure.innerHTML = data.main.pressure;
        feels_like.innerHTML = Math.round(data.main.feels_like - 273.15);

        //Wind
        degree.innerHTML = data.wind.deg;
        speed.innerHTML = Math.ceil(data.wind.speed * (18 / 5));


        // Images as per the time

        const localTime = new Date(Date.now() + data.timezone * 1000);
        const hour = localTime.getHours();


        if (hour < 4) {
            main.style.backgroundImage = "url(istockphoto-162515751-612x612.jpg)";
            weatherImage.style.filter = "invert(1)";
        }

        else if (hour < 12) {
            main.style.backgroundImage = "url(istockphoto-516180836-612x612.jpg)";
        }

        else if (hour < 16) {
            main.style.backgroundImage = "url(istockphoto-917178010-612x612.jpg)";
        }

        else if (hour < 21) {
            main.style.backgroundImage = "url(evening-7432219_1280.jpg)";
            weatherImage.style.filter = "invert(0.5)"
        }

    } catch (error) {
        console.error("An error occurred:", error.message);
    }
}

weather("Mumbai");


function showWeather() {
    //This is for Phone
    searchBtn.addEventListener("click", () => {
        const city = searchBar.value;
        weather(city);
        locationCity.innerHTML = city;
    })

    //This is for PC
    searchBar.addEventListener("keypress", (event) => {
        if (event.key === "Enter") { // Check if the "Enter" key was pressed
            const city = searchBar.value;
            weather(city); // Call the weather function with the city input
            locationCity.innerHTML = city;
        }
    });

}

showWeather();



//Changing color of temperature according to temperature
if (temp.innerHTML < 10) {
    bgUnique.style.backgroundColor = "#e0c5c5"
}

else if (temp.innerHTML < 20) {
    bgUnique.style.backgroundColor = "#dd8888"
}

else if (temp.innerHTML < 30) {
    bgUnique.style.backgroundColor = "#d65e5e"
}

else if (temp.innerHTML < 40) {
    bgUnique.style.backgroundColor = "#d33333"
}

else {
    bgUnique.style.backgroundColor = "#ef1212"
}