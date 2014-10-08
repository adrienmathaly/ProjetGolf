//VARIABLES
var connected = 0;			//Contents the status of the connection between user and server
var timer;					//Timer managing the GET request
var JSON_request;			//Contents the response of the server in JSON


//FUNCTION SENDING THE HTTP REQUEST
function HttpGET(request)
{
	//Security address
	if ($("#ipServer").val() == null)
	{
		//Informs the user about the input error
		window.alert("empty address");	
	}
	else
	{
		//LOCAL VARIABLES
		var URI = "http://"+$("#ipServer").val() + request;			//Contents all the URI sent to the server
		var xmlHttp = new XMLHttpRequest();							//new XMLHttpRequest instantiated

		//Open the connexion
		xmlHttp.open("GET",URI, true);


		//Sending preparation
		xmlHttp.onreadystatechange = function()
		{
			//If the server is ok
			if ((xmlHttp.status == 200 || xmlHttp.status == 0))
			{
				//Change the connection status
				connected = 1;

				//If the response isn't null and the request in parameter is /all
				if (xmlHttp.responseText != "" && request == "/all")
				{
					JSON_request = xmlHttp.responseText;
					//document.getElementById("textarea_submit").value = JSON_request;
				}
			}
		}

		//Send the request
		xmlHttp.send();

		//Response submit (format JSON)
		submit_response();
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