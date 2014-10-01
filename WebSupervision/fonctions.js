//VARIABLES DE CONNEXION
var connected = 0;

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
					parse(xmlHttp.responseText);
				}
			}
		xmlHttp.send();
	}
}

//PARSING DU RESULTAT DES REQUETES
function parse(response)
{
}

function initialiser()
{
	var latlng = new google.maps.LatLng(42.674520, 2.847786);
	
	var options = {
		center: latlng,
		zoom: 16,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	  
	var carte = new google.maps.Map(document.getElementById("carte"), options);
}

//FONCTIONS DE CONNEXION / DECONNEXION
function connect_to_server()
{
    if(connected == 1)
    {
 		disconnect_to_server();
	}
	else
	{
		connected = 1;
		$("#connect").removeClass("btn-info");
		$("#connect").addClass("btn-danger");
		$("#connect").html("Disconnection");
	}
}

function disconnect_to_server()
{
	connected = 0;
	$("#connect").removeClass("btn-danger");
	$("#connect").addClass("btn-info");
	$("#connect").html("Connection");
}

function search_position()
{
	//VARIABLES
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
					//SEARCH AND RELOCALIZE
					alert("Valid coordinates");


				}
			}
		}
	}

	

}