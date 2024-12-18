const searchBar = document.getElementById("searchBar");
const searchBtn = document.getElementById("searchBtn");
const main = document.getElementById("main");
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
const fiveDay = document.getElementById("fiveDay");

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
            return; // Exit the function if the location is not found
        }

        const data = await response.json();

        locationCity.innerHTML = data.name;
        area.innerHTML = data.sys.country;

        //Showing images according to the weather
        conditionWeather.innerHTML = data.weather[0].main;

        if (conditionWeather.innerText == "Smoke") {
            weatherImage.innerHTML = `<img src="smoke.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Rain") {
            weatherImage.innerHTML = `<img src="rain.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Mist") {
            weatherImage.innerHTML = `<img src="mist.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Haze") {
            weatherImage.innerHTML = `<img src="mist.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Clouds") {
            weatherImage.innerHTML = `<img src="cloud.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Snow") {
            weatherImage.innerHTML = `<img src="snow.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Thunderstorm") {
            weatherImage.innerHTML = `<img src="Thunderstorm.png" alt="weatherImage" class = "img1">`;
        }

        else if (conditionWeather.innerText == "Drizzle") {
            weatherImage.innerHTML = `<img src="Drizzle.png" alt="weatherImage" class = "img1">`;
        }

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

        // Ensure data.timezone is in seconds
        if (typeof data.timezone === "number") {
            // Current UTC time in milliseconds
            const utcTime = new Date(Date.now());

            // Calculate local time based on data.timezone (in seconds)
            const localTime = new Date(utcTime.getTime() + data.timezone * 1000);

            // Extract the hour
            const hour = localTime.getUTCHours(); // Use UTC hours only

            // Update background based on the hour
            if (hour >= 0 && hour < 24) {
                if (hour < 4) {
                    main.style.backgroundImage = "url(istockphoto-162515751-612x612.png)";
                    if (conditionWeather.innerText == "Clear") {
                        weatherImage.innerHTML = `<img src="clear.png" alt="weatherImage" class = "img1">`;
                    }
                } else if (hour < 12) {
                    main.style.backgroundImage = "url(istockphoto-516180836-612x612.jpg)";
                    if (conditionWeather.innerText == "Clear") {
                        weatherImage.innerHTML = `<img src="sunny.png" alt="weatherImage" class = "img1">`;
                    }
                } else if (hour < 16) {
                    main.style.backgroundImage = "url(istockphoto-917178010-612x612.jpg)";
                    if (conditionWeather.innerText == "Clear") {
                        weatherImage.innerHTML = `<img src="sunny.png" alt="weatherImage" class = "img1">`;
                    }
                } else if (hour < 21) {
                    main.style.backgroundImage = "url(evening-7432219_1280.jpg)";
                    if (conditionWeather.innerText == "Clear") {
                        weatherImage.innerHTML = `<img src="clear.png" alt="weatherImage" class = "img1">`;
                    }
                } else {
                    main.style.backgroundImage = "url(istockphoto-162515751-612x612.png)";
                    if (conditionWeather.innerText == "Clear") {
                        weatherImage.innerHTML = `<img src="clear.png" alt="weatherImage" class = "img1">`;
                    }
                }
            }
        }




    } catch (error) {
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
    
        // Extract city name
        const cityName = weatherData.city.name;
        // Filter forecast data to get one entry per day (closest to 12:00 PM)
        const dailyForecast = weatherData.list.filter((item) =>
            item.dt_txt.includes("06:00:00")
        );
    
        // Map filtered data to display only 5 days
        const forecast = dailyForecast.slice(0, 5).map(
            (item) => `
            <div>
                <p><strong>Date:</strong> ${new Date(item.dt * 1000).toDateString()}</p>
                <p><strong>Temperature:</strong> ${Math.round(item.main.temp)}°C</p>
                <p><strong>Weather:</strong> ${item.weather[0].main}</p>
            </div>
        `
        ).join('');
        
        weatherResult.innerHTML = `${forecast}`
        // Display results
        fiveDay.innerHTML = `<h2 class = 'block'>Weather in ${cityName}</h2>`;

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