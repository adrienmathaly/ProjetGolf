//Variables
var my_map;					//Google Maps

var marker_home;			//Marker for home position
var latlng_home;			//LatLng for home position
var lat_home;				//latitude for home position
var lng_home;				//longitude for home position

var marker_array = [];		//Markers table


/**
	* @desc intialize map and home position (with marker)
	* @param none
	* @return none
*/
function initialize()
{
	//Insert into variable the real table created in HTML file
	my_table = document.getElementById("table_infos");

	//Initialize home position (more or less IMERIR position)
	lat_home = 42.674547;
	lng_home = 2.847754;
	latlng_home = new google.maps.LatLng(lat_home, lng_home);

	//Precise maps options
	var options =
	{
		center: latlng_home,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	//Initialize the map with options 
	my_map = new google.maps.Map(document.getElementById("my_map"), options);

	//Create the home marker with a special icon
	marker_home = new google.maps.Marker
	(
		{
			position : latlng_home,
			map : my_map,
			icon: "logos/home-icon.png",
			title : "Home"
		}
	);

	//Display marker on the map
	marker_home.setMap(my_map);

	//Center the map on the home marker
	my_map.setCenter(latlng_home);
}


/**
	* @desc Center the map on the home position
	* @param none
	* @return none
*/
function go_home()
{
	//Change marker options  
	latlng_home = new google.maps.LatLng(lat_home,lng_home)
	marker_home.setPosition(latlng_home);
	my_map.setCenter(latlng_home);
	my_map.setZoom(10);
}


/**
	* @desc Search a position on the map
	* @param none
	* @return none
*/
function search_position()
{
	//Local variables
	var latitude = null;
	var longitude = null;
	var LatLng = null;

	//Split
	LatLng = $("#search").val();

	//Secure the coordinates
	if (LatLng == "")
	{
		alert("Empty text area");
	}
	else
	{
		//Split the result
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
					//Create a new marker
					add_marker(latitude,longitude,"#Search");

					//Center the map on the new marker
					my_map.setCenter(new google.maps.LatLng(latitude, longitude));
					my_map.setZoom(12);
				}
			}
		}
	}
}


/**
	* @desc Add a marker and memorize it
	* @param integer _lat - marker latitude
	* @param integer _lng - marker longitude
	* @param string _name - marker title
	* @param string _lat - marker root icon file
	* @return none
*/
function add_marker(_lat,_lng,_name,_logo)
{
	//Create a neww marker with options
	var marker = new google.maps.Marker({
		position : new google.maps.LatLng(_lat,_lng),
		map : my_map,
		icon: _logo,
		title : _name
	});

	//Push it on the array
	marker_array.push(marker);

	//Show it on the map
	marker.setMap(my_map);
}

/**
	* @desc Delete all markers - re-initialize the markers array
	* @param none
	* @return none
*/
function delete_all_markers()
{
	//For each marker, hide it on the map
	for (var i=0;i<marker_array.length;i++)
		marker_array[i].setMap(null);

	//Re-initialize the array
	marker_array = [];
}


/**
	* @desc Resize the map to show all markers 
	* @param none
	* @return none
*/
function resize_map()
{
	//If the markers array is empty
	if (marker_array.length == 0)
	{
		//Center the map on the home position
		my_map.setCenter(latlng_home);
		my_map.setZoom(12);
	}

	//If there is one marker
	else if (marker_array.length == 1)
	{
		//Center the map in it
		my_map.setCenter(marker_array[0].getPosition());
		my_map.setZoom(12);
	}

	else
	{
		//Variables
		var bounds = new google.maps.LatLngBounds();
			
		//Add the markers positions on the bounds
		for(i = 0; i < marker_array.length; i++)
		{
			bounds.extend(marker_array[i].getPosition());
		}
			
		//Do the better zoom and centering
		my_map.fitBounds(bounds);
	}
}
