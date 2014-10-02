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
			callback(xhr.responseText);
		}
	};
	
	xhr.open("GET", "http://172.31.1.191:8081/token", true);
	xhr.send(null);
}

//Ask for an ID
/*function postShot(userLT, userLG, ballLT, ballLG, id){
	xhr.open("POST", "172.131.191:8081/shot", true);
	xhr.setRequestHeader("Content-Type", "application/json");
	xhr.send(
		{
			'userLT'=userLT,
			'userLG'=userLG,
			'ballLT'=ballLT,
			'ballLG'=ballLG,
			'id'=id,
		}
	);
}*/