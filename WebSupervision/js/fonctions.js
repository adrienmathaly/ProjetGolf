//VARIABLES DE CONNEXION
var connected = 0;
var refresh_frequency = 2000;

//VARIABLES JSON REQUESTS
var timer;
var JSON_request;

/*var timer_amount;
var timer_totalDistances;
var timer_lastKnownLocations;
var timer_numberOfConnected;
var timer_travelledDistance;

var JSON_amount;
var JSON_totalDistances;
var JSON_lastKnownLocations;
var JSON_numberOfConnected;
var JSON_travelledDistance;*/

function HttpGET(request)
{
	//ADDRESS SECURITY FORMAT
	if ($("#ipServer").val() == null)
	{
		window.alert("empty address");	
	}
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
					connected = 1;

					if (xmlHttp.responseText != "" && request == "/all")
					{
						JSON_request = xmlHttp.responseText;
						document.getElementById("textarea_submit").value = JSON_request;
					}
				}
				else
				{
					connected = 0;
				}
			}

		xmlHttp.send();
		submit_response();
	}
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


//START THE CONNECTION TO THE SERVER (WITH ADDRESS:PORT)
function connect_to_server()
{
	if (connected == 1)
	{
		connected = 0;
		clearInterval(timer);

		$("#connect").removeClass("btn-info");
		$("#connect").addClass("btn-danger");
		$("#connect").html("Disconnected");
		document.getElementById('ipServer').disabled = false;
	}
	else
	{
		connected = 1;
		setInterval( function() {HttpGET("/all")},refresh_frequency);

		$("#connect").removeClass("btn-danger");
		$("#connect").addClass("btn-info");
		$("#connect").html("Connected");
		document.getElementById('ipServer').disabled = true;
	}
}


function submit_response()
{	
	//CLEAN THE OLD TABLE AND DELETE OLD MARKERS ON THE MAP
	clean_table(my_table);
	delete_all_markers();

	var parse_JSON_request = eval("(" + JSON_request + ")");

	if (parse_JSON_request != undefined)
	{
		document.getElementById("stats_amount").value = parse_JSON_request["amountOfUsers"];
		document.getElementById("stats_distances").value = parse_JSON_request["totalDistances"];
		document.getElementById("stats_users_connected").value = parse_JSON_request["nbConnected"];

		var i = 0;
		parse_JSON_request["usersDetails"].forEach(function(JSON_row)
		{
			//ADD A MARKER WITH THE EXACT POSITION
			var lat_user = JSON_row["lat"];
			var lng_user = JSON_row["lng"];
			var dist_user = JSON_row["distance"];
			add_marker(lat_user,lng_user,dist_user);

			//CREATE ROW AND CELLS WITH ROUNDED VALUES
			var row = my_table.insertRow(i+1);
			var cell_user = row.insertCell(0);
			var cell_lat = row.insertCell(1);
			var cell_lng = row.insertCell(2);
			var cell_dist = row.insertCell(3);

			//INSERT ROUNDED VALUES
			cell_user.innerHTML = "Anonymous#"+(i+1);
			cell_lat.innerHTML = parseFloat(JSON_row["lat"]).toFixed(7);
			cell_lng.innerHTML = parseFloat(JSON_row["lng"]).toFixed(7);
			cell_dist.innerHTML = parseFloat(JSON_row["distqnce"]).toFixed(2);

			i++;
		});

	}


	//AMOUNT OF USERS
	/*var parse_JSON_amount = eval("(" + JSON_amount + ")");
	if (parse_JSON_amount != undefined)
		document.getElementById("stats_amount").value = parse_JSON_amount["amountOfUsers"];

	//TOTAL DISTANCES
	var parse_JSON_totalDistances = eval("(" + JSON_totalDistances + ")");
	if (parse_JSON_totalDistances != undefined)
		document.getElementById("stats_distances").value = parse_JSON_totalDistances["totalDistances"];

	//NUMBER OF CONNECTED
	var parse_JSON_numberOfConnected = eval("(" +JSON_numberOfConnected + ")");
	if (parse_JSON_numberOfConnected != undefined)
	{
		var value = parse_JSON_numberOfConnected["nbConnected"];
		document.getElementById("stats_users_connected").value = value;
	}


	//USERS LAST KNOWN LOCATIONS
	var parse_JSON_lastKnownLocations = eval("(" +JSON_lastKnownLocations + ")");

	if (parse_JSON_lastKnownLocations != undefined)
	{
		var i = 0;
		parse_JSON_lastKnownLocations["lastKnownLocations"].forEach(function(JSON_row)
		{
			//ADD A MARKER WITH THE EXACT POSITION
			var lat_user = JSON_row["lt"];
			var lng_user = JSON_row["lg"];
			add_marker(lat_user,lng_user,"(0)");

			//CREATE ROW AND CELLS WITH ROUNDED VALUES
			var row = my_table.insertRow(i+1);
			var cell_user = row.insertCell(0);
			var cell_lat = row.insertCell(1);
			var cell_lng = row.insertCell(2);
			//var cell_dist = row.insertCell(3);

			//INSERT ROUNDED VALUES
			cell_user.innerHTML = "Anonymous#"+(i+1);
			cell_lat.innerHTML = parseFloat(JSON_row["lt"]).toFixed(7);
			cell_lng.innerHTML = parseFloat(JSON_row["lg"]).toFixed(7);

			i++;
		});
	}


	var parse_JSON_travelledDistances = eval("(" +JSON_travelledDistances + ")");
	if (parse_JSON_travelledDistances != undefined)
	{
		var i = 1;

		parse_JSON_travelledDistances["travelledDistances"].forEach(function(JSON_row)
		{
			var cell_dist = my_table.rows[i].insertCell(3);
			cell_dist.innerHTML = parseFloat(JSON_row["dist"]).toFixed(3);

			i++;
		});
	}*/
}
