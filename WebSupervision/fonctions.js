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
		xmlHttp.open("GET","http://"+$("#ipServer").val()+request, true);
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


function parse(jsontxt){
		var obj = jQuery.parseJSON(jsontxt);
		if(obj.name!="posxy"){
			if(obj.name=="gyro"){
				obj.value=((parseInt(obj.value)%360));
				gyro=obj.value;
				obj.value=obj.value;
			}
			$("#"+obj.name).html(obj.value);
		}else{
			var coords = obj.value.split(":"); 
			x=parseInt(coords[1])/2;
			y=parseInt(coords[0])/2;
		}
	};

function submit()
{
	//VARIABLES INITIALIZATION
	var JSON_string;
	var JSON_objet;
	var my_table;

	//ASSIGNATION
	my_table = document.getElementById("table_infos");

	/*var amountOfUserObjet = { amountOfUser : 5 };
	console.log(amountOfUserObjet["amountOfUser"]);*/

	parsed_JSON_objet = eval("(" + $("#textarea_submit").val() + ")"); // String json to json format
	//console.log(parsed_JSON_objet);
	//console.log(parsed_JSON_objet[1]);

	var i = 0;
	parsed_JSON_objet.forEach(function(row)
	{
		//CREATE A NEW ROW
		var new_row = my_table.insertRow(i+1);

		//CREATE NEW CELLS
		var cell_user = new_row.insertCell(0);
		var cell_lat = new_row.insertCell(1);
		var cell_lng = new_row.insertCell(2);

		//INSERT VALUES
		cell_user.innerHTML = row["idToken"];
		cell_lat.innerHTML = row["lt"];
		cell_lng.innerHTML = row["lg"];

		i++;
	});

	document.getElementById("total_users").innerHTML = "Users (" + i + ")";
}