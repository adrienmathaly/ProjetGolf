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

// Bolean use to check if user is succefull identify
var identification   = false;

//This id is delivery by the server
var gameID = 0;

//Display the correct information of id element according to the received status
function receivedEvent(id, received) {
    var parentElement = document.getElementById(id);
    var listeningElement = parentElement.querySelector('.listening');
    var receivedElement = parentElement.querySelector('.received');

    if(received){    
        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;'); 
    }
    else{
        listeningElement.setAttribute('style', 'display:block;');
        receivedElement.setAttribute('style', 'display:none;'); 
    }
}

//On cordova ready event handler
function onDeviceReady(){
    initializeId();

    receivedEvent('deviceready', true);
    requestStartingGame();
}

//On internet connection ready event handler
function onOnline(){
    var networkState = navigator.connection.type;

    //Connection statement
    var connectionStatement = {};
    //Two first not really usefull but if appear something went wrong
    connectionStatement[Connection.UNKNOWN]  = 'Unknown connection';
    connectionStatement[Connection.NONE]     = 'No network connection';
    connectionStatement[Connection.ETHERNET] = 'Ethernet connection';
    connectionStatement[Connection.WIFI]     = 'WiFi connection';
    connectionStatement[Connection.CELL_2G]  = 'Cell 2G connection';
    connectionStatement[Connection.CELL_3G]  = 'Cell 3G connection';
    connectionStatement[Connection.CELL_4G]  = 'Cell 4G connection';
    connectionStatement[Connection.CELL]     = 'Cell generic connection';

    //update DOM with connectivity information
    var element = document.getElementById('connectionType');
    element.innerHTML = connectionStatement[networkState];
    
    connectedToInternet = true;
    receivedEvent('onOnline', true);
    requestStartingGame();   
}

//On internet connection offline event handler
function onOffline(){
    receivedEvent('onOnline', false);
}

//On geolocalisation success event handler
function onGeolocationSuccess(){
    receivedEvent('onGPSConnection', true);
    requestStartingGame();
}

//On geolocalisation error event handler
function onGeolocationError(){
    receivedEvent('onGPSConnection', false);
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
    var doNothing = true;
}

//Check if the device is ready to start the game
function requestStartingGame(){
    if(connectedToDevice && connectedToInternet && connectedToGPS && identification){
        location.replace('gameBoard.html?id=' + gameID);
    }
}