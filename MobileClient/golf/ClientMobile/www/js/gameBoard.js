
var dragAccepted = false;

var mouseLng = 0;
var mouseLat = 0;

var flightPath = null;

var forceBall = 1;

//Variable to save the position to make the direction and strong deplacement
//Function called when page full loaded
function initializeListener(){

	var isTouchSupported = 'ontouchstart' in window;
	var startEvent = isTouchSupported ? 'touchstart' : 'mousedown';
	var moveEvent = isTouchSupported ? 'touchmove' : 'mousemove';
	var endEvent = isTouchSupported ? 'touchend' : 'mouseup';

	//Event all over the map
	document.getElementById('movementZone').addEventListener(startEvent, onStartDragBall, false);
	document.getElementById('movementZone').addEventListener(moveEvent, onMoveDragBall, false);
	document.getElementById('movementZone').addEventListener(endEvent, onStopDragBall, false);	

	//Event on pokeball below the map
	document.getElementById('pokeball_1').addEventListener('click', function(){changePokeball(1)}, false);
	document.getElementById('pokeball_2').addEventListener('click', function(){changePokeball(2)}, false);
	document.getElementById('pokeball_3').addEventListener('click', function(){changePokeball(3)}, false);
	document.getElementById('pokeball_4').addEventListener('click', function(){changePokeball(4)}, false);
}

//Change position of pokeball with a x/y position 
function changePokeballPosition(x, y){
	var poke = document.getElementById('pokeball');

	//get element upper and botton map to set the dimmension
  	var upperElement = document.getElementById("upper_map");

  	var zoneElement = document.getElementById("movementZone").getBoundingClientRect();
  	//alert('zone: ' + zoneElement.top + '/' + zoneElement.bottom );

	poke.style.left = x - poke.width/2 + 'px';
	poke.style.top = y - poke.height/2 + upperElement.offsetHeight + 'px';
  	
  	if(poke.getBoundingClientRect().bottom > zoneElement.bottom || poke.getBoundingClientRect().top < zoneElement.top ){
		//Display none make enable to get the position or the boundingRect, so hidden with move out of screen
		poke.style.left = '-10000px';
  	}
  	else{
  		poke.style.display = 'inline';
  	}
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
	
	//Autorized only if the drag is in the ball rect
	if(posX >= poke.left  && posX <= poke.right && posY >= poke.top && posY <= poke.bottom){
		
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
		else if(gameMode == '3'){
			if( Math.abs(latDevice-latPoke) < 0.1 && Math.abs(lngDevice-lngPoke) < 0.1 ){
				dragAccepted = true;
				disableMovement(true);
			}
		}
		else{
			dragAccepted = true;
			disableMovement(true);

		}
	}
}

//Callback of endEvent
function onStopDragBall(event){
	//Clean the line if exist
	if(flightPath !== null){
		flightPath.setMap(null);
		flightPath = null;

		var elem = document.getElementById('information');
		elem.innerHTML = 'Send data :' +  mouseLat + ':' + mouseLng;
		updateSizeCarto();

		var distLat = pokeballPosition.lat()-mouseLat;
		var distLgn = pokeballPosition.lng()-mouseLng;

		var dataLat = pokeballPosition.lat()+distLat*forceBall;
		var dataLng = pokeballPosition.lng()+distLgn*forceBall;

		var positionUser = devicePositionMarker.getPosition();
		postShot(positionUser.lat(), positionUser.lng(), dataLat, dataLng, gameID, onRequestResponse);

		/*changePokeballFromLatLng(new google.maps.LatLng(dataLat, dataLng))
		zoomAutoDeviceBall();*/
	}
	disableMovement(false);
}

function onRequestResponse(data){
	//Clean POI marker on map
	for(marker in markersPoi){
		markersPoi[marker].setMap(null);
	}
	markersPoi = [];

	//alert('Ball : ' + data['ballLt'] + '/' + data['ballLg']);
	//Move ball with response server
	changePokeballFromLatLng(new google.maps.LatLng(data['ballLt'], data['ballLg']));

	//Add a town marker
	var townMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(data['ltCity'], data['lgCity']),
	        map: map,
	        title: data['name'],
	        icon: 'img/google_marker/town.png',
	        zIndex: 3000 
	    });
	markersPoi.push(townMarker);
	townMarker.setMap(map);

	var contentString = 
		'<div id="content">'+
		    '<div id="siteNotice">'+ '</div>'+
		    '<h1 id="firstHeading" class="firstHeading">' + data['name'] + '</h1>'+
		    '<div id="bodyContent">'+
		    	'<p></p>'+
		    	'<p>Link town: ' + data['name'] + ', <a href="' + data['url'] + '">'+ data['url'].toLowerCase() + '</a> '+
		    '</div>'+
		'</div>';

	var infowindow = new google.maps.InfoWindow({
		content: contentString
	});

	google.maps.event.addListener(townMarker, 'click', function() {
		infowindow.open(map,townMarker);
	});

	//Add each POI in map
	var listPoi = data['listOfPoi'];
	var poi = null;
	for(poi in listPoi){
		//alert(poi + '/' + listPoi[poi]['lt'] + '/' + listPoi[poi]['lg']);
		//Retrieve the picture with the type received
		var iconMarker = 'img/google_marker/' + listPoi[poi]['type'].toLowerCase() + '.png';
		
		//Create a marker for each POI
		var poiMarker = new google.maps.Marker({
	        position: new google.maps.LatLng(listPoi[poi]['ltPoi'], listPoi[poi]['lgPoi']),
	        map: map,
	        title: listPoi[poi]['name'],
	        icon: iconMarker
	    });
		markersPoi.push(poiMarker);
		poiMarker.setMap(map);
	}
	zoomAutoListMarker(markersPoi);
	//Display auto the info
	infowindow.open(map, townMarker);
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
		var elem = document.getElementById('information');
		elem.innerHTML = 'DragBall moving \n finger x:' + posX + ' finger y:' + posY + ' / ' + 
										   ' ball lat: ' + pokeballPosition.lat() + ' ball long: ' + pokeballPosition.lng() + ' / ' +
										   ' mouse lat: ' + mouseLat + ' mouse long: '+ mouseLng ;
		updateSizeCarto();

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

		//Display it
		flightPath.setMap(map);
	}
}

//Callback of bounds_changed, update position of the ball
function onBoundsChanged(){
	var elem = document.getElementById('information');
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


  
