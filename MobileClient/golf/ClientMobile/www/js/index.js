/*
 * Licensed to the Apache Software Foundation (ASF) under one
 * or more contributor license agreements.  See the NOTICE file
 * distributed with this work for additional information
 * regarding copyright ownership.  The ASF licenses this file
 * to you under the Apache License, Version 2.0 (the
 * "License"); you may not use this file except in compliance
 * with the License.  You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing,
 * software distributed under the License is distributed on an
 * "AS IS" BASIS, WITHOUT WARRANTIES OR CONDITIONS OF ANY
 * KIND, either express or implied.  See the License for the
 * specific language governing permissions and limitations
 * under the License.
 */

//Timer used to make a loop of geolocalisation
var timer = null;

//Bolean use to check if the game can begin
var connectedToDevice   = false;
var connectedToInternet = false;
var connectedToGPS      = false;
var connectedToServer   = false;

//Remember in this scope use 'this' to function access, otherwise use 'app'
var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        //Event when Cordova is full loading
        document.addEventListener('deviceready', this.onDeviceReady, false);
        //Event when a internet connection is found
        document.addEventListener('online', this.onOnline, false);
        //Event when the internet connection is lost
        document.addEventListener('offline', this.onOffline, false);
        //Event when the application is resumed/come of the background
        document.addEventListener('resume', this.onGeolocalisationNeeded, false);
        //Event when the application is paused/put in the background
        document.addEventListener('pause', this.onGeolocalisationNoNeeded, false);    
    },
    // deviceready Event Handler  
    onDeviceReady: function() {
        connectedToDevice = true;
        app.receivedEvent('deviceready', true);
        checkLocalisation(true);
        requestStartingGame();
    },
    // Update DOM on a Received Event, display 'received' class and hide 'listening' class OR the opposite
    receivedEvent: function(id, received) {
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
    },
    // online Event Handler, update the connection name
    onOnline: function() {
        var networkState = navigator.connection.type;

        var states = {};
        //Two firsts are not usefull but if display something wrong is happen :D
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.NONE]     = 'No network connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';

        var element = document.getElementById('connectionType');
        element.innerHTML = states[networkState];
        
        connectedToInternet = true;
        app.receivedEvent('onOnline', true);
        requestStartingGame();
    },
    // offline Event Handler
    onOffline: function() {
        connectedToInternet = false;
        app.receivedEvent('onOnline', false);
    },
    // localisation Event Handler
    onGeolocationSuccess: function(position) {
        connectedToGPS = true;
        app.receivedEvent('onGPSConnection', true);
        requestStartingGame();
    },
    // error of localisation Event Handler
    onGeolocationError: function(error) {
        connectedToGPS = true;
        app.receivedEvent('onGPSConnection', false);
    },
    // resume the localisation Event Handler,
    onGeolocalisationNeeded: function(){
        checkLocalisation(true);
    },
    // pause the localisation Event Handler,
    onGeolocalisationNoNeeded: function(){
        checkLocalisation(false);
    }
};

//Start or stop the loop of localisation
function checkLocalisation(bool){
    if (bool){
        timer = setInterval(function () {getLocation()}, 6000);       
    }
    else{
        clearInterval(timer);
    }
}

//Request the current location (not use watchPosition because of no stable on android)
function getLocation(){
    navigator.geolocation.getCurrentPosition(app.onGeolocationSuccess, app.onGeolocationError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}

//Display an alert with some information
function helper(){
    alert('Device Name: '     + device.name     + '\n' +
          'Device Cordova: '  + device.cordova  + '\n' +
          'Device Platform: ' + device.platform + '\n' +
          'Device UUID: '     + device.uuid     + '\n' +
          'Device Version: '  + device.version  + '\n' +
          'Application version: 0.1'            + '\n\n' +
          'In order to start the application all information of the page must be green' + '\n\n' +
          'GolfChallenge require an internet and GPS connection' + '\n');
}

//Check if the device is ready to start the game
function requestStartingGame(){
    if(connectedToDevice && connectedToInternet && connectedToGPS /*&& connectedToServer*/){
        location.replace("boardGame.html");
    }
}

app.initialize();
