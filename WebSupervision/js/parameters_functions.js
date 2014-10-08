//VARIABLES
var refresh_frequency = 2000;


function analyze_refresh()
{
	var refresh = document.getElementById("refresh_value").value;

	if (refresh >= 200 && refresh <= 10000)
	{
		$('#refresh_value_form').addClass("has-success");
		document.getElementById('refresh_button').disabled = false;
	}
	else
	{
		$('#refresh_value_form').removeClass("has-success");
		document.getElementById('refresh_button').disabled = true;
	}
}


function validate_refresh()
{
	refresh_frequency = document.getElementById("refresh_value").value;
}


function analyze_position()
{
	var position = document.getElementById("home_position_value").value;
	
	if (position != "")
	{
		var arrayOfCoordinates = position.split("/");

		if (arrayOfCoordinates.length == 2)
		{
			var latitude = arrayOfCoordinates[0];
			var longitude = arrayOfCoordinates[1];
			
			if ((latitude <= 90 || latitude >= -90) && (longitude <= 180 || longitude >= -180))
			{
				$('#home_position_form').addClass("has-success");
				document.getElementById('position_button').disabled = false;
			}
			else
			{
				$('#home_position_form').removeClass("has-success");
				document.getElementById('position_button').disabled = true;
			}
		}
		else
		{
			$('#home_position_form').removeClass("has-success");
			document.getElementById('position_button').disabled = true;
		}
	}
	else
	{
		$('#home_position_form').removeClass("has-success");
		document.getElementById('position_button').disabled = true;
	}
}


function validate_position()
{
	var value = document.getElementById("home_position_value").value;
	var array = value.split("/");
	lat_home = array[0];
	lng_home = array[1];
}


function fill_IMERIR_position()
{
	document.getElementById("home_position_value").value = "42.674547/2.847754";
	analyze_position();
}