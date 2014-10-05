//VARIABLES DE CONNEXION
var connected = 0;
var waiting_mode = 0;
var refresh_frequency = 500;

//VARIABLES JSON REQUESTS
var timer_amount;
var timer_totalDistances;
var timer_lastKnownLocations;
var timer_numberOfConnected;

var JSON_amount;
var JSON_totalDistances;
var JSON_lastKnownLocations;
var JSON_numberOfConnected;

//MAPPING VARIABLES
var my_map;
var my_table;
var marker_array = [];
var lat_array = [];
var lng_array = [];
var lat_home = 42.674564;
var lng_home = 2.847732;


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


		//BOOLEAN FOR THE CONNECTION
		if (xmlHttp.status == 200)
			connected = 1;
		else
			connected = 0;

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

						if (request == "/numberOfConnected")
						{
							JSON_numberOfConnected = xmlHttp.responseText;
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
	var latlng = new google.maps.LatLng(lat_home, lng_home);

	var options = {
		center: latlng,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	my_map = new google.maps.Map(document.getElementById("my_map"), options);
}

function refresh_parameters()
{
	var refresh_frequency_value = document.getElementById("refresh_value").value;
	var refresh_home_position_value = document.getElementById("refresh_home_position").value;

	if (refresh_frequency_value > 0)
	{
		refresh_frequency = value;
		$('#parameters_modal').modal('hide');
	}

	if (refresh_home_position_value != "")
	{
		var arrayOfCoordinates = refresh_home_position_value.split("/");

		if (arrayOfCoordinates.length != 2)
		{
			alert("Invalid coordinates");			
		}
		else
		{
			var latitude = arrayOfCoordinates[0];
			var longitude = arrayOfCoordinates[1];
			
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
					lat_home = latitude;
					lng_home = longitude;
					$('#parameters_modal').modal('hide');
				}
			}
		}
	}
}

function clearIntervals()
{
	clearInterval(timer_amount);
	clearInterval(timer_totalDistances);
	clearInterval(timer_lastKnownLocations);
	clearInterval(timer_numberOfConnected);
}

function setIntervals()
{
	timer_amount = setInterval( function() {HttpGET("/amountOfUsers")}, refresh_frequency);;
	timer_totalDistances  = setInterval( function() {HttpGET("/totalDistances")}, refresh_frequency);;
	timer_lastKnownLocations = setInterval( function() {HttpGET("/users/lastKnownLocations")}, refresh_frequency);
	timer_numberOfConnected = setInterval( function() {HttpGET("/numberOfConnected")}, refresh_frequency);
}

//FONCTIONS DE CONNEXION / DECONNEXION
function connect_to_server()
{
	//IF SERVER NOT CONNECTED OR IN WAITING-MODE	
	if (connected == 0)
	{
		//IF WAITING MODE IS ON
		if (waiting_mode == 1)
		{
			waiting_mode = 0;
			$("#connect").removeClass("btn-warning");
			$("#connect").addClass("btn-danger");
			$("#connect").html("Disconnected");
			document.getElementById('ipServer').disabled = false;

			//STOP TIMER EXECUTION
			clearIntervals();
		}
		else if (waiting_mode == 0)
		{
			waiting_mode = 1;
			$("#connect").removeClass("btn-info");
			$("#connect").removeClass("btn-danger");
			$("#connect").addClass("btn-warning");
			$("#connect").html("Waiting ...");
			document.getElementById('ipServer').disabled = true;

			//TEST STATUS OF THE CONNECTION
			timer_amount = setInterval( function() {HttpGET("/amountOfUsers")}, refresh_frequency);

			//IF SERVER CONNECTED
			if (connected == 1)
			{
				//STOP THE WAITING MODE
				waiting_mode = 0;

				//START THE REQUESTS
				setIntervals();

				//CHANGE BUTTON CLASS
				$("#connect").removeClass("btn-warning");
				$("#connect").removeClass("btn-danger");
				$("#connect").addClass("btn-info");
				$("#connect").html("Connected");
				document.getElementById('ipServer').disabled = true;
			}
		}
	}
	else if (connected == 1)
	{
		waiting_mode = 0;
		$("#connect").removeClass("btn-info");
		$("#connect").addClass("btn-danger");
		$("#connect").html("Disconnected");
		document.getElementById('ipServer').disabled = false;

		clearIntervals();
	}
	//console.log("Connected : " + connected + "; Waiting : " + waiting_mode);
}


function submit_response()
{	
	//CLEAN THE OLD TABLE AND DELETE OLD MARKERS ON THE MAP
	clean_table(my_table);
	delete_all_markers();

	//AMOUNT OF USERS
	var parse_JSON_amount = eval("(" + JSON_amount + ")");
	if (parse_JSON_amount != undefined)
		document.getElementById("stats_amount").value = parse_JSON_amount["amount"];

	//TOTAL DISTANCES
	var parse_JSON_totalDistances = eval("(" + JSON_totalDistances + ")");
	if (parse_JSON_totalDistances != undefined)
		document.getElementById("stats_distances").value = parse_JSON_totalDistances["totalDist"];

	//NUMBER OF CONNECTED
	var parse_JSON_numberOfConnected = eval("(" +JSON_numberOfConnected + ")");
	if (parse_JSON_numberOfConnected != undefined)
	{
		var value = parse_JSON_numberOfConnected["nbConnected"];
		document.getElementById("stats_users_connected").value = value;
		document.getElementById("badge_connected_users").value = value;
	}


	//LAST KNOWN LOCATIONS
	var parse_JSON_lastKnownLocations = eval("(" +JSON_lastKnownLocations + ")");
	//console.log(JSON_lastKnownLocations);


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
