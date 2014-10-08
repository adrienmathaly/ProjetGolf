//VARIABLES
var connected = 0;			//Contents the status of the connection between user and server
var timer;					//Timer managing the GET request
var JSON_request;			//Contents the response of the server in JSON


//FUNCTION SENDING THE HTTP REQUEST
/**
	* @desc Sending the Http Request
	* @param string  request - the Get command
	* @return none
*/
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


/**
	* @desc Start the connection to the server (with address:port)
	* @param none
	* @return none
*/
function connect_to_server()
{
	//If the connection status is done
	if (connected == 1)
	{
		//Disconnect
		connected = 0;

		//Stop the timer
		clearInterval(timer);

		//Change the button class
		$("#connect").removeClass("btn-info");
		$("#connect").addClass("btn-danger");
		$("#connect").html("Disconnected");

		//Give the possibility to change the address
		document.getElementById('ipServer').disabled = false;
	}
	else
	{
		//Connect
		connected = 1;

		//Start the timer
		timer = setInterval( function() {HttpGET("/all")},refresh_frequency);

		//Change the button class
		$("#connect").removeClass("btn-danger");
		$("#connect").addClass("btn-info");
		$("#connect").html("Connected");

		//Don't give the possibility to change the address
		document.getElementById('ipServer').disabled = true;
	}
}

/**
	* @desc Submit the response to the JSON parser
	* @param none
	* @return none
*/
function submit_response()
{	
	//Clean the old table
	clean_table(my_table);

	//Delete all amrkers except home
	delete_all_markers();

	//Evaluate the JSON request
	var parse_JSON_request = eval("(" + JSON_request + ")");

	//If the parsing is not empty
	if (parse_JSON_request != undefined)
	{
		//Unique information adding
		document.getElementById("stats_amount").value = parse_JSON_request["amountOfUsers"];
		document.getElementById("stats_distances").value = (parse_JSON_request["totalDistances"] * 93.27);
		document.getElementById("stats_users_connected").value = parse_JSON_request["nbConnected"];
		document.getElementById("stats_best_distance").value = (parse_JSON_request["bestDistance"] * 93.27);

		//Reading each row of the table
		var i = 0;
		parse_JSON_request["usersDetails"].forEach(function(JSON_row)
		{
			//Insert into global variables the differents values
			var lat_user = JSON_row["lat"];
			var lng_user = JSON_row["lng"];
			var dist_user = JSON_row["distance"] * 93.27;
			var alive = JSON_row["alive"];

			//Create a content which summarize all details
			var content_title =
			"Details user : \nLatitude : " + lat_user
			+ "\nLongitude : "	+ lng_user
			+ "\nDistance traveled : " + dist_user
			+ "\nConnected : " + alive;

			//Change the marker logo depending on its "alive" status
			if (alive == "true")	add_marker(lat_user,lng_user,content_title,"logos/location-icon.png");
			else					add_marker(lat_user,lng_user,content_title,"logos/dead-icon.png");

			//Create a new row in the table
			var row = my_table.insertRow(i+1);

			//Create all the cells in this row
			var cell_user = row.insertCell(0);
			var cell_lat = row.insertCell(1);
			var cell_lng = row.insertCell(2);
			var cell_dist = row.insertCell(3);

			//Insert all details in the cells (with rounded values)
			cell_user.innerHTML = "#"+(i+1);
			cell_lat.innerHTML = parseFloat(JSON_row["lat"]).toFixed(5);
			cell_lng.innerHTML = parseFloat(JSON_row["lng"]).toFixed(5);
			cell_dist.innerHTML = parseFloat(JSON_row["distance"]).toFixed(2);

			//Increment the row
			i++;
		});
	}
}