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

// Timer used to make a loop of geolocalisation
var geoTimer = null;

// Bolean use to check connection
var connectedToDevice   = false;
var connectedToInternet = false;
var connectedToGPS      = false;

// Remember in this scope use 'this' to function access, otherwise use 'connectionManager'
var connectionManager = {
    // application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // bind Event Listeners
    bindEvents: function() {
        // event when Cordova is full loading
        document.addEventListener('deviceready', this.deviceReady, false);
        // event when a internet connection is found
        document.addEventListener('online', this.online, false);
        // event when the internet connection is lost
        document.addEventListener('offline', this.offline, false);
        // event when the application is resumed/come of the background
        document.addEventListener('resume', this.onGeolocalisationNeeded, false);
        // event when the application is paused/put in the background
        document.addEventListener('pause', this.onGeolocalisationNoNeeded, false);
        // event when the orientation change
        window.addEventListener('resize', this.orientationchange);    
    },
    // deviceready Event Handler  
    deviceReady: function() {
        connectedToDevice = true;

        checkLocalisation(true);
        onDeviceReady();
    },
    // online Event Handler
    online: function() {
        connectedToInternet = true;
        onOnline();
    },
    // offline Event Handler
    offline: function() {
        connectedToInternet = false;
        onOffline();
    },
    // sucess localisation Event Handler
    geolocationSuccess: function(position) {
        connectedToGPS = true;
        onGeolocationSuccess();
    },
    // error localisation Event Handler
    geolocationError: function(error) {
        connectedToGPS = false;
        onGeolocationError();
    },
    // resume Event Handler, resume localisation loop
    onGeolocalisationNeeded: function(){
        checkLocalisation(true);
        onResume();
    },
    // pause Event Handler, stop localisation loop
    onGeolocalisationNoNeeded: function(){
        checkLocalisation(false);
        onPause();
    },
    // orientation device Event Handler
    orientationchange: function(){
        onOrientationChanged();
    }
};

// Start or stop the loop of localisation
function checkLocalisation(start){
    if (start){
        geoTimer = setInterval(function () {getLocation()}, 6000);       
    }
    else{
        clearInterval(geoTimer);
    }
}

// Request the current location (not use watchPosition because of no stable on android)
// Create a localisation success or error in the connectionManager
function getLocation(){
    navigator.geolocation.getCurrentPosition(connectionManager.geolocationSuccess, 
                                             connectionManager.geolocationError, 
                                             { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true }
    );
}

connectionManager.initialize();
