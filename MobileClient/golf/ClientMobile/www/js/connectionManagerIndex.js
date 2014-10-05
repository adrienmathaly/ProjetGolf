
/* Create this function for the connectionManager
* Warning !! for unused function make something like "var doNothing = true;" to avoid bad behaviour
*   function onDeviceReady();
*   function onOnline();
*   function onOffline();
*   function onGeolocationSuccess()
*   function onGeolocationError();
*   function onResume();
*   function onPause();
*   function onOrientationChanged();
*/

/* Bolean use to check connection (create in connectionManager.js)
*   connectedToDevice   
*   connectedToInternet 
*   connectedToGPS      
*   connectedToServer   
*/

var connectedToServer   = false;

//This id is delivery by the server
var gameID = null;

//Display the correct information of the status connection
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
    receivedEvent('deviceready', true);
    checkLocalisation(true);
    requestStartingGame();
}

//On internet connection ready event handler
function onOnline(){
    var networkState = navigator.connection.type;

    //Connection statement
    var connectionStatement = {};
    connectionStatement[Connection.UNKNOWN]  = 'Unknown connection';
    connectionStatement[Connection.NONE]     = 'No network connection';
    connectionStatement[Connection.ETHERNET] = 'Ethernet connection';
    connectionStatement[Connection.WIFI]     = 'WiFi connection';
    connectionStatement[Connection.CELL_2G]  = 'Cell 2G connection';
    connectionStatement[Connection.CELL_3G]  = 'Cell 3G connection';
    connectionStatement[Connection.CELL_4G]  = 'Cell 4G connection';
    connectionStatement[Connection.CELL]     = 'Cell generic connection';

    //update DOM connectivity information
    var element = document.getElementById('connectionType');
    element.innerHTML = connectionStatement[networkState];
    
    receivedEvent('onOnline', true);

    //GET an id and give it to callback saveID, verify the connection with server
    getIDConnection(saveID);

    //Try to start the game if all connection is ready
    requestStartingGame();   
}

//On internet connection offline event handler
function onOffline(){
    receivedEvent('onOnline', false);

    connectedToServer = false;
    receivedEvent('onServerConnection', false);
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

//Read the JSON server response, save the id token sending and update DOM
function saveID(id){
    id = id['token'];

    var element = document.getElementById('userConnection');
    element.innerHTML = 'id: ' + id;
    
    gameID = id;
    
    connectedToServer = true;
    app.receivedEvent('onServerConnection', true);
    requestStartingGame();
}

//Check if the device is ready to start the game
function requestStartingGame(){
    if(connectedToDevice && connectedToInternet && connectedToGPS /*&& connectedToServer*/){
        location.replace('gameBoard.html?id=' + gameID);
    }
}
