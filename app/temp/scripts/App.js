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
/***/ function(module, exports, __webpack_require__) {

	'use strict';

	var _app = __webpack_require__(1);

	var DOM = _interopRequireWildcard(_app);

	function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

	console.log(DOM);
	var mq = window.matchMedia("(min-width: 500px)");
	// function that findes machine position if user gives access
	function geoLocation() {
	  console.log('geoLocation function run!');
	  console.log("working");
	  navigator.geolocation.getCurrentPosition(function (position) {
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
	          "mist": "mist"
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

	            console.log(iconHTML);
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

	          console.log(bool);
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

	document.querySelector('.icon-bg').addEventListener("click", geoLocation);
	// function that findes m0achine position if user gives access and
	// initialize weather application
	geoLocation();

/***/ },
/* 1 */
/***/ function(module, exports) {

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

/***/ }
/******/ ]);