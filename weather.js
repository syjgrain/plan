const weather = document.querySelector(".js-weather");

const API_KEY ="19ae707a162d52cea4bdd9b21250006d";
const CORDS = 'cords';

function getWeather(lat,lng){
    fetch(`https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`)
    .then(function(response){
    return response.json();
})
    .then(function(json){
        const temperature = json.main.temp;
        const place = json.name;
        weather.innerText = `${temperature} @ ${place}`;
    });
}
function saveCoords(coordObj){
    localStorage.setItem(CORDS, JSON.stringify(coordObj));
}

function handleGeoSucces(position){
    const latitude = position.coords.latitude;
    const longtitude = position.coords.longitude;
    const coordObj ={
        latitude : latitude,
        longtitide: longtitude
    };
    saveCoords(coordObj);
    getWeather(latitude,longtitude);
}
function handleGeoError(){
    console.log('Can not access geo location');
}

function askForCords(){
    navigator.geolocation.getCurrentPosition(handleGeoSucces,handleGeoError)
}

function loadCoords(){
    const loadedCoords = localStorage.getItem(CORDS);
    
    if(loadedCoords === null){
        askForCords();
    }else{
        const parsedCoords = JSON.parse(loadedCoords);
        getWeather(parsedCoords.latitude, parsedCoords.longtitide);
        
    }
}


function init(){
    loadCoords();
}

init();