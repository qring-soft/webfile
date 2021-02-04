const weather = document.querySelector(".js-weather")

const API_KEY = "8853ef2205dba9a8b05f02c837a4eb2d";
const COORDS = 'coords';

function getWeather(lat, lon) {
    fetch(
        `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${API_KEY}&units=metric`
        ).then(function(response) {
            return response.json();
        })
        .then(function(json) {
            const temperature = json.main.temp;
            const place = json.name;
            weather.innerText = `${temperature}°C / ${place}`;
        });
}
function saveCoords(coordsObj) {
 localStorage.setItem(COORDS, JSON.stringify(coordsObj));
}

function handleGeoSucces(position) {
    const latitued = position.coords.latitude;
    const longitude = position.coords.longitude;
    const coordsObj = {
        latitued,
        longitude
    };
    saveCoords(coordsObj);
    getWeather(latitued, longitude);
}

function handleGeoError() {
    console.log("cant access geo location");
}

function askForCoords() {
    navigator.geolocation.getCurrentPosition(handleGeoSucces, handleGeoError);
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(COORDS);
    if (loadedCoords === null) {
        askForCoords();
    } else {
        const parseCoords = JSON.parse(loadedCoords);
        console.log(parseCoords);
        getWeather(parseCoords.latitued, parseCoords.longitude);
    }
}

function init() {
    loadCoords();
}

init();