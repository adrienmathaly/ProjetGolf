var my_map;

var marker_home;
var latlng_home;
var lat_home;
var lng_home;

var lat_IMERIR = 42.674547;
var lng_IMERIR = 2.847754;

var marker_array = [];
var lat_array = [];
var lng_array = [];


function initialiser()
{
	my_table = document.getElementById("table_infos");


	lat_home = 42.674547;
	lng_home = 2.847754;

	latlng_home = new google.maps.LatLng(lat_home, lng_home);

	var options = {
		center: latlng_home,
		zoom: 10,
		mapTypeId: google.maps.MapTypeId.ROADMAP
	};

	my_map = new google.maps.Map(document.getElementById("my_map"), options);


	marker_home = new google.maps.Marker({
		position : latlng_home,
		map : my_map,
		icon : "css/images/home-icon.png",
		title : "Home"
	});

	marker_home.setMap(my_map);
	my_map.setCenter(latlng_home);
}


function go_home()
{
	latlng_home = new google.maps.LatLng(lat_home, lng_home);
	marker_home.setPosition(latlng_home);

	marker_home.setMap(my_map);
	my_map.setCenter(latlng_home);
	my_map.setZoom(16);
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

	//resize_map();
}

function delete_all_markers()
{
	for (var i=0;i<marker_array.length;i++)
		marker_array[i].setMap(null);

	marker_array = [];
}

function resize_map()
{
	var bounds = new google.maps.LatLngBounds();
		
	for(i = 0; i < marker_array.length; i++)
	{
		//var position = marker_array[i].getPosition();
		bounds.extend(marker_array[i].getPosition());
	}
		
	my_map.fitBounds(bounds);

	//IF THERE IS NO MARKER
	if (marker_array.length == 0)
	{
		my_map.setCenter(latlng_home);
		my_map.setCenter(15);
	}

	//IF THERE IS AN ONLY ONE MARKER
	else if (marker_array.length == 1)
	{



	}

	//if (my_map.getZoom() > 15)	my_map.setZoom(12);
}

function fill_IMERIR_position()
{
	document.getElementById("refresh_home_position").value = lat_IMERIR + "/" + lng_IMERIR;
}