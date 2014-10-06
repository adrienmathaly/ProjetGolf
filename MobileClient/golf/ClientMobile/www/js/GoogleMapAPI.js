//To remember we can access to position   
    /*alert('Latitude: '        + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/

//Variable to access to the map and projection
var map = null;

//Marker
var devicePositionMarker = null;
var errorDevicePositionMarker = null;

//Position
var pokeballPosition = null;

//Tab of position (last POI) to fit auto
var markersPoi = [];
var infoMarkersPoi = [];

//When the body is full loaded initialize carto on France
function initializeCarto() {
  var mapOptions = {
      center: { lat: 46.5643202, lng: 2.5282764},
      zoom: 6,
      mapTypeId: google.maps.MapTypeId.ROADMAP
      };
  map = new google.maps.Map(document.getElementById('map-google'), mapOptions);

  var bottomElement = document.getElementById('movementZone');
  bottomElement.style.display = 'block';
}

//Update the size on the html page
function updateSizeCarto(){
  //get map element
  var divMap = document.getElementById("map-google");

  //get element upper and botton map to set the dimmension
  var upperElement = document.getElementById("upper_map");
  var bottomElement = document.getElementById("bottom_map");

  //height of map = height of screen - height of data upper - height of data bottom - 25px because of action bar
  var displayHeight = window.innerHeight - upperElement.offsetHeight - bottomElement.offsetHeight;
  var displayWidth = window.innerWidth;

  divMap.style.width = displayWidth + "px";
  divMap.style.height = displayHeight + "px";  
  google.maps.event.trigger(map, 'resize'); 
}

//Update the size on the google map
function updateSizeMap(){
  
}


// change center of map
function changeMapCenterFromLatLng(position) {
  map.setCenter(new google.maps.LatLng(position.lat(), position.lng()));
}

// change center of map
function changeMapCenterFromMarker(marker) {
  changeMapCenterFromLatLng(marker.getPosition());
}

// onSucess localisation mark the position
var onLocaliseSuccess = function(position) {
  if(errorDevicePositionMarker !== null){
    errorDevicePositionMarker.setMap(null);
    errorDevicePositionMarker = null;
  }

  if(devicePositionMarker === null){
      devicePositionMarker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title: 'Je te vois :D'
    });
  }
  else{
    devicePositionMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }

  if(! initializedCenter){
    changeMapCenterFromMarker(devicePositionMarker);
    pokeballPosition = devicePositionMarker.getPosition();
    changePokeballFromLatLng(pokeballPosition);
    initializedCenter = true;

    var bottomElement = document.getElementById('pokeball');
    bottomElement.style.display = 'inline';
    updateSizeCarto();
  }
};

// onError Callback receives a PositionError object
function onLocaliseError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//Localise the mobile
function localiseOnMap() {
  navigator.geolocation.getCurrentPosition(onLocaliseSuccess, onLocaliseError);
}

//From latitute and longitute get the pixel position on screen
function fromLatLngToPoint(latLng, map) {
  var topRight = map.getProjection().fromLatLngToPoint(map.getBounds().getNorthEast());
  var bottomLeft = map.getProjection().fromLatLngToPoint(map.getBounds().getSouthWest());
  var scale = Math.pow(2, map.getZoom());
  var worldPoint = map.getProjection().fromLatLngToPoint(latLng);
  return new google.maps.Point((worldPoint.x - bottomLeft.x) * scale, (worldPoint.y - topRight.y) * scale);
}

//Disable or enable the map movement, zoom, scrool, doubleclick
function disableMovement(disable) {
    var mapOptions;
    if (disable) {
        mapOptions = {
            draggable: false,
            scrollwheel: false,
            disableDoubleClickZoom: true,
            zoomControl: false
        };
    } else {
        mapOptions = {
            draggable: true,
            scrollwheel: true,
            disableDoubleClickZoom: false,
            zoomControl: true
        };
    }
    map.setOptions(mapOptions);
}

//function rezoom auto between device localisation and ball localisation
function zoomAutoListMarker(listMarker){
  alert(listMarker);
  /*  var bounds = new google.maps.LatLngBounds();
    
    var indexMarker = null;
    for(indexMarker in listMarker){
      alert(listMarker[indexMarker].getPosition());
      bounds.extend(listMarker[indexMarker].getPosition());
    }
    map.fitBounds(bounds);*/
}



