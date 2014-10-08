/*
* You have to create following function use in connection.js
* Minium do something like var doNothing = true; to avoid bad behaviour
*
* onDeviceReady();
* onOnline();
* onOffline();
* onGeolocationSuccess();
* onGeolocationError();
* onResume();
* onPause();
* onOrientationChanged();
*/

/* Bolean use to check connection (create in connectionManager.js)
*   connectedToDevice   
*   connectedToInternet 
*   connectedToGPS      
*/

//The id is delivery by the server when the first connection
var gameID = null;

//Use to know if the map center was initialized on the device position
var initializedCenter = false;

//On cordova ready event handler
function onDeviceReady(){
	//Retrieve the id gaming
	gameID = location.search.split('id=')[1];

	initializeGame();	
}

//Initialize listener and google map
function initializeGame(){
	initializeCarto();

	//need to have google maps initialized 
	initializeListener();
	localiseOnMap();

	// display upper and bottom information
	var bottomElement = document.getElementById('bottom_map');
	bottomElement.style.display = 'block';
	var upperElement = document.getElementById('upper_map');
	upperElement.style.display = 'block';

	updateSizeCarto();

	changePokeballFromMarker(devicePositionMarker);
}

//On internet connection ready event handler
function onOnline(){
	var bottomElement = document.getElementById('pokeball');
	bottomElement.style.display = 'inline';
}

//On internet connection offline event handler
function onOffline(){
	var pokeball = document.getElementById('pokeball');
	pokeball.style.display = 'none';
}

//On geolocalisation success event handler
function onGeolocationSuccess(){
	localiseOnMap();
}

//On geolocalisation error event handler
function onGeolocationError(){
	// display a grey marker
	if(errorDevicePositionMarker === null){
		errorDevicePositionMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(devicePositionMarker.getPosition().lat(), devicePositionMarker.getPosition().lng()),
	        map: map,
	        title: 'Je te vois plus :(',
	    });
		errorDevicePositionMarker.setIcon('img/google_marker/greyMarker.png');
	}

	// erase devise position marker
	devicePositionMarker.setMap(null);
	devicePositionMarker = null;

}

//On resume application event handler
function onResume(){
	var doNothing = true;
}

//On pause application event handler
function onPause(){
	var doNothing = true;
}

//On orientation change event handler
function onOrientationChanged(){
	updateSizeCarto();
}

