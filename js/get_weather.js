let geolocationText = document.getElementById("geolocation");

let apiKey = "d7db6aaf47bde563bb74cdc143a5ea02"

let e = "e9b433f7ed306860db69ea25723a5f48"
let weatherName = "";
let getLocationWeather = () => {
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(showPositionWeather);

    } else {
        let geolocation = document.getElementById("geolocation");
        geolocation.innerHTML = "Geolocation is not supported by this browser.";
    }
}

let showPositionWeather = async (position) => {
    await fetch("http://api.openweathermap.org/data/2.5/weather?lat=" + position.coords.latitude + "&lon=" + position.coords.longitude + "&APPID=" + apiKey)
        .then(response => response.json())
        .then(json => {
            weatherName = json.weather[0].main
            localStorage.setItem("currentCityWeather", weatherName)
            console.log(json.weather[0].main)
        });
}


getLocationWeather();