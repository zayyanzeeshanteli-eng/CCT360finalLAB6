let weatherButton = document.getElementById("weather-button");
let temperatureText = document.getElementById("temperature");
let messageText = document.getElementById("message");
let weatherBox = document.getElementById("weather-box");

function getWeather() {

    let url = "https://api.open-meteo.com/v1/forecast?latitude=43.59&longitude=-79.64&current=temperature_2m&timezone=America%2FToronto";

    fetch(url)
        .then(function(response) {
            return response.json();
        })
        .then(function(data) {

            let temperature = data.current.temperature_2m;

            temperatureText.innerHTML = "Temperature: " + temperature + " °C";

            if (temperature < 10) {
                messageText.innerHTML = "It is cold outside today.";
                weatherBox.style.backgroundColor = "#dceef8";

            } else if (temperature < 20) {
                messageText.innerHTML = "The weather is mild today.";
                weatherBox.style.backgroundColor = "#e8f3df";

            } else {
                messageText.innerHTML = "It is warm outside today.";
                weatherBox.style.backgroundColor = "#fff1d6";
            }
        });
}

weatherButton.addEventListener("click", getWeather);
