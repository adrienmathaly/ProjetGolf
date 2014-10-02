//VARIABLES DE CONNEXION
var connected = 0;
var ip_Server_navbar = null;
var connected_users = 0;
var JSON_response = null;
var timer;


//MAPPING VARIABLES
var my_map;
var marker_array = [];


//VARIABLES DE REQUETAGE
var number_users = "/users/number";
var location_users = "/users/location";
var distance_travelled = "/users/distance_ball";
var amount_of_users = "/amountOfUsers";


//FONCTION DE REQUETAGE GET
function HttpGET(request)
{
	//SECURITE DU FORMAT DE L'ADRESSE
	if ($("#ipServer").val() == null)
		window.alert("Adresse vide");
	else
	{
		//VARIABLES CREATION AND INITIALIZATION 
		var URI = "http://"+$("#ipServer").val()+request;
		var xmlHttp = new XMLHttpRequest();

		//CONNECTION OPENING
		xmlHttp.open("GET",URI, true);
		xmlHttp.setRequestHeader("Origin", "*");

		//FUNCTION PREPARATION
		xmlHttp.onreadystatechange = function()
			{
				if ((xmlHttp.status == 200 || xmlHttp.status == 0))
				{
					show_response_on_textarea(xmlHttp.responseText);
				}
				else
					console.log("Connection failed");
			}

		//REQUEST SENDING AND ANALYSING
		console.log("URI : "+URI);
		xmlHttp.send();
	}
}

function show_response_on_textarea(response)
{
	if (response != "")
		document.getElementById("textarea_submit").innerHTML = response;
}


function initialiser()
{
	var latlng = new google.maps.LatLng(42.686400, 2.887967);
	
	var options = {
		center: latlng,
		zoom: 2,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};
	  
	my_map = new google.maps.Map(document.getElementById("my_map"), options);
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
		document.getElementById('button_submit').disabled = false;

		//STOP THE TIMER
		clearInterval(timer);
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
			document.getElementById('button_submit').disabled = true;

			//START THE TIMER
			timer = setInterval( function() {HttpGET(amount_of_users)}, 500);
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

function clean_table(table)
{
	var length = table.rows.length;

	if (length > 1)
	{
		for (var j=1;j<length;j++)
		{
			table.deleteRow(1);
		}
	}
}

function submit()
{
	//VARIABLES INITIALIZATION
	var parsed_JSON_objet;
	var my_table;
	var i;

	//ASSIGNATION
	my_table = document.getElementById("table_infos");
	parsed_JSON_objet = eval("(" + $("#textarea_submit").val() + ")");

	
	/*var amountOfUserObjet = { amountOfUser : 5 };
	console.log(amountOfUserObjet["amountOfUser"]);*/

	clean_table(my_table);
	delete_all_markers();

	i = 0;
	parsed_JSON_objet.forEach(function(row)
	{
		//LOCAL VARIABLES
		var new_row;
		var cell_user, cell_lat, cell_lng;
		var marker;
		var lat;
		var lng;

		//CREATE A NEW ROW
		new_row = my_table.insertRow(i+1);

		//CREATE NEW CELLS
		cell_user = new_row.insertCell(0);
		cell_lat = new_row.insertCell(1);
		cell_lng = new_row.insertCell(2);

		//INSERT VALUES
		//cell_user.innerHTML = row["idToken"];
		cell_user.innerHTML = "Anonymous#"+(i+1);
		cell_lat.innerHTML = parseFloat(row["lt"]).toFixed(3);
		cell_lng.innerHTML = parseFloat(row["lg"]).toFixed(3);

		//INSERT A MARKER FOR EACH USER
		lat = cell_lat.innerHTML;
		lng = cell_lng.innerHTML;
		add_marker(lat,lng);

		i++;
	});

	connected_users = i;
	document.getElementById("total_users").innerHTML = "Users (" + connected_users + ")";

	//resize_map(my_table);
}

function add_marker(_lat,_lng)
{
	//CREATE A NEW MARKER
		marker = new google.maps.Marker({
    		position: new google.maps.LatLng(_lat,_lng),
    		map: my_map
		});

	marker_array.push(marker);
	marker.setMap(my_map);
}

function delete_all_markers()
{
	for (var i=0;i<marker_array.length;i++)
		marker_array[0].setMap(null);
}

function resize_map(table)
{
	//IF THE TABLE IS COMPLETED BY DATA
	if (table.rows.length > 1)
	{
		//LOCAL VARIABLES
		var sum_lat = 0;
		var sum_lng = 0;
		var average_lat = 0;
		var average_lng = 0;

		for (var j=1;j<table.rows.length;j++)
		{
			sum_lat += parseFloat(table.rows[j].cells[1].innerHTML);
			sum_lng += parseFloat(table.rows[j].cells[2].innerHTML);
		}

		average_lat = sum_lat / connected_users;
		average_lng = sum_lng / connected_users;

		//CENTER THE MAP ON THE GOOD COORDINATES
		my_map.setCenter(new google.maps.LatLng(average_lat,average_lng));

		//REZOOM
		my_map.setZoom(6);
	}
}
