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
* You have to create following function
*
* onDeviceReady();
* onOnline();
* onOffline();
* onGeolocationSuccess();
* onGeolocationError();
* onResume();
* onPause();
*
*/

//Timer used to make a loop of geolocalisation
var geoTimer = null;

//Bolean use to check connection
var connectedToDevice   = false;
var connectedToInternet = false;
var connectedToGPS      = false;

//Remember in this scope use 'this' to function access, otherwise use 'connectionManager'
var connectionManager = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    bindEvents: function() {
        //Event when Cordova is full loading
        document.addEventListener('deviceready', this.deviceReady, false);
        //Event when a internet connection is found
        document.addEventListener('online', this.online, false);
        //Event when the internet connection is lost
        document.addEventListener('offline', this.offline, false);
        //Event when the application is resumed/come of the background
        document.addEventListener('resume', this.onGeolocalisationNeeded, false);
        //Event when the application is paused/put in the background
        document.addEventListener('pause', this.onGeolocalisationNoNeeded, false);
        //Event when the application is paused/put in the background
        document.addEventListener('destroy', this.destroy, false);    
    },
    // deviceready Event Handler  
    deviceReady: function() {
        connectedToDevice = true;
        onDeviceReady();
    },
    // online Event Handler, update the connection name
    online: function() {
        connectedToInternet = true;
        onOnline();
    },
    // offline Event Handler
    offline: function() {
        connectedToInternet = false;
        onOffline();
    },
    // localisation Event Handler
    geolocationSuccess: function(position) {
        connectedToGPS = true;
        onGeolocationSuccess();
    },
    // error of localisation Event Handler
    geolocationError: function(error) {
        connectedToGPS = false;
        onGeolocationError();
    },
    // resume the localisation Event Handler,
    onGeolocalisationNeeded: function(){
        checkLocalisation(true);
        onResume();
    },
    // pause the localisation Event Handler,
    onGeolocalisationNoNeeded: function(){
        checkLocalisation(false);
        onPause();
    }
};

//Start or stop the loop of localisation
function checkLocalisation(start){
    if (start){
        geoTimer = setInterval(function () {getLocation()}, 6000);       
    }
    else{
        clearInterval(geoTimer);
    }
}

//Request the current location (not use watchPosition because of no stable on android)
function getLocation(){
    navigator.geolocation.getCurrentPosition(connectionManager.geolocationSuccess, connectionManager.geolocationError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}

connectionManager.initialize();
