function go_home()
{
	var latlng = new google.maps.LatLng(lat_home, lng_home);
	my_map.setCenter(latlng);
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

	marker_array = [];
}

function resize_map()
{
	var bounds = new google.maps.LatLngBounds();
		
	for(i = 0; i < marker_array.length; i++)
	{
		var position = marker_array[i].getPosition();
		bounds.extend(position);
	}
		
	my_map.fitBounds(bounds);
}