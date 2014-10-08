// game server's ip and port
var serveurIp = 'http://172.31.1.191';
var serveurPort = ':8081/';

// Create a HTMLREQUEST object
function getXMLHttpRequest() {
	var xhr = null;	
	if (window.XMLHttpRequest || window.ActiveXObject) {
		if (window.ActiveXObject) {
			try {
				xhr = new ActiveXObject("Msxml2.XMLHTTP");
			} catch(e) {
				xhr = new ActiveXObject("Microsoft.XMLHTTP");
			}
		} else {
			xhr = new XMLHttpRequest(); 
		}
	} else {
		alert("Votre navigateur ne supporte pas l'objet XMLHTTPRequest...");
		return null;
	}
	return xhr;
}


// Ask for a server's information and send the JSON response to the callback
function getInformation(info, callback){
	// create an object able to communicate in http request
	var xhr = getXMLHttpRequest();

	// on state change event handler
	xhr.onreadystatechange = function() {
		// if request finish, response ready and server response code OK
		if (xhr.readyState == 4 && xhr.status == 200) {
			// stop the timer timeout
			clearTimeout(xmlHttpTimeout); 
			callback(JSON.parse(xhr.responseText));
		}
		// if request finish, response ready and server response code Ressource not available 
		else if (xhr.readyState == 4 && xhr.status == 404) {
			// stop the timer timeout
			clearTimeout(xmlHttpTimeout); 
			callback('Erreur 404, ressource not available');
		}
	};
	
	// GET the information
	xhr.open("GET", serveurIp + serveurPort + info, true);
	xhr.send(null);

	// create a timer to abord connection if request not receive in 5s
	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}

//Post a shot and transmit to callback information of POI and ball position
function postShot(userLT, userLG, ballLT, ballLG, gamerId, callback){
	// create an object able to communicate in http request
	var xhr = getXMLHttpRequest();

	// on state change event handler
	xhr.onreadystatechange = function() {
		// if request finish, response ready and server response code Ressource created
		if (xhr.readyState == 4 && xhr.status == 201) {
			// stop the timer timeout
			clearTimeout(xmlHttpTimeout); 
			callback(JSON.parse(xhr.responseText));
		}
		// if request finish, response ready and server response code Unauthorized
		else if (xhr.readyState == 4 && xhr.status == 401) {
			// stop the timer timeout
			clearTimeout(xmlHttpTimeout); 
			alert("Your gamer ID is not correct, please reset the game (your session will be lost)");
		}
	};

	xhr.open("POST", serveurIp + serveurPort + "shot", true);
	xhr.setRequestHeader("Content-Type", "application/json");

	// create JSON information for the server
	var data = {
			"userLt":userLT,
			"userLg":userLG,
			"ballLt":ballLT,
			"ballLg":ballLG,
			"token":gamerId
		};
	xhr.send(JSON.stringify(data));

	// create a timer to abord connection if request not receive in 5s
	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}

//Post a request to delete the current game
function requestDeleteToken(gamerId){
	// create an object able to communicate in http request
	var xhr = getXMLHttpRequest();

	// on state change event handler
	xhr.onreadystatechange = function() {
		// if request finish, response ready and server response code Request OK and No content send
		if (xhr.readyState == 4 && xhr.status == 204) {
			// stop the timer timeout
			clearTimeout(xmlHttpTimeout); 
			alert("Reset done");
		}
	};

	xhr.open("DELETE", serveurIp + serveurPort + "eraseid", true);
	xhr.setRequestHeader("Content-Type", "application/json");

	// create JSON information for the server
	var data = {
			"token":gamerId,
		};
	xhr.send(JSON.stringify(data));

	// create a timer to abord connection if request not receive in 5s
	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}