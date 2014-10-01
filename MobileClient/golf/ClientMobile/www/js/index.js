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

var timer = null;

var app = {
    // Application Constructor
    initialize: function() {
        this.bindEvents();
    },
    // Bind Event Listeners
    //
    // Bind any events that are required on startup. Common events are:
    // 'load', 'deviceready', 'offline', and 'online'.
    bindEvents: function() {
        document.addEventListener('deviceready', this.onDeviceReady, false);
        document.addEventListener("online", this.onOnline, false);
        document.addEventListener("offline", this.onOffline, false);
        
    },
    // deviceready Event Handler
    //
    // The scope of 'this' is the event. In order to call the 'receivedEvent'
    // function, we must explicitly call 'app.receivedEvent(...);'
    onDeviceReady: function() {
        app.receivedEvent('deviceready');
        checkLocalisation(true);
    },
    // Update DOM on a Received Event
    receivedEvent: function(id) {
        var parentElement = document.getElementById(id);
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:none;');
        receivedElement.setAttribute('style', 'display:block;');
    },
    onOnline: function() {
        var networkState = navigator.connection.type;

        var states = {};
        states[Connection.UNKNOWN]  = 'Unknown connection';
        states[Connection.ETHERNET] = 'Ethernet connection';
        states[Connection.WIFI]     = 'WiFi connection';
        states[Connection.CELL_2G]  = 'Cell 2G connection';
        states[Connection.CELL_3G]  = 'Cell 3G connection';
        states[Connection.CELL_4G]  = 'Cell 4G connection';
        states[Connection.CELL]     = 'Cell generic connection';
        states[Connection.NONE]     = 'No network connection';

        var element = document.getElementById('connectionType');
        element.innerHTML = states[networkState];
        
        app.receivedEvent('onOnline');
    },
    onOffline: function() {
        var parentElement = document.getElementById('onOnline');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:block;');
        receivedElement.setAttribute('style', 'display:none;');
    },
    onGeolocationSuccess: function(position) {
        app.receivedEvent('onGPSConnection');
    },
    onGeolocationError: function(error) {
        var parentElement = document.getElementById('onGPSConnection');
        var listeningElement = parentElement.querySelector('.listening');
        var receivedElement = parentElement.querySelector('.received');

        listeningElement.setAttribute('style', 'display:block;');
        receivedElement.setAttribute('style', 'display:none;');
    }
};

function checkLocalisation(bool){
    if (bool){
        timer = setInterval(function () {getLocation()}, 6000);       
    }
    else{
        clearInterval(timer);
    }
}

function getLocation(){
    navigator.geolocation.getCurrentPosition(app.onGeolocationSuccess, app.onGeolocationError, { maximumAge: 3000, timeout: 5000, enableHighAccuracy: true });
}

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

app.initialize();
