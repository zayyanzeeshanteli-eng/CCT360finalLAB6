let apiURL = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m,wind_speed_10m,cloud_cover&timezone=America%2FToronto";

let refreshButton = document.getElementById("refresh-button");
let temperatureText = document.getElementById("temperature");
let windText = document.getElementById("wind");
let cloudsText = document.getElementById("clouds");
let statusText = document.getElementById("status");
let temperatureBar = document.getElementById("temperature-bar");
let leaf = document.getElementById("leaf");
let weatherTitle = document.getElementById("weather-title");
let weatherMessage = document.getElementById("weather-message");

async function getWeather() {

    statusText.innerHTML = "Loading live weather data...";

    try {

        let response = await fetch(apiURL);

        if (!response.ok) {
            throw new Error("Request failed");
        }

        let data = await response.json();

        let temperature = data.current.temperature_2m;
        let wind = data.current.wind_speed_10m;
        let clouds = data.current.cloud_cover;

        temperatureText.innerHTML = temperature + " °C";
        windText.innerHTML = wind + " km/h";
        cloudsText.innerHTML = clouds + " %";

        statusText.innerHTML = "Live data loaded successfully.";

        let barHeight = temperature * 6;

        if (barHeight < 20) {
            barHeight = 20;
        }

        if (barHeight > 220) {
            barHeight = 220;
        }

        temperatureBar.style.height = barHeight + "px";

        let windMove = wind * 8;

        if (windMove > 420) {
            windMove = 420;
        }

        leaf.style.transform =
            "translateX(" + windMove + "px) rotate(" + windMove + "deg)";

        if (temperature < 10) {

            document.body.className = "cold";
            weatherTitle.innerHTML = "Cold Weather";
            weatherMessage.innerHTML =
                "It is cold outside. A warm layer would be a good idea.";

        } else if (temperature < 20) {

            document.body.className = "mild";
            weatherTitle.innerHTML = "Mild Weather";
            weatherMessage.innerHTML =
                "The temperature is mild. It looks comfortable for being outside.";

        } else {

            document.body.className = "warm";
            weatherTitle.innerHTML = "Warm Weather";
            weatherMessage.innerHTML =
                "It is warm outside. Lighter clothing may be more comfortable.";
        }

        if (clouds > 70) {
            weatherMessage.innerHTML += " The sky is also very cloudy right now.";
        } else if (clouds < 30) {
            weatherMessage.innerHTML += " The sky is fairly clear right now.";
        }

    } catch(error) {

        console.error("Error:", error);

        statusText.innerHTML =
            "The weather data could not be loaded. Please try again.";
    }
}

refreshButton.addEventListener("click", getWeather);

getWeather();
