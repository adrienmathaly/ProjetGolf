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
			callback(JSON.parse(xhr.responseText));
		}
	};
	
	xhr.open("GET", serveurIp + serveurPort + "token", true);
	xhr.send(null);
}

//Get information in JSON with nearest town, long, lat and list of POI
function getNearestPOI(latitute, longitude, callback){
	//Create a connection
	var xhr = getXMLHttpRequest();
	xhr.onreadystatechange = function() {
		if (xhr.readyState == 4 && (xhr.status == 200 || xhr.status == 0)) {
			callback(JSON.parse(xhr.responseText));
		}
	};
	var data = "?lg=" + longitude + "&lt=" + latitute;
	
	xhr.open("GET", serveurIp + serveurPort + "poi/nearest" + data, true);
	xhr.send(null);
}

//Ask for an ID
/*function postShot(userLT, userLG, ballLT, ballLG, id){
	xhr.open("POST", "172.131.191:8081/shot", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(
		{
			'userLT':userLT,
			'userLG':userLG,
			'ballLT':ballLT,
			'ballLG':ballLG,
			'id':id,
		}
	);
}*/