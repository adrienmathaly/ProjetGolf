//VARIABLES DE CONNEXION
var connected = 0;
var ip_Server_navbar = null;

//MAPPING VARIABLES
var my_map;

//VARIABLES DE REQUETAGE
var number_users = "/users/number";
var location_users = "/users/location";
var distance_travelled = "/users/distance_ball";

//FONCTION DE REQUETAGE GET
function HttpGET(request)
{
	var xmlHttp = null;

	//SECURITE DU FORMAT DE L'ADRESSE
	if ($("#ipServer").val() == null)
		window.alert("Adresse vide");
	else
	{
		xmlHttp = new XMLHttpRequest();
		xmlHttp.open("GET","http://"+$("#ipServer").val()+cmd, true);
		xmlHttp.onreadystatechange = function()
			{
				if ((xmlHttp.status == 200 || xmlHttp.status == 0))
				{
					alert("Connexion successful");
					parse(xmlHttp.responseText);
				}
			}
		xmlHttp.send();
	}
}

//PARSING DU RESULTAT DES REQUETES
function parse(response)
{
	alert("JSON response : " + response);
}

function initialiser()
{
	var latlng = new google.maps.LatLng(42.686400, 2.887967);
	
	var options = {
		center: latlng,
		zoom: 12,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	  
	my_map = new google.maps.Map(document.getElementById("my_map"), options);
}

//FONCTIONS DE CONNEXION / DECONNEXION
function connect_to_server()
{
	//alert("IP SERVEUR : "+$("#ipServer").val());

    if(connected == 1)
    {
 		connected = 0;
		$("#connect").removeClass("btn-danger");
		$("#connect").addClass("btn-info");
		$("#connect").html("Connection");
		document.getElementById('ipServer').disabled = false;
	}
	else
	{
		if ($("#ipServer").val() == "")
			window.alert("Empty Server adress");
		else
		{
			connected = 1;
			$("#connect").removeClass("btn-info");
			$("#connect").addClass("btn-danger");
			$("#connect").html("Disconnection");
			document.getElementById('ipServer').disabled = true;
		}
	}
}


function search_position()
{
	var latitude = null;		//VERTICAL
	var longitude = null;		//HORIZONTAL
	var LatLng = null;

	//SPLIT
	LatLng = $("#search").val();

	//COORDINATES SECURITY
	if (LatLng == "")
	{
		alert("Empty text area");
	}
	else
	{
		var arrayOfCoordinates = LatLng.split("/");

		if (arrayOfCoordinates.length != 2)
		{
			alert("Invalid coordinates");			
		}
		else
		{
			latitude = arrayOfCoordinates[0];
			longitude = arrayOfCoordinates[1];
			
			if (latitude > 90 || latitude < -90)
			{
				alert("Latitude problem");
			}
			else
			{
				if (longitude > 180 || longitude < -180)
				{
					alert("Longitude problem");
				}
				else
				{
					//CREATE A MARKER FOR THE NEW POINT SEARCHED
					var mark = new google.maps.Marker({
					position: new google.maps.LatLng(latitude, longitude),
					map: my_map
					});

					//POINT THE MAP ON THE NEW MARKER
					my_map.setCenter(new google.maps.LatLng(latitude, longitude));
					my_map.setZoom(15);
				}
			}
		}
	}
}


function go_home()
{
	var latlng_IMERIR = new google.maps.LatLng(42.674520, 2.847786);
	my_map.setCenter(latlng_IMERIR);
	my_map.setZoom(16);
}

function submit()
{
	//VARIABLES INITIALIZATION
	var JSON_string;
	var JSON_objet;

	//ASSIGNATION
	JSON_string = $("#textarea_submit").val();
	JSON_objet = eval("(function(){return " + JSON_string + ";})()");

	//FIRST CELL MODIFICATION
	document.getElementById('total_users').innerHTML = "Users \n ("+JSON_objet.numberOfConnected+")";
}