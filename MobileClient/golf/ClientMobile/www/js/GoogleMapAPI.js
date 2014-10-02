var map = null;

function initializeCarto() {
    var mapOptions = {
        center: { lat: 46.5643202, lng: 2.5282764},
        zoom: 6,
        mapTypeId: google.maps.MapTypeId.ROADMAP
      	};
    var divMap = document.getElementById("map-canvas");
    divMap.style.width = screen.width - 10 + "px";
    divMap.style.height = screen.height -10 + "px";
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
}

var onSuccess = function(position) {
	alert("Changement de localisation \n Latitude: " + position.coords.latitude + " \n Longitude: " + position.coords.longitude);
	map.setCenter(new google.maps.LatLng(position.coords.latitude, position.coords.longitude));
	map.setZoom(17);

	var marker = new google.maps.Marker({
      position: new google.maps.LatLng(position.coords.latitude, position.coords.longitude),
      map: map,
      title: 'Je te vois :D'
  });
    
    /*alert('Latitude: '          + position.coords.latitude          + '\n' +
          'Longitude: '         + position.coords.longitude         + '\n' +
          'Altitude: '          + position.coords.altitude          + '\n' +
          'Accuracy: '          + position.coords.accuracy          + '\n' +
          'Altitude Accuracy: ' + position.coords.altitudeAccuracy  + '\n' +
          'Heading: '           + position.coords.heading           + '\n' +
          'Speed: '             + position.coords.speed             + '\n' +
          'Timestamp: '         + position.timestamp                + '\n');*/
};

// onError Callback receives a PositionError object
//
function onError(error) {
    alert('code: '    + error.code    + '\n' +
          'message: ' + error.message + '\n');
}

function localise() {
	navigator.geolocation.getCurrentPosition(onSuccess, onError);
}

