//VARIABLES DE CONNEXION
var connected = 0;
var refresh_frequency = 2000;

//VARIABLES JSON REQUESTS
var timer;
var JSON_request;

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
		//xmlHttp.setRequestHeader("Origin", "172.31.1.49");


		//FUNCTION PREPARATION
		xmlHttp.onreadystatechange = function()
		{
			if ((xmlHttp.status == 200 || xmlHttp.status == 0))
			{
				connected = 1;

				if (xmlHttp.responseText != "" && request == "/all")
				{
					JSON_request = xmlHttp.responseText;
					//document.getElementById("textarea_submit").value = JSON_request;
				}
			}
		}

		xmlHttp.send();
		submit_response();
	}
}

function analyze_refresh()
{
	var refresh = document.getElementById("refresh_value").value;

	if (refresh >= 200 && refresh <= 10000)
	{
		//alert("pop");
		//$('#refresh_value_form').removeClass("has-error");
		$('#refresh_value_form').addClass("has-success");
	}
	else
	{
		$('#refresh_value_form').removeClass("has-success");
		//$('#refresh_value_form').addClass("has-error");
	}
}

function analyze_position()
{
	var position = document.getElementById("home_position_value").value;
	
	if (position == "")
	{
		$('#home_position_form').removeClass("has-success");
		$('#home_position_form').removeClass("has-error");	
	}
	else
	{
		var arrayOfCoordinates = position.split("/");

		if (arrayOfCoordinates.length != 2)
		{
			$('#home_position_form').removeClass("has-success");
			$('#home_position_form').addClass("has-error");	
		}
		else
		{
			var latitude = arrayOfCoordinates[0];
			var longitude = arrayOfCoordinates[1];
			
			if (latitude > 90 || latitude < -90)
			{
				$('#home_position_form').removeClass("has-success");
				$('#home_position_form').addClass("has-error");	
			}
			else
			{
				if (longitude > 180 || longitude < -180)
				{
					$('#home_position_form').removeClass("has-success");
					$('#home_position_form').addClass("has-error");	
				}

				else
				{
					$('#home_position_form').removeClass("has-error");
					$('#home_position_form').addClass("has-success");
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
		timer = setInterval( function() {HttpGET("/all")},refresh_frequency);

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
		document.getElementById("stats_best_distance").value = parse_JSON_request["bestDistance"];

		var i = 0;
		parse_JSON_request["usersDetails"].forEach(function(JSON_row)
		{
			//ADD A MARKER WITH THE EXACT POSITION
			var lat_user = JSON_row["lat"];
			var lng_user = JSON_row["lng"];
			var dist_user = JSON_row["distance"];
			var alive = JSON_row["alive"];

			var content_title =
			"Details user : \nLatitude : " + lat_user
			+ "\nLongitude : "	+ lng_user
			+ "\nDistance travelled : " + dist_user
			+ "\nConnected : " + alive;

			if (alive == "true")	add_marker(lat_user,lng_user,content_title,"logos/location-icon.png");
			else					add_marker(lat_user,lng_user,content_title,"logos/dead-icon.png");

			//CREATE ROW AND CELLS WITH ROUNDED VALUES
			var row = my_table.insertRow(i+1);
			var cell_user = row.insertCell(0);
			var cell_lat = row.insertCell(1);
			var cell_lng = row.insertCell(2);
			var cell_dist = row.insertCell(3);

			//INSERT ROUNDED VALUES
			cell_user.innerHTML = "Anonymous#"+(i+1);
			cell_lat.innerHTML = parseFloat(JSON_row["lat"]).toFixed(5);
			cell_lng.innerHTML = parseFloat(JSON_row["lng"]).toFixed(5);
			cell_dist.innerHTML = parseFloat(JSON_row["distance"]).toFixed(2);
			i++;
		});
	}
}