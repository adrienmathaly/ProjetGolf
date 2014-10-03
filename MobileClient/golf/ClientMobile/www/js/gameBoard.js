//Timer use to wait the localization
var timer = null;

var dragAccepted = false;

var mouseLng = 0;
var mouseLat = 0;

var flightPath = null;

//The id is delivery by the server when the first connection
var gameID = null;

//Variable to save the position to make the direction and strong deplacement
//Function called when page full loaded
function initialize(){
	//Retrieve the id gaming
	gameID = location.search.split('id=')[1];

	initializeCarto();
	localiseOnMap();

	timer = setInterval(function(){changePokeballFromMarker(devicePositionMarker)}, 300);


	var isTouchSupported = 'ontouchstart' in window;
	var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
	var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
	var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

	//Event all over the map
	document.getElementById('movementZone').addEventListener(startEvent, onStartDragBall, false);
	document.getElementById('movementZone').addEventListener(moveEvent, onMoveDragBall, false);
	document.getElementById('movementZone').addEventListener(endEvent, onStopDragBall, false);

	//Google maps event
	google.maps.event.addListener(map, 'drag', onBoundsChanged);
	google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged);
	google.maps.event.addListener(map, 'mousemove', onMouseMove);
}

//Change position of pokeball with a x/y position 
function changePokeballPosition(x, y){
	var poke = document.getElementById('pokeball');

	poke.style.left = x + 'px';
	poke.style.top = y + 'px';
}


//Change position of pokeball with the position of a google maps marker
function changePokeballFromMarker(marker){
	if(devicePositionMarker !== null)
	{
		//Used for the initialization, after is useless
		clearInterval(timer);
		var position = fromLatLngToPoint(marker.getPosition(), map);
		pokeballPosition = marker.getPosition();
		
		var poke = document.getElementById("pokeball");
		changePokeballPosition(position.x - poke.width/2, position.y + poke.width/2);
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

		var elem = document.getElementById('bottom_map');
		elem.innerHTML = 'Send data :' +  mouseLat + ':' + mouseLng;
		getNearestPOI(mouseLat, mouseLng, test);
	}
	disableMovement(false);
}

function test(data){
	alert(data['name']);
}

//Calback when user finger move
function onMoveDragBall(event){
	//Clean previous line
	if(flightPath !== null){
		flightPath.setMap(null);
		flightPath = null;
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
		
		//Create the line object 
		flightPath = new google.maps.Polyline({
		    								path: flightPlanCoordinates,
										    geodesic: true,
										    strokeColor: '#FF0000',
										    strokeOpacity: 1.0,
										    strokeWeight: 6
		  								});
		//Display it
		flightPath.setMap(map);
	}
}

//Callback of bounds_changed, update position of the ball
function onBoundsChanged(){
	var elem = document.getElementById('bottom_map');
	elem.innerHTML = 'map move';
	var position = fromLatLngToPoint(pokeballPosition, map);
	
	var poke = document.getElementById("pokeball");	
	changePokeballPosition(position.x - poke.width/2, position.y + poke.width/2);
}

//Callback of the mousemove, save the lat long position
function onMouseMove(event){
	mouseLat = event.latLng.lat();
	mouseLng = event.latLng.lng();
}


  
