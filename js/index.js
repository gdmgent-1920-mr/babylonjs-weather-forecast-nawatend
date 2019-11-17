window.addEventListener('DOMContentLoaded', () => {

    //get weather from get_weather.js
    //get scenes from scenes.js
    //render base of weather
    switch (localStorage.getItem("currentCityWeather")) {
        case "Rain":
            rainyScene()
            break;
        case "Drizzle":
            rainyScene()
            break;
        case "Clear":
            sunnyScene()
            break;
        case "Snow":
            snowyScene()
            break;
        case "Clouds":
            cloudyScene()
            break;
        case "Thunderstorm":
            rainyScene()
            break;
        default:
            break;
    }
})