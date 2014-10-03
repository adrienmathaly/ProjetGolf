//VARIABLES DE CONNEXION
var connected = 0;
var refresh_frequency = 500;

//VARIABLES JSON REQUESTS
var timer_amount;
var timer_totalDistances;
var timer_lastKnownLocations;

var JSON_amount;
var JSON_totalDistances;
var JSON_lastKnownLocations;

//MAPPING VARIABLES
var my_map;
var my_table;
var marker_array = [];
var lat_array = [];
var lng_array = [];


//FONCTION DE REQUETAGE GET
function HttpGET(request)
{
	//SECURITE DU FORMAT DE L'ADRESSE
	if ($("#ipServer").val() == null)
		window.alert("Adresse vide");
	else
	{
		//VARIABLES CREATION AND INITIALIZATION 
		var URI = "http://"+$("#ipServer").val() + request;
		var xmlHttp = new XMLHttpRequest();

		//CONNECTION OPENING
		xmlHttp.open("GET",URI, true);
		xmlHttp.setRequestHeader("Origin", "*");

		//FUNCTION PREPARATION
		xmlHttp.onreadystatechange = function()
			{
				if ((xmlHttp.status == 200 || xmlHttp.status == 0))
				{
					if (xmlHttp.responseText != "")
					{
						if (request == "/amountOfUsers")
						{
							JSON_amount = xmlHttp.responseText;
						}

						if (request == "/totalDistances")
						{
							JSON_totalDistances = xmlHttp.responseText;
						}

						if (request == "/users/lastKnownLocations")
						{
							JSON_lastKnownLocations = xmlHttp.responseText;
						}
					}
				}
				else
					console.log("Connection failed");
			}
		xmlHttp.send();
		submit_response();
	}
}

function initialiser()
{
	var latlng = new google.maps.LatLng(42.686400, 2.887967);

	var options = {
		center: latlng,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	my_map = new google.maps.Map(document.getElementById("my_map"), options);
}

function refresh_parameters()
{
	var value = document.getElementById("refresh_value").value;

	if (value > 0)
	{
		refresh_frequency = value;
		$('#parameters_modal').modal('hide');
	}
}

//FONCTIONS DE CONNEXION / DECONNEXION
function connect_to_server()
{
    if(connected == 1)
    {
 		connected = 0;
		$("#connect").removeClass("btn-danger");
		$("#connect").addClass("btn-info");
		$("#connect").html("Connect");
		document.getElementById('ipServer').disabled = false;

		clearInterval(timer_amount);
		clearInterval(timer_totalDistances);
		clearInterval(timer_lastKnownLocations);
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
			$("#connect").html("Disconnect");
			document.getElementById('ipServer').disabled = true;

			timer_amount = setInterval( function() {HttpGET("/amountOfUsers")}, refresh_frequency);;
			timer_totalDistances  = setInterval( function() {HttpGET("/totalDistances")}, refresh_frequency);;
			timer_lastKnownLocations = setInterval( function() {HttpGET("/users/lastKnownLocations")}, refresh_frequency);
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


function submit_response()
{	
	//CLEAN THE OLD TABLE AND DELETE OLD MARKERS ON THE MAP
	clean_table(my_table);
	delete_all_markers();


	//AMOUNT OF USERS
	var parse_JSON_amount = eval("(" + JSON_amount + ")");
	if (parse_JSON_amount != undefined)
		document.getElementById("total_users").innerHTML = "Users (" + parse_JSON_amount["amount"] + ")";


	//TOTAL DISTANCES
	var parse_JSON_totalDistances = eval("(" + JSON_totalDistances + ")");
	if (parse_JSON_totalDistances != undefined)
		document.getElementById("total_distances").innerHTML = "Distances (" + parse_JSON_totalDistances["totalDist"] + ")";

	
	//LAST KNOWN LOCATIONS
	var parse_JSON_lastKnownLocations = eval("(" +JSON_lastKnownLocations + ")");
		console.log(JSON_lastKnownLocations);

	//-------------------------------------------------------------------------------------
	//-----------------------------------OLD FUNCTION--------------------------------------

	//VARIABMES
	/*var parsed_JSON_objet;

	my_table = document.getElementById("table_infos");
	parsed_JSON_objet = eval("(" + $("#textarea_submit").val() + ")");

	var i = 0;
	parsed_JSON_objet.forEach(function(row)
	{
		//AMOUNT USERS
		document.getElementById("total_users").innerHTML = "Users (" + row["amount"] + ")";

		//INSERT ROW AND CELLS
		var new_row = my_table.insertRow(i+1)
		var cell_user = new_row.insertCell(0);
		var cell_lat = new_row.insertCell(1);
		var cell_lng = new_row.insertCell(2);
		var cell_dist = new_row.insertCell(3);

		//INDICATE CELLS CONTENTS
		cell_user.innerHTML = "Anonymous#"+(i+1);
		cell_lat.innerHTML = parseFloat(row["lt"]).toFixed(5);
		cell_lng.innerHTML = parseFloat(row["lg"]).toFixed(5);
		cell_dist.innerHTML = parseFloat(row["dist"]).toFixed(0);

		//INSERT A MARKER FOR EACH USER
		var user_info = cell_user.innerHTML + " (" + cell_dist.innerHTML + ")";
		add_marker(cell_lat.innerHTML,cell_lng.innerHTML,user_info);

		i++;
	});*/

	//-------------------------------------------------------------------------------------
	//-------------------------------------------------------------------------------------
}


function add_marker(_lat,_lng,_name)
{
	//CREATE A NEW MARKER
		marker = new google.maps.Marker({
    		position : new google.maps.LatLng(_lat,_lng),
    		map : my_map,
    		//animation: google.maps.Animation.DROP,
    		icon: "logos/location-icon.png",
    		title : _name
		});

	marker_array.push(marker);
	marker.setMap(my_map);
}


function delete_all_markers()
{
	for (var i=0;i<marker_array.length;i++)
		marker_array[i].setMap(null);
}


function resize_map()
{
	var min_lat, max_lat, min_lng, max_lng;
	var center_lat, center_lng;
	var distance_lat,distance_lng;

	//IF THE TABLE IS COMPLETED BY DATA
	if (my_table.rows.length > 1)
	{
		//ARRAY LAT ET LNG INSERTION
		for (var j=1;j<my_table.rows.length;j++)
		{
			lat_array.push(parseFloat(my_table.rows[j].cells[1].innerHTML));
			lng_array.push(parseFloat(my_table.rows[j].cells[2].innerHTML));
		}	

		var min_lat = min(lat_array);
		var max_lat = max(lat_array);
		var min_lng = min(lng_array);
		var max_lng = max(lng_array);

		var distance_lat = max(lat_array) - min(lat_array);
		var distance_lng = max(lng_array) - min(lng_array);

		var center_lat = (min_lat + max_lat)/2
		var center_lng = (min_lng + max_lng)/2

		my_map.setCenter(new google.maps.LatLng(center_lat,center_lng));

		//REZOOM
		var array_distance = [distance_lat,distance_lng];
		var max_distance = parseFloat(max(array_distance)).toFixed(5);

		my_map.setZoom(choose_zoom(max_distance));
	}
}