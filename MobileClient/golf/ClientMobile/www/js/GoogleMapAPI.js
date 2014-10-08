//Variable to access to the map
var map = null;

//Marker
var devicePositionMarker = null;
var errorDevicePositionMarker = null;

//Position
var pokeballPosition = null;

//Tab of position (last POI) to fit auto
var markersPoi = [];

// Create a google map center in France and display it
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

//Update the size of the google map according to upper and bottom element
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

  // indicate to the map the div is resized
  google.maps.event.trigger(map, 'resize'); 
}

// Change center of map according to a position (lat, lng)
function changeMapCenterFromLatLng(position) {
  map.setCenter(new google.maps.LatLng(position.lat(), position.lng()));
}

// Change center of map according to a marker
function changeMapCenterFromMarker(marker) {
  changeMapCenterFromLatLng(marker.getPosition());
}

// Localise the device and callback the function to display
function localiseOnMap() {
  navigator.geolocation.getCurrentPosition(onLocaliseSuccess, onLocaliseError);
}

// onSucess localisation mark the position
var onLocaliseSuccess = function(position) {
  // erase the error marker if exist
  if(errorDevicePositionMarker !== null){
    errorDevicePositionMarker.setMap(null);
    errorDevicePositionMarker = null;
  }

  // create a new device position marker if not exist
  if(devicePositionMarker === null){
      devicePositionMarker = new google.maps.Marker({
        position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
        map: map,
        title: 'Je te vois :D'
    });
  }
  // if already exist update position
  else{
    devicePositionMarker.setPosition(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
  }

  // if the map center was not initialized set it to the device position and update the zoom according to the device and ball
  if(! initializedCenter){
    
    initializedCenter = true;

    var bottomElement = document.getElementById('pokeball');
    bottomElement.style.display = 'inline';
    
    getInformation('lastlocation?token=' + gameID, initializeBall),
    updateSizeCarto();
  }
};

// onError Callback receives a PositionError object
function onLocaliseError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

//From latitute and longitute get the pixel position on screen
function fromLatLngToPoint(latLng, map) {
  //Thanks to http://krasimirtsonev.com/blog/article/google-maps-api-v3-convert-latlng-object-to-actual-pixels-point-object
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

// Rezoom auto according to listMarker localisation and ball localisation
function zoomAutoListMarker(listMarker){
  var bounds = new google.maps.LatLngBounds();
  var indexMarker = null;
  for(indexMarker in listMarker){
    bounds.extend(listMarker[indexMarker].getPosition());
  }
  //Add the ball to see all marker markers and the ball
  bounds.extend(pokeballPosition);
  map.fitBounds(bounds);
}



