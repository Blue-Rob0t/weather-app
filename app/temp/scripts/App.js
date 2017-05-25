/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var DOM = _interopRequireWildcard(_app);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	function _toConsumableArray(arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) { arr2[i] = arr[i]; } return arr2; } else { return Array.from(arr); } } // global variables


	var endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';
	// empty array to enter data
	var cities = [];
	var searchInput = document.querySelector('.search');
	var suggestions = document.querySelector('.suggestions');
	console.log(searchInput);
	var nav = false;

	var mq = window.matchMedia("(min-width: 500px)");
	// function that findes machine position if user gives access

	function geoLocation(location) {

	  console.log('geoLocation function run!');

	  navigator.geolocation.getCurrentPosition(function (position, location) {
	    // variable that sets value for latitude to lat and longitude to lon
	    var lat = position.coords.latitude;
	    var lon = position.coords.longitude;
	    // api call based on lat/lon and global apikey variable to get data from api
	    var theUrl = 'http://api.openweathermap.org/data/2.5/weather?lat=' + lat + '&lon=' + lon + '&APPID=' + DOM.APIKEY;

	    // API CALL- passes api call url + callback function
	    function httpGetAsync(urlRequest, callbackFunc) {
	      // make a new httpRequest
	      var xmlHttp = new XMLHttpRequest();
	      // if request is successful the run parseData function
	      xmlHttp.onreadystatechange = function () {
	        if (xmlHttp.readyState == 4 && xmlHttp.status == 200) {
	          console.log([xmlHttp.status, xmlHttp.readyState, "fetch status"]);
	          parseData(xmlHttp.responseText);
	        }
	      };
	      xmlHttp.open("GET", urlRequest, true); // true for asynchronous
	      xmlHttp.send(null);
	    }

	    function parseData(apiData) {
	      // apiData parsed from string to JSON data
	      var apiData = JSON.parse(apiData);

	      function visualize(apiData) {
	        // bool value initialize for changeTemp function
	        var bool = true;

	        console.log(apiData);
	        DOM.LOCATION.innerHTML = '' + apiData.name;
	        DOM.TEMP.innerHTML = Math.round(apiData.main.temp * 9 / 5 - 459.67) + ' F\xB0';
	        // DOM.BUTTON2.innerHTML  ="click for C"
	        DOM.DESC.innerHTML = '' + apiData.weather[0].description;
	        // DOM.IMG.src = `http://openweathermap.org/img/w/${apiData.weather[0].icon}.png`
	        // Background Image
	        var descriptions = {
	          "clear sky": "sunny-day",
	          "few clouds": "scattered-clouds",
	          "overcast clouds": "over-cast",
	          "scattered clouds": "scattered-clouds",
	          "broken clouds": "cloudy",
	          "rain": "light-rain",
	          "light rain": "light-rain",
	          "thunderstorm": "heavy-rain",
	          "snow": "snow",
	          "mist": "mist",
	          "moderate rain": 'light-rain',
	          "heavy intensity rain": 'light-rain',
	          'light intensity drizzle': 'light-rain'
	        };

	        for (var key in descriptions) {
	          if (key == '' + apiData.weather[0].description.toLowerCase()) {
	            //   DOM.HTML.style.backgroundImage = `url('/assets/images/${descriptions[key]}.jpg')`
	            //   DOM.HTML.style.backgroundRepeat = "no-repeat";
	            // console.log(DOM.HTML);
	            var source = document.createElement("source");
	            source.setAttribute('src', '/assets/video/' + descriptions[key] + '.mp4');
	            DOM.VID.appendChild(source);
	            DOM.VID.loop = true;
	            DOM.VID.play();

	            var iconHTML = document.querySelector('.' + descriptions[key]);

	            iconHTML.classList.remove("visible");
	            iconHTML.classList.add('visible');

	            // console.log(iconHTML);
	          }
	        }

	        if (mq.matches) {
	          // window width is at least 500px
	        } else {}
	          // window width is less than 500px

	          // Toggle between F and C
	        function changeTemp() {
	          // resets value of bool
	          bool = !bool;

	          if (bool) {
	            // DOM.BUTTON2.innerHTML  ="click for C"
	            DOM.TEMP.innerHTML = Math.round(apiData.main.temp * 9 / 5 - 459.67) + ' F\xB0';
	          } else {
	            // DOM.BUTTON2.innerHTML  ="click for F"
	            DOM.TEMP.innerHTML = Math.round(apiData.main.temp - 273.15) + ' C\xB0';
	          }
	        }

	        DOM.TEMP.addEventListener('click', changeTemp);
	      }
	      // passes in apiData and visualizes it to page
	      visualize(apiData);
	    }
	    // API CALL- passes api call url + callback function
	    httpGetAsync(theUrl, parseData);
	  });
	}

	function navControl() {

	  var itemsChange = document.getElementsByClassName('hidden');

	  function showContent() {
	    for (var i = 0; i < itemsChange.length; i++) {
	      itemsChange[i].style.display = 'inherit';
	    }
	  }

	  function hideContent() {

	    for (var i = 0; i < itemsChange.length; i++) {
	      itemsChange[i].style.display = 'none';
	    }
	  }

	  var menu = document.querySelector('.to_nav');
	  var navigation = document.querySelector('.navigator');
	  var navLinks = document.querySelector('ul> li');

	  menu.addEventListener('click', function () {
	    nav = !nav;
	    if (nav) {
	      hideContent();
	      navigation.classList.add('visible');
	      navigation.classList.add('visible-z-index-high');
	    } else {
	      showContent();
	      navigation.classList.remove('visible');
	      navigation.classList.remove('visible-z-index-high');
	    }
	  });
	}

	document.querySelector('.icon-bg').addEventListener("click", geoLocation);
	// function that findes m0achine position if user gives access and
	// initialize weather application
	geoLocation();
	navControl();

	// Gets data and spreads it into array cities

	// returns promise
	fetch(endpoint)
	// turn endpoint into json format
	.then(function (info) {
	  return info.json();
	})
	// use spread to place ind value of data into array
	.then(function (data) {
	  return cities.push.apply(cities, _toConsumableArray(data));
	});

	// function takes in two parameters
	function findMatches(wordToMatch, x) {
	  // cities array it iterated over and we retun any element that passes
	  // that regex wordToMatch test
	  return cities.filter(function (place) {
	    //new RegExp(patter,-flag) use RegExp if to be
	    // used not in a loop and user dynamically enters expression to be matched

	    var regex = new RegExp(wordToMatch, 'gi');
	    // filter returns any place object that matches regex place.cities value
	    return place.city.match(regex) || place.state.match(regex);
	  });
	}

	// function called displayMatches is created
	function displayMatches() {
	  // result equals a findMatches call and we put
	  // in the value attached to displayMatches
	  //  you will see addEventListener can allow
	  // this.value to equal value of form elemnt
	  var result = findMatches(this.value, cities);
	  // returns a HTML template with data inside
	  var html = result.map(function (place) {
	    return '\n        <li> <a id=\'list\' href="#">\n          ' + place.city + ', ' + place.state + '\n          ' + place.population + '\n          </a>\n        </li>\n    ';
	  }).join('');
	  // sets up a ul most likely that containts the list items
	  suggestions.innerHTML = html.toString();
	}
	function cityName() {

	  // submit button
	  document.querySelector('#submit').addEventListener('click', function () {
	    var inputValue = searchInput.value;
	    var apicall = 'api.openweathermap.org/data/2.5/weather?q=' + inputValue + ',us';
	    geoLocation(apicall);
	  });

	  suggestions.addEventListener('click', function (e) {

	    // console.log(e.target.id);
	    if (e.target.id = 'list') {
	      var inputValue = e.target.innerText.split(',')[0];
	      var apicall = 'api.openweathermap.org/data/2.5/weather?q=' + inputValue + ',us';
	      geoLocation(apicall);
	    } else {
	      console.log("error");
	    }
	  });
	}

	// adds event listenter to input field
	// function calls section.
	cityName();
	searchInput.addEventListener('change', displayMatches);
	searchInput.addEventListener('keyup', displayMatches);

	var textEntryLink = document.querySelector('#text-ent');
	var devLocalLink = document.querySelector('#dev-location');
	var voiceComm = document.querySelector('#voice-comm');
	var contact = document.querySelector('#contact');
	var top = document.querySelector('#top');

	textEntryLink.addEventListener('click', displayTextEntry);
	devLocalLink.addEventListener('click', geoLocation);
	// voiceComm.addEventListener('click', );
	// contact.addEventListener('click', );
	// top.addEventListener('click', );


	function displayTextEntry(e) {
	  nav = false;
	  var itemsChange = document.getElementsByClassName('hidden');
	  var navigation = document.querySelector('.navigator');
	  var textEntryView = document.querySelector('.text-entry');

	  console.log('preventDefault');

	  textEntryView.classList.add('text-entry--in-view');
	  textEntryView.style.display = 'inherit';
	  navigation.classList.remove('visible');
	  navigation.classList.remove('visible-z-index-high');

	  e.preventDefault();
	}

/***/ }),
/* 1 */
/***/ (function(module, exports) {

	'use strict';

	Object.defineProperty(exports, "__esModule", {
	  value: true
	});
	// apikey for openweathermap.com
	var APIKEY = exports.APIKEY = "c144deeef83c9fc568b52b95903fb474";
	// DOM elements
	var LOCATION = exports.LOCATION = document.querySelector('.location');
	var TEMP = exports.TEMP = document.querySelector('.temperature');
	var IMG = exports.IMG = document.querySelector('.icon');
	var DESC = exports.DESC = document.querySelector('.desc');
	var VID = exports.VID = document.querySelector('#bgvid');
	var BUTTON1 = exports.BUTTON1 = document.querySelector('.btn-1');
	var BUTTON2 = exports.BUTTON2 = document.querySelector('.btn-temp');

/***/ })
/******/ ]);