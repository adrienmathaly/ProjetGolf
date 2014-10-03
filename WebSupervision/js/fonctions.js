//VARIABLES DE CONNEXION
var connected = 0;
var ip_Server_navbar = null;
var connected_users = 0;
var JSON_response = null;
var timer;


//MAPPING VARIABLES
var my_map;
var my_table;
var marker_array = [];
var lat_array = [];
var lng_array = [];


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
		zoom: 10,
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
		var user_info;

		//CREATE A NEW ROW
		new_row = my_table.insertRow(i+1);

		//CREATE NEW CELLS
		cell_user = new_row.insertCell(0);
		cell_lat = new_row.insertCell(1);
		cell_lng = new_row.insertCell(2);
		cell_dist = new_row.insertCell(3);

		//INSERT VALUES
		cell_user.innerHTML = "Anonymous#"+(i+1);
		cell_lat.innerHTML = parseFloat(row["lt"]).toFixed(5);
		cell_lng.innerHTML = parseFloat(row["lg"]).toFixed(5);
		cell_dist.innerHTML = parseFloat(row["dist"]).toFixed(0);

		//INSERT A MARKER FOR EACH USER
		user_info = cell_user.innerHTML + " (" + cell_dist.innerHTML + ")";
		add_marker(cell_lat.innerHTML,cell_lng.innerHTML,user_info);

		//INCREMENTE THE ROW 
		i++;
	});

	connected_users = i;
	document.getElementById("total_users").innerHTML = "Users (" + connected_users + ")";

	//resize_map();
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
	var table = my_table;
	var min_lat, max_lat, min_lng, max_lng;
	var center_lat, center_lng;
	var distance_lat,distance_lng;

	//IF THE TABLE IS COMPLETED BY DATA
	if (table.rows.length > 1)
	{
		//ARRAY LAT ET LNG INSERTION
		for (var j=1;j<table.rows.length;j++)
		{
			lat_array.push(parseFloat(table.rows[j].cells[1].innerHTML));
			lng_array.push(parseFloat(table.rows[j].cells[2].innerHTML));
		}	

		min_lat = min(lat_array);
		max_lat = max(lat_array);
		min_lng = min(lng_array);
		max_lng = max(lng_array);

		distance_lat = max(lat_array) - min(lat_array);
		distance_lng = max(lng_array) - min(lng_array);

		center_lat = (min_lat + max_lat)/2
		center_lng = (min_lng + max_lng)/2

		//CENTER THE MAP ON THE GOOD COORDINATES
		console.log("Center : (" + center_lat + ":" + center_lng + ")");
		console.log("Distance lat : " + distance_lat);
		console.log("Distance lng : " + distance_lng);

		my_map.setCenter(new google.maps.LatLng(center_lat,center_lng));

		//REZOOM
		var array_distance = [distance_lat,distance_lng];
		var max_distance = parseFloat(max(array_distance)).toFixed(5);

		console.log("max distance : " + max_distance);
		my_map.setZoom(choose_zoom(max_distance));
	}
}

function choose_zoom(d)
{
	if 			(d >= 180)				return 1;
	else if 	(d >= 91 && d < 180 )	return 2;
	else if 	(d >= 49 && d < 90 )	return 3;	
	else if 	(d >= 24 && d < 48 )	return 4;
	else if 	(d >= 13 && d < 23 )	return 5;
	else if 	(d >= 6 && d < 12 )		return 6;
	else if 	(d >= 3 && d < 5 )		return 7;
	else if 	(d >= 2 )				return 8;
	else if 	(d >= 1 )				return 9;
	else if 	(d >= 0.5 )				return 10;	
	else if 	(d >= 0.2 )				return 11;	
	else if 	(d >= 0.1 )				return 12;	
	else if 	(d >= 0.05 )			return 13;	
	else if 	(d >= 0.01 )			return 16;	
	else if 	(d >= 0.005 )			return 17;
	else if 	(d >= 0.001 )			return 19;
	else if 	(d >= 0.0005 )			return 20;
	else if 	(d >= 0.0001 )			return 21;
}

function min(array)
{
	var minimum;

	if (array.length > 0)
	{
		minimum = array[0];

		for (var i=1;i<array.length;i++)
		{
			if (array[i] < minimum)
				minimum = array[i];
		}
	}
	else
		return array[0];

	return minimum;
}

function max(array)
{
	var maximum;

	if (array.length > 0)
	{
		maximum = array[0];

		for (var i=1;i<array.length;i++)
		{
			if (array[i] > maximum)
				maximum = array[i];
		}
	}
	else
		return array[0];

	return maximum;
}

function hide_or_show()
{
 	var textarea=document.getElementById('textarea_submit');

  	if(textarea.style.display == "none")
  	{
    	textarea.style.display = "block";
    	//textarea.readOnly=true;
    	//textarea.className ='show';
  	}
  	else
  	{
    	textarea.style.display = "none";
    	//textarea.className ='hide';
 	}
}