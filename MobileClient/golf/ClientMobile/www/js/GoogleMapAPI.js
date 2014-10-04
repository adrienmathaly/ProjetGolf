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

//Position
var pokeballPosition = null;

//When the body is full loaded initialize carto on France
function initializeCarto() {
    var mapOptions = {
        center: { lat: 46.5643202, lng: 2.5282764},
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
        };
    var divMap = document.getElementById("map-google");

    //get element upper and botton the map to set the dimmension
    var upperElement = document.getElementById("upper_map");
    var bottomElement = document.getElementById("bottom_map");

    //height of map = height of screen - height of data upper - height of data bottom - 25px because of action bar
    var displayHeight = screen.height - upperElement.offsetHeight - bottomElement.offsetHeight - 25;
    
    divMap.style.width = screen.width + "px";
    divMap.style.height = displayHeight + "px";

    map = new google.maps.Map(document.getElementById('map-google'), mapOptions);
}

function updateCarto(){
  var data = null;
}

//Update the size 

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
  devicePositionMarker = new google.maps.Marker({
      position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      map: map,
      title: 'Je te vois :D'
  });
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





