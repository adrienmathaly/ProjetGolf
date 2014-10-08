

// Bolean use to accept the shot
var dragAccepted = false;

// Longitude and Latitute of the mouse or finger on the map
var mouseLng = 0;
var mouseLat = 0;

// Line ta drawn when the drag's ball is accepted
var flightPath = null;

// Effect of ball
var forceBall = 1;

// Initialize all listener needed
function initializeListener(){

	// generalize the touche for finger and mouse
	var isTouchSupported = 'ontouchstart' in window;
	var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
	var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
	var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

	// event all over the map
	document.getElementById('movementZone').addEventListener(startEvent, onStartDragBall, false);
	document.getElementById('movementZone').addEventListener(moveEvent, onMoveDragBall, false);
	document.getElementById('movementZone').addEventListener(endEvent, onStopDragBall, false);	

	//Event on pokeball below the map
	document.getElementById('pokeball_1').addEventListener('click', function(){changePokeball(1)}, false);
	document.getElementById('pokeball_2').addEventListener('click', function(){changePokeball(2)}, false);
	document.getElementById('pokeball_3').addEventListener('click', function(){changePokeball(3)}, false);
	document.getElementById('pokeball_4').addEventListener('click', function(){changePokeball(4)}, false);

	//Google maps event
	google.maps.event.addListener(map, 'drag', onBoundsChanged);
	google.maps.event.addListener(map, 'bounds_changed', onBoundsChanged);
	google.maps.event.addListener(map, 'mousemove', onMouseMove);
}

//Change pokeball position with a x/y position 
function changePokeballPosition(x, y){
	var poke = document.getElementById('pokeball');
  	var upperElement = document.getElementById("upper_map");
  	var zoneElement = document.getElementById("movementZone").getBoundingClientRect();

	poke.style.left = x - poke.width/2 + 'px';
	poke.style.top = y - poke.height/2 + upperElement.offsetHeight + 'px';
  	
  	if(poke.getBoundingClientRect().bottom > zoneElement.bottom || poke.getBoundingClientRect().top < zoneElement.top ){
		// if display none we can't get the position or the boundingRect, so hidden with move out of screen
		poke.style.left = '-10000px';
  	}
  	else{
  		poke.style.display = 'inline';
  	}
}

// Change pokeball position with the position of a google maps marker
function changePokeballFromLatLng(point){
	if(point !== null){
		pokeballPosition = point;

		var position = fromLatLngToPoint(point, map);
		changePokeballPosition(position.x, position.y);
	}
}

// Change pokeball position with the position of a google maps marker
function changePokeballFromMarker(marker){
	if(marker !== null){	
		pokeballPosition = marker.getPosition();
		
		var position = fromLatLngToPoint(marker.getPosition(), map);
		changePokeballPosition(position.x, position.y);
	}
}

// Touch or mouse start Event Handler
function onStartDragBall(event){
	dragAccepted = false;
	disableMovement(false);

	var poke = document.getElementById('pokeball').getBoundingClientRect();

	var posX = event.touches[0].clientX;
	var posY = event.touches[0].clientY;

	var gameMode = document.getElementById("gameMode").value;

	var latDevice = devicePositionMarker.getPosition().lat();
	var lngDevice = devicePositionMarker.getPosition().lng();

	var latPoke = pokeballPosition.lat();
	var lngPoke = pokeballPosition.lng();
	
	// autorized only if the mouse/finger is in the ball rect
	if(posX >= poke.left  && posX <= poke.right && posY >= poke.top && posY <= poke.bottom){
		// if gameMode trainer the device position need to be less than 0.1° of a POI or ball position
		if(gameMode == '2'){
			var indexMarker = 0;
			for(indexMarker in markersPoi){
				if( Math.abs(latDevice-markersPoi[indexMarker].getPosition().lat()) < 0.1 && Math.abs(lngDevice-markersPoi[indexMarker].getPosition().lng()) < 0.1 ){
				dragAccepted = true;
				disableMovement(true);
				}
			}
			if( Math.abs(latDevice-latPoke) < 0.1 && Math.abs(lngDevice-lngPoke) < 0.1 ){
				dragAccepted = true;
				disableMovement(true);
			}
		}
		// if gameMode master the device position need to be less than 0.1° of the ball position
		else if(gameMode == '3'){
			if( Math.abs(latDevice-latPoke) < 0.1 && Math.abs(lngDevice-lngPoke) < 0.1 ){
				dragAccepted = true;
				disableMovement(true);
			}
		}
		// if gameMode beginner (default) user can shot without any test
		else{
			dragAccepted = true;
			disableMovement(true);
		}
	}
}

// Touch or mouse stop Event Handler
function onStopDragBall(event){
	if(dragAccepted == true){
		// clean the line if exist
		flightPath.setMap(null);
		flightPath = null;

		// some debug information
		var elem = document.getElementById('information');
		elem.innerHTML = 'Send data :' +  mouseLat + ':' + mouseLng;
		updateSizeCarto();

		// get the pokeball lat and lng localisation
		var distLat = pokeballPosition.lat()-mouseLat;
		var distLgn = pokeballPosition.lng()-mouseLng;
		// calculate lat et lng of pokeball drop (with pokeball effect)
		var dataLat = pokeballPosition.lat()+distLat*forceBall;
		var dataLng = pokeballPosition.lng()+distLgn*forceBall;
		// get user localisation
		var positionUser = devicePositionMarker.getPosition();

		postShot(positionUser.lat(), positionUser.lng(), dataLat, dataLng, gameID, onRequestResponse);
	}
	dragAccepted = false;
	disableMovement(false);
}

// Get the server JSON reponse in data
function onRequestResponse(data){
	// clean previous POI marker on map
	for(marker in markersPoi){
		markersPoi[marker].setMap(null);
	}
	markersPoi = [];

	// move ball with response server
	changePokeballFromLatLng(new google.maps.LatLng(data['ballLt'], data['ballLg']));

	// add a town marker
	var townMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(data['ltCity'], data['lgCity']),
	        map: map,
	        title: data['name'],
	        icon: 'img/google_marker/town.png',
	        zIndex: 3000 
	});
	// add marker to the list
	markersPoi.push(townMarker);
	// display marker
	townMarker.setMap(map);

	// create the string to display in the google maps pop-up
	var contentString = 
		'<div id="content">'+
		    '<div id="siteNotice">'+ '</div>'+
		    '<h1 id="firstHeading" class="firstHeading">' + data['name'] + '</h1>'+
		    '<div id="bodyContent">'+
		    	'<p></p>'+
		    	'<p>Link town: ' + data['name'] + ', <a href="' + data['url'] + '">'+ data['url'].toLowerCase() + '</a> '+
		    '</div>'+
		'</div>';

	// create the info object
	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	// add click listener to display the infowindow
	google.maps.event.addListener(townMarker, 'click', function() {
		infowindow.open(map,townMarker);
	});

	// add each POI in map
	var listPoi = data['listOfPoi'];
	var poi = null;
	for(poi in listPoi){
		//Retrieve the picture with the type received
		var iconMarker = 'img/google_marker/' + listPoi[poi]['type'].toLowerCase() + '.png';
		
		//Create a marker with localisation and icon
		var poiMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(listPoi[poi]['ltPoi'], listPoi[poi]['lgPoi']),
	        map: map,
	        title: listPoi[poi]['name'],
	        icon: iconMarker
	    });
		markersPoi.push(poiMarker);
		poiMarker.setMap(map);
	}
	//Display automatically infowindow
	infowindow.open(map, townMarker);
	zoomAutoListMarker(markersPoi);
}

// Touch or mouse move Event Handler
function onMoveDragBall(event){
	// clean previous line
	if(flightPath !== null){
		flightPath.setMap(null);
		flightPath = null;
	}

	// if drag was accepted in callback of eventStart
	if(dragAccepted){
		// get finger localisation
		var posX = event.touches[0].clientX;
		var posY = event.touches[0].clientY;

		// print some information of debug in the bottom
		var elem = document.getElementById('information');
		elem.innerHTML = 'DragBall moving \n finger x:' + posX + ' finger y:' + posY + ' / ' + 
										   ' ball lat: ' + pokeballPosition.lat() + ' ball long: ' + pokeballPosition.lng() + ' / ' +
										   ' mouse lat: ' + mouseLat + ' mouse long: '+ mouseLng ;
		updateSizeCarto();

	    // create tab with lat long position of the pokeball and lat long position of user mouse  
		var flightPlanCoordinates = [
		    new google.maps.LatLng(pokeballPosition.lat(), pokeballPosition.lng()),
		    new google.maps.LatLng(mouseLat, mouseLng),
		  ];
	
		// create the line object 
		flightPath = new google.maps.Polyline({
		    								path: flightPlanCoordinates,
										    geodesic: true,
										    strokeColor: '#FF0000',
										    strokeOpacity: 1.0,
										    strokeWeight: 6
		  								});

		// display it
		flightPath.setMap(map);
	}
}

// map bounds changed Event Handler
function onBoundsChanged(){
	// update pokeball position
	if(pokeballPosition !== null){
		changePokeballFromLatLng(pokeballPosition);
	}
}

// move finger or mouse Event Handler
function onMouseMove(event){
	// update finger localisation
	mouseLat = event.latLng.lat();
	mouseLng = event.latLng.lng();
}

// Update icon pokeball and effet
function changePokeball(id){
	var pokeball = document.getElementById('pokeball');
	switch(id){
		case 1:
			pokeball.src = "img/pokeball.png";
			forceBall = 1;
			break;
		case 2:
			pokeball.src = "img/superball.png";
			forceBall = 2;
			break;
		case 3:
			pokeball.src = "img/ultraball.png";
			forceBall = 3;
			break;
		case 4:
			pokeball.src = "img/masterball.png";
			forceBall = 4;
			break;
		default:
			pokeball.src = "img/pokeball.png";
			forceBall = 1;
	}
}

// Initialize pokeball position on map according to JSON received to the server
function initializeBall(data){
	// if server don't find the last position, get device localisation
	if(data == 'Erreur 404, ressource not available'){
		changeMapCenterFromMarker(devicePositionMarker);
	    pokeballPosition = devicePositionMarker.getPosition();
	    changePokeballFromLatLng(pokeballPosition);
	}
	// else extract position
	else{
		var lt = data['lt'];
		var lg = data['lg'];

		if( lt != '' && lg != ''){
			pokeballPosition = new google.maps.LatLng(lt, lg);
	    	changePokeballFromLatLng(pokeballPosition);
	    	changeMapCenterFromMarker(devicePositionMarker);
	    	var list = [];
	    	list.push(devicePositionMarker);
	    	zoomAutoListMarker(list);
		}
		// if data is corrupted take device localisation
		else{
			changeMapCenterFromMarker(devicePositionMarker);
		    pokeballPosition = devicePositionMarker.getPosition();
		    changePokeballFromLatLng(pokeballPosition);
		}
	}
}