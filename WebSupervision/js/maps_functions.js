var my_map;

var marker_home;
var latlng_home;
var lat_home;
var lng_home;

var marker_array = [];


function initialiser()
{
	my_table = document.getElementById("table_infos");

	lat_home = 42.674547;
	lng_home = 2.847754;

	latlng_home = new google.maps.LatLng(lat_home, lng_home);

	var options =
	{
		center: latlng_home,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	my_map = new google.maps.Map(document.getElementById("my_map"), options);

	//CREATE THE FIRST HOME MARKER 
	marker_home = new google.maps.Marker
	(
		{
			position : latlng_home,
			map : my_map,
			icon: "logos/home-icon.png",
			title : "Home"
		}
	);

	//DISPLAY MARKER ON THE MAP AND CENTER IT
	marker_home.setMap(my_map);
	my_map.setCenter(latlng_home);
}


function go_home()
{
	latlng_home = new google.maps.LatLng(lat_home,lng_home)
	marker_home.setPosition(latlng_home);
	marker_home.setMap(my_map);
	my_map.setCenter(latlng_home);
	my_map.setZoom(10);
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
					add_marker(latitude,longitude,"#Search");

					//POINT THE MAP ON THE NEW MARKER
					my_map.setCenter(new google.maps.LatLng(latitude, longitude));
					my_map.setZoom(12);
				}
			}
		}
	}
}


function add_marker(_lat,_lng,_name)
{
	//CREATE A NEW MARKER
		marker = new google.maps.Marker({
    		position : new google.maps.LatLng(_lat,_lng),
    		map : my_map,
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

	marker_array = [];
}

function resize_map()
{
	//IF THERE IS ONLY THE HOME
	if (marker_array.length == 0)
	{
		my_map.setCenter(latlng_home);
		my_map.setZoom(12);
	}

	else if (marker_array.length == 1)
	{
		my_map.setCenter(marker_array[0].getPosition());
		my_map.setZoom(12);
	}

	else
	{
		var bounds = new google.maps.LatLngBounds();
			
		for(i = 0; i < marker_array.length; i++)
		{
			bounds.extend(marker_array[i].getPosition());
		}
			
		my_map.fitBounds(bounds);
	}
}

function fill_IMERIR_position()
{
	document.getElementById("home_position_value").value = "42.674547/2.847754";
}