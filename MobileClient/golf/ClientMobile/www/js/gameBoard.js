
var dragAccepted = false;

var mouseLng = 0;
var mouseLat = 0;

var flightPath = null;
var flightPath2 = null;


//Variable to save the position to make the direction and strong deplacement
//Function called when page full loaded
function initialize(){

	var isTouchSupported = 'ontouchstart' in window;
	var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
	var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
	var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

	//Event all over the map
	document.getElementById('movementZone').addEventListener(startEvent, onStartDragBall, false);
	document.getElementById('movementZone').addEventListener(moveEvent, onMoveDragBall, false);
	document.getElementById('movementZone').addEventListener(endEvent, onStopDragBall, false);	
}

//Change position of pokeball with a x/y position 
function changePokeballPosition(x, y){
	var poke = document.getElementById('pokeball');

	//get element upper and botton map to set the dimmension
  	var upperElement = document.getElementById("upper_map");

	poke.style.left = x - poke.width/2 + 'px';
	poke.style.top = y - poke.height/2 + upperElement.offsetHeight + 'px';
}

//Change position of pokeball with the position of a google maps marker
function changePokeballFromLatLng(point){
	if(point !== null){
		pokeballPosition = point;

		var position = fromLatLngToPoint(point, map);
		changePokeballPosition(position.x, position.y);
	}
}

//Change position of pokeball with the position of a google maps marker
function changePokeballFromMarker(marker){
	if(marker !== null){	
		pokeballPosition = marker.getPosition();
		
		var position = fromLatLngToPoint(marker.getPosition(), map);
		changePokeballPosition(position.x, position.y);
	}
}

//Callback of startEvent
function onStartDragBall(event){
	var poke = document.getElementById('pokeball').getBoundingClientRect();

	var posX = event.touches[0].clientX;
	var posY = event.touches[0].clientY;

	//Autorized only if the drag is in the ball rect
	if(posX >= poke.left  && posX <= poke.right && posY >= poke.top && posY <= poke.bottom){
		dragAccepted = true;
		disableMovement(true);
	}
	else{
		dragAccepted = false;
		disableMovement(false);
	}
}

//Callback of endEvent
function onStopDragBall(event){
	//Clean the line if exist
	if(flightPath !== null){
		flightPath.setMap(null);
		flightPath = null;
		flightPath2.setMap(null);
		flightPath2 = null;

		var elem = document.getElementById('bottom_map');
		elem.innerHTML = 'Send data :' +  mouseLat + ':' + mouseLng;

		var distLat = pokeballPosition.lat()-mouseLat;
		var distLgn = pokeballPosition.lng()-mouseLng;

		var dataLat = pokeballPosition.lat()+distLat;
		var dataLng = pokeballPosition.lng()+distLgn;

		//getNearestPOI(mouseLat, mouseLng, onPOIRequestReceive);

		changePokeballFromLatLng(new google.maps.LatLng(dataLat, dataLng))
	}
	disableMovement(false);
}

function onPOIRequestReceive(data){
	alert(data['lt']);
	alert(data['lg']);

	var latLong = new google.maps.LatLng(data['lt'], data['lg']);
	changePokeballFromLatLng(latLong);

	var positionUser = devicePositionMarker.getPosition();

	postShot(positionUser.lat(), positionUser.lng(), pokeballPosition.lat(), pokeballPosition.lng(), gameID);
}

//Calback when user finger move
function onMoveDragBall(event){
	//Clean previous line
	if(flightPath !== null){
		flightPath.setMap(null);
		flightPath = null;
	}
	if(flightPath2 !== null){
		flightPath2.setMap(null);
		flightPath2 = null;
	}
	//If drag was accepted in callback of eventStart
	if(dragAccepted){
		//Finger position
		var posX = event.touches[0].clientX;
		var posY = event.touches[0].clientY;

		//Print some information of debug in the bottom
		var elem = document.getElementById('bottom_map');
		elem.innerHTML = 'DragBall moving \n finger x:' + posX + ' finger y:' + posY + ' / ' + 
										   ' ball lat: ' + pokeballPosition.lat() + ' ball long: ' + pokeballPosition.lng() + ' / ' +
										   ' mouse lat: ' + mouseLat + ' mouse long: '+ mouseLng ;

	    //Create tab with lat long position of the pokeball and lat long position of user mouse  
		var flightPlanCoordinates = [
		    new google.maps.LatLng(pokeballPosition.lat(), pokeballPosition.lng()),
		    new google.maps.LatLng(mouseLat, mouseLng),
		  ];

		  var distLat = pokeballPosition.lat()-mouseLat;
		  var distLgn = pokeballPosition.lng()-mouseLng;

		  var flightPlanCoordinates2 = [
		    new google.maps.LatLng(pokeballPosition.lat(), pokeballPosition.lng()),
		    new google.maps.LatLng(pokeballPosition.lat()+distLat/2, pokeballPosition.lng()+distLgn/2),
		    new google.maps.LatLng(pokeballPosition.lat()+distLat/4, pokeballPosition.lng()+distLgn/2),
		    new google.maps.LatLng(pokeballPosition.lat()+distLat/2, pokeballPosition.lng()+distLgn/4),
		    new google.maps.LatLng(pokeballPosition.lat()+distLat/2, pokeballPosition.lng()+distLgn/2),
		  ];

		
		//Create the line object 
		flightPath = new google.maps.Polyline({
		    								path: flightPlanCoordinates,
										    geodesic: true,
										    strokeColor: '#FF0000',
										    strokeOpacity: 1.0,
										    strokeWeight: 6
		  								});

		//Create the line object 
		flightPath2 = new google.maps.Polyline({
		    								path: flightPlanCoordinates2,
										    geodesic: true,
										    strokeColor: '#330099',
										    strokeOpacity: 1.0,
										    strokeWeight: 6
		  								});
		//Display it
		flightPath.setMap(map);
		flightPath2.setMap(map);
	}
}

//Callback of bounds_changed, update position of the ball
function onBoundsChanged(){
	var elem = document.getElementById('bottom_map');
	elem.innerHTML = 'map move';
	
	if(pokeballPosition !== null){
		changePokeballFromLatLng(pokeballPosition);
	}
}

//Callback of the mousemove, save the lat long position
function onMouseMove(event){
	mouseLat = event.latLng.lat();
	mouseLng = event.latLng.lng();
}


  
