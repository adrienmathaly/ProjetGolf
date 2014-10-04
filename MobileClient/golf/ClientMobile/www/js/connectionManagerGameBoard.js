/* Create this function for the connectionManager
* Warning !! for unused function make something like "var doNothing = true;" to avoid bad behaviour
*   function onDeviceReady();
*   function onOnline();
*   function onOffline();
*   function onGeolocationSuccess()
*   function onGeolocationError();
*   function onResume();
*   function onPause();
*/

/* Bolean use to check connection (create in connectionManager.js)
*   connectedToDevice   
*   connectedToInternet 
*   connectedToGPS      
*   connectedToServer   
*/
//The id is delivery by the server when the first connection
var gameID = null;

//Use to know if the map center was initialized on the device position
var initializedCenter = false;

function onDeviceReady(){
	//Retrieve the id gaming
	gameID = location.search.split('id=')[1];
	initializeGame();
	checkLocalisation(true);
}
function onOnline(){
	var doNothing = true;
}
function onOffline(){
	var doNothing = true;
}
function onGeolocationSuccess(){
	if(! initializedCenter){
		changeMapCenterFromMarker(devicePositionMarker);
		pokeballPosition = devicePositionMarker.getPosition();
		changePokeballFromLatLng(pokeballPosition);
		initializedCenter = true;
	}
	localiseOnMap();
}
function onGeolocationError(){
	var doNothing = true;
}
function onResume(){
	var doNothing = true;
}
function onPause(){
	var doNothing = true;
}

//Initialize the google map carto and display the gamer position
function initializeGame(){
	initializeCarto();
	localiseOnMap();
	
	var mapElement = document.getElementById('movementZone');
	mapElement.style.display = 'inline';
	var bottomElement = document.getElementById('bottom_map');
	bottomElement.style.display = 'block';

	//Google maps event
	google.maps.event.addListener(map, 'drag', onBoundsChanged);
	google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged);
	google.maps.event.addListener(map, 'mousemove', onMouseMove);

	changePokeballFromMarker(devicePositionMarker);
}