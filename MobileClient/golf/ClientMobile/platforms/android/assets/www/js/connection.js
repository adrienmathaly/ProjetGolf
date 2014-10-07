var serveurIp = 'http://172.31.1.191';
var serveurPort = ':8081/';

//Create a HTMLREQUEST object
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


//Ask for an ID
function getIDConnection(callback){
	//Create a connection
	var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			clearTimeout(xmlHttpTimeout); 
			callback(JSON.parse(xhr.responseText));
		}
	};
	
	xhr.open("GET", serveurIp + serveurPort + "token", true);
	xhr.send(null);

	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}

//Post a shot and receive info POI and ball position
function postShot(userLT, userLG, ballLT, ballLG, gamerId, callback){
	//Create a connection
	var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 201 || xhr.status == 0)) {
			clearTimeout(xmlHttpTimeout); 
			callback(JSON.parse(xhr.responseText));
		}
		else if (xhr.readyState == 4 && xhr.status == 401) {
			clearTimeout(xmlHttpTimeout); 
			alert("Your gamer ID is not correct, please to delete golfChallengeSettings.txt (your session will be lost)");
		}
	};
	xhr.open("POST", serveurIp + serveurPort + "shot", true);
	xhr.setRequestHeader("Content-Type", "application/json");

	var data = {
			"userLt":userLT,
			"userLg":userLG,
			"ballLt":ballLT,
			"ballLg":ballLG,
			"token":gamerId
		};
	xhr.send(JSON.stringify(data));

	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}

function resetGame(){
	alert('test');
	requestDeleteToken(gameID);
}

//Post a shot and receive info POI and ball position
function requestDeleteToken(gamerId){
	//Create a connection
	var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && xhr.status == 204) {
			clearTimeout(xmlHttpTimeout); 
			alert("Reset done");
		}
	};
	xhr.open("DELETE", serveurIp + serveurPort + "eraseid", true);
	xhr.setRequestHeader("Content-Type", "application/json");

	var data = {
			"token":gamerId,
		};

	xhr.send(JSON.stringify(data));

	var xmlHttpTimeout=setTimeout(function(){
												xhr.abort();
												alert("Request timed out");
											} 
											, 5000);
}