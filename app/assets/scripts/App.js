import * as DOM from './modules/app'
console.log(DOM);

// function that findes machine position if user gives access
function geoLocation(){
console.log('geoLocation function run!');
  console.log("working");
  navigator.geolocation.getCurrentPosition(function(position){
    // variable that sets value for latitude to lat and longitude to lon
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // api call based on lat/lon and global apikey variable to get data from api
    let theUrl = `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${DOM.APIKEY}`


// API CALL- passes api call url + callback function
function httpGetAsync(urlRequest,callbackFunc){
  // make a new httpRequest
    var xmlHttp = new XMLHttpRequest();
    // if request is successful the run parseData function
    xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          console.log([xmlHttp.status,
                      xmlHttp.readyState]
                    );
            parseData(xmlHttp.responseText)
        }

    }
    xmlHttp.open("GET", urlRequest, true); // true for asynchronous
    xmlHttp.send(null);
}

function parseData(apiData){
  // apiData parsed from string to JSON data
  var apiData = JSON.parse(apiData);

    function visualize(apiData){
      // bool value initialize for changeTemp function
      let   bool = true;

      console.log(apiData);
        DOM.LOCATION.innerHTML = `${apiData.name}`;
        DOM.TEMP.innerHTML     = `${Math.round(apiData.main.temp * 9/5 - 459.67)} F°`;
        DOM.BUTTON2.innerHTML  ="click for C"
        DOM.DESC.innerHTML     =`${apiData.weather[0].description}`;
        DOM.IMG.src = `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`
        // Background Image
        let descriptions = {
        	"clear sky":"sunny-day",
        	"few clouds":"scattered-clouds",
          "overcast clouds":"over-cast",
        	"scattered clouds":"scattered-clouds",
        	"broken clouds":"cloudy",
        	"rain":"light-rain",
          "light rain":"light-rain",
        	"thunderstorm":"heavy-rain",
        	"snow":"snow",
        	"mist":"mist"
        }

        for (var key in descriptions){
          if(key == `snow`){
          //   DOM.HTML.style.backgroundImage = `url('/assets/images/${descriptions[key]}.jpg')`
          //   DOM.HTML.style.backgroundRepeat = "no-repeat";
          // console.log(DOM.HTML);
          let source = document.createElement("source");
          source.setAttribute('src', `/assets/video/${descriptions[key]}.mp4`);
          DOM.VID.appendChild(source);
          DOM.VID.loop = true;
          DOM.VID.play();
          }
        }
// Toggle between F and C
  function changeTemp(){
    // resets value of bool
      bool = !bool

    if (bool) {
      DOM.BUTTON2.innerHTML  ="click for C"
      DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp * 9/5 - 459.67)} F°`;
      }
      else {
        DOM.BUTTON2.innerHTML  ="click for F"
        DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp  - 273.15)} C°`;

      }

      console.log(bool);
      }

      DOM.BUTTON2.addEventListener('click', changeTemp);
    }
    // passes in apiData and visualizes it to page
    visualize(apiData)
}
// API CALL- passes api call url + callback function
httpGetAsync(theUrl,parseData);


  })
}

DOM.BUTTON1.addEventListener("click", geoLocation);
// function that findes m0achine position if user gives access
geoLocation();
