// global variables
import * as DOM from './modules/app';
const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
// empty array to enter data
const cities = [];
const searchInput = document.querySelector('.search');
const suggestions = document.querySelector('.suggestions');
console.log(searchInput);
let nav = false;

var mq = window.matchMedia( "(min-width: 500px)" );
// function that findes machine position if user gives access

function geoLocation(location){

  console.log('geoLocation function run!');

    navigator.geolocation.getCurrentPosition(function(position, location){
    // variable that sets value for latitude to lat and longitude to lon
    let lat = position.coords.latitude;
    let lon = position.coords.longitude;
    // api call based on lat/lon and global apikey variable to get data from api
    let theUrl = location || `http://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lon}&APPID=${DOM.APIKEY}`;


  // API CALL- passes api call url + callback function
    function httpGetAsync(urlRequest,callbackFunc){
      // make a new httpRequest
      var xmlHttp = new XMLHttpRequest();
      // if request is successful the run parseData function
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          console.log([xmlHttp.status,
            xmlHttp.readyState,
            "fetch status"]
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
        // DOM.BUTTON2.innerHTML  ="click for C"
        DOM.DESC.innerHTML     =`${apiData.weather[0].description}`;
        // DOM.IMG.src = `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`
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
          "mist":"mist",
          "moderate rain":'light-rain',
          "heavy intensity rain":'light-rain',
          'light intensity drizzle':'light-rain'
        }

        for (var key in descriptions){
          if(key == `${apiData.weather[0].description.toLowerCase()}`){
            //   DOM.HTML.style.backgroundImage = `url('/assets/images/${descriptions[key]}.jpg')`
            //   DOM.HTML.style.backgroundRepeat = "no-repeat";
            // console.log(DOM.HTML);
            let source = document.createElement("source");
            source.setAttribute('src', `/assets/video/${descriptions[key]}.mp4`);
            DOM.VID.appendChild(source);
            DOM.VID.loop = true;
            DOM.VID.play();

            let iconHTML = document.querySelector(`.${descriptions[key]}`);

            iconHTML.classList.remove("visible");
            iconHTML.classList.add('visible')

            // console.log(iconHTML);
          }
        }

        if (mq.matches) {
          // window width is at least 500px
        } else {
          // window width is less than 500px
        }
        // Toggle between F and C
        function changeTemp(){
          // resets value of bool
          bool = !bool

          if (bool) {
            // DOM.BUTTON2.innerHTML  ="click for C"
            DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp * 9/5 - 459.67)} F°`;
          }
          else {
            // DOM.BUTTON2.innerHTML  ="click for F"
            DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp  - 273.15)} C°`;

          }

        }

        DOM.TEMP.addEventListener('click', changeTemp);
      }
      // passes in apiData and visualizes it to page
      visualize(apiData)
    }
  // API CALL- passes api call url + callback function
    httpGetAsync(theUrl,parseData);


  })
}

// TEXT ENTRY START
function geoTextEntry(location){

  console.log('geoTextEntry!!!');
  let theUrl = location;

// API CALL- passes api call url + callback function
    function httpGetAsync(urlRequest,callbackFunc){
      // make a new httpRequest
      var xmlHttp = new XMLHttpRequest();
      // if request is successful the run parseData function
      xmlHttp.onreadystatechange = function() {
        if (xmlHttp.readyState == 4 && xmlHttp.status == 200){
          console.log([xmlHttp.status,
            xmlHttp.readyState,
            "fetch status"]
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
        // DOM.BUTTON2.innerHTML  ="click for C"
        DOM.DESC.innerHTML     =`${apiData.weather[0].description}`;
        // DOM.IMG.src = `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`
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
          "mist":"mist",
          "moderate rain":'light-rain',
          "heavy intensity rain":'light-rain',
          'light intensity drizzle':'light-rain'
        }

        for (var key in descriptions){
          if(key == `${apiData.weather[0].description.toLowerCase()}`){
            //   DOM.HTML.style.backgroundImage = `url('/assets/images/${descriptions[key]}.jpg')`
            //   DOM.HTML.style.backgroundRepeat = "no-repeat";
            // console.log(DOM.HTML);
            let source = document.createElement("source");
            source.setAttribute('src', `/assets/video/${descriptions[key]}.mp4`);
            DOM.VID.appendChild(source);
            DOM.VID.loop = true;
            DOM.VID.play();

            let iconHTML = document.querySelector(`.${descriptions[key]}`);

            iconHTML.classList.remove("visible");
            iconHTML.classList.add('visible')

            // console.log(iconHTML);
          }
        }

        if (mq.matches) {
          // window width is at least 500px
        } else {
          // window width is less than 500px
        }
        // Toggle between F and C
        function changeTemp(){
          // resets value of bool
          bool = !bool

          if (bool) {
            // DOM.BUTTON2.innerHTML  ="click for C"
            DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp * 9/5 - 459.67)} F°`;
          }
          else {
            // DOM.BUTTON2.innerHTML  ="click for F"
            DOM.TEMP.innerHTML      = `${Math.round(apiData.main.temp  - 273.15)} C°`;

          }

        }

        DOM.TEMP.addEventListener('click', changeTemp);
      }
      // passes in apiData and visualizes it to page
      visualize(apiData);
    }
  // API CALL- passes api call url + callback function
    httpGetAsync(theUrl,parseData);
}
// TEXT ENTRY END



function navControl(){


  let menu = document.querySelector('.to_nav');
  let navigation = document.querySelector('.navigator');
  let navLinks = document.querySelector('ul> li');
  let itemsChange = document.getElementsByClassName('hidden');

    function showContent() {
      for(var i=0; i<itemsChange.length; i++) {
        itemsChange[i].style.display =    'inherit';
      }
    }

    function hideContent() {

      for(var i=0; i<itemsChange.length; i++) {
        itemsChange[i].style.display =    'none';
      }
    }


  menu.addEventListener('click',function(){
    nav = !nav;
    if(nav){
      hideContent();
      navigation.classList.add('visible');
      navigation.classList.add('visible-z-index-high');

    }
    else{
      showContent();
      navigation.classList.remove('visible')
      navigation.classList.remove('visible-z-index-high')
    }



  });

}
// function that findes m0achine position if user gives access and
// initialize weather application

geoLocation();


navControl();

document.querySelector('.icon-bg').addEventListener("click", geoLocation);




// Gets data and spreads it into array cities

// returns promise
fetch(endpoint)
// turn endpoint into json format
.then(info => info.json())
// use spread to place ind value of data into array
.then(data => cities.push(...data));


// function takes in two parameters
function findMatches(wordToMatch, x){
  // cities array it iterated over and we retun any element that passes
  // that regex wordToMatch test
  return cities.filter(function(place){
    //new RegExp(patter,-flag) use RegExp if to be
    // used not in a loop and user dynamically enters expression to be matched

    const regex = new RegExp(wordToMatch,'gi')
    // filter returns any place object that matches regex place.cities value
    return place.city.match(regex) || place.state.match(regex)
  });

}

// function called displayMatches is created
function displayMatches(){
  // result equals a findMatches call and we put
  // in the value attached to displayMatches
  //  you will see addEventListener can allow
  // this.value to equal value of form elemnt
  const result = findMatches(this.value, cities);
  // returns a HTML template with data inside
  const html = result.map(place =>{
    return `
        <li> <a id='list' href="#">
          ${place.city}, ${place.state}
          ${place.population}
          </a>
        </li>
    `
  }).join('')
  // sets up a ul most likely that containts the list items
  suggestions.innerHTML = html.toString();
}


function cityName(){

    // submit button
    document.querySelector('#submit').addEventListener('click', function(){
    let inputValue = searchInput.value;
    let apicall = `api.openweathermap.org/data/2.5/weather?q=${inputValue},us&APPID=${DOM.APIKEY}`;

    console.log(apicall);
    geoTextEntry(apicall);


      // geoLocation(apicall);
  });

  suggestions.addEventListener('click', function(e){
      // console.log(e.target.id);
      if(e.target.id='list') {
        let inputValue = e.target.innerText.split(',')[0]
        let apicall = `api.openweathermap.org/data/2.5/weather?q=${inputValue},us&APPID=${DOM.APIKEY}`;
        console.log(apicall);
      geoTextEntry(apicall);
          // geoLocation(apicall)
        }

      else {
        console.log("error");
      }

    })


}

// adds event listenter to input field
// function calls section.
cityName();
searchInput.addEventListener('change', displayMatches);
searchInput.addEventListener('keyup', displayMatches);


let textEntryLink = document.querySelector('#text-ent');
let devLocalLink  = document.querySelector('#dev-location');
let voiceComm     = document.querySelector('#voice-comm');
let contact       = document.querySelector('#contact');
let top           = document.querySelector('#top');

textEntryLink.addEventListener('click', displayTextEntry);
devLocalLink.addEventListener('click', geoLocation);
// voiceComm.addEventListener('click', );
// contact.addEventListener('click', );
// top.addEventListener('click', );



function displayTextEntry(e){
  nav = false;
  var itemsChange    = document.getElementsByClassName('hidden');
  let navigation     = document.querySelector('.navigator');
  let textEntryView  = document.querySelector('.text-entry');

      console.log('preventDefault');

    textEntryView.classList.add('text-entry--in-view');
    textEntryView.style.display = 'inherit';
    navigation.classList.remove('visible');
    navigation.classList.remove('visible-z-index-high');

    e.preventDefault();
}
