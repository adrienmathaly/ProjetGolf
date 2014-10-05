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
					var mark = new google.maps.Marker({
					position: new google.maps.LatLng(latitude, longitude),
					map: my_map
					});

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
}


function resize_map()
{
	var min_lat, max_lat, min_lng, max_lng;
	var center_lat, center_lng;
	var distance_lat,distance_lng;

	//IF THE TABLE IS COMPLETED BY DATA
	if (my_table.rows.length > 1)
	{
		//ARRAY LAT ET LNG INSERTION
		for (var j=1;j<my_table.rows.length;j++)
		{
			lat_array.push(parseFloat(my_table.rows[j].cells[1].innerHTML));
			lng_array.push(parseFloat(my_table.rows[j].cells[2].innerHTML));
		}	

		var min_lat = min(lat_array);
		var max_lat = max(lat_array);
		var min_lng = min(lng_array);
		var max_lng = max(lng_array);

		var distance_lat = max(lat_array) - min(lat_array);
		var distance_lng = max(lng_array) - min(lng_array);

		var center_lat = (min_lat + max_lat)/2
		var center_lng = (min_lng + max_lng)/2

		my_map.setCenter(new google.maps.LatLng(center_lat,center_lng));

		//REZOOM
		var array_distance = [distance_lat,distance_lng];
		var max_distance = parseFloat(max(array_distance)).toFixed(5);

		my_map.setZoom(choose_zoom(max_distance));
	}
}