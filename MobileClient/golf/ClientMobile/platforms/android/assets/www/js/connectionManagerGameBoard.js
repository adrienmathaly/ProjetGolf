/* Create this function for the connectionManager
* Warning !! for unused function make something like "var doNothing = true;" to avoid bad behaviour
*   function onDeviceReady();
*   function onOnline();
*   function onOffline();
*   function onGeolocationSuccess()
*   function onGeolocationError();
*   function onResume();
*   function onPause();
*	function onOrientationChanged();
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
	var bottomElement = document.getElementById('pokeball');
	bottomElement.style.display = 'inline';
}
function onOffline(){
	var pokeball = document.getElementById('pokeball');
	pokeball.style.display = 'none';
}
function onGeolocationSuccess(){
	localiseOnMap();
}
function onGeolocationError(){
	if(errorDevicePositionMarker === null){
		errorDevicePositionMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(devicePositionMarker.getPosition().lat(), devicePositionMarker.getPosition().lng()),
	        map: map,
	        title: 'Je te vois plus :(',
	    });
		errorDevicePositionMarker.setIcon('http://maps.google.com/mapfiles/ms/micons/grey.png');
	}

	devicePositionMarker.setMap(null);
	devicePositionMarker = null;

}
function onResume(){
	var doNothing = true;
}
function onPause(){
	var doNothing = true;
}

function onOrientationChanged(){
	updateSizeCarto();
}

//Initialize the google map carto and display the gamer position
function initializeGame(){
	initializeListener();
	initializeCarto();
	localiseOnMap();
	
	//Google maps event
	google.maps.event.addListener(map, 'drag', onBoundsChanged);
	google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged);
	google.maps.event.addListener(map, 'mousemove', onMouseMove);

	//Display upper and bottom information
	var bottomElement = document.getElementById('bottom_map');
	bottomElement.style.display = 'block';
	var upperElement = document.getElementById('upper_map');
	upperElement.style.display = 'block';

	updateSizeCarto();
	changePokeballFromMarker(devicePositionMarker);
}