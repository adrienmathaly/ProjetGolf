//Variables
var refresh_frequency = 2000;		//Refresh frequency for the timer


/**
	* @desc Verify input text for the refresh frequency
	* @param none
	* @return none
*/
function analyze_refresh()
{
	//Value recuperation
	var refresh = document.getElementById("refresh_value").value;

	//Limit the interval (200ms to 10s)
	if (refresh >= 200 && refresh <= 10000)
	{
		//Change the input text in green, to show to the user if the value is valid
		$('#refresh_value_form').addClass("has-success");
		//Permit to save the informations
		document.getElementById('refresh_button').disabled = false;
	}
	else
	{
		//Remove the green color
		$('#refresh_value_form').removeClass("has-success");
		//No permit to save anything
		document.getElementById('refresh_button').disabled = true;
	}
}


/**
	* @desc Validate the refresh frequency
	* @param Object _table - the table to be cleaned
	* @return none
*/
function validate_refresh()
{
	//Value recuperation
	refresh_frequency = document.getElementById("refresh_value").value;

	//Disconnect to clear the timer
	connect_to_server();

	//Reconnect to the server to reset interval
	connect_to_server();
}


/**
	* @desc Verify input text for the home position
	* @param none
	* @return none
*/
function analyze_position()
{
	//Value recuperation
	var position = document.getElementById("home_position_value").value;
	
	//If the value isn't empty
	if (position != "")
	{
		//Split the value with "/"
		var arrayOfCoordinates = position.split("/");

		//If the array has 2 values
		if (arrayOfCoordinates.length == 2)
		{
			//Collect the 2 values splitted
			var latitude = arrayOfCoordinates[0];
			var longitude = arrayOfCoordinates[1];
			
			//Maps interval conditions
			if ((latitude <= 90 || latitude >= -90) && (longitude <= 180 || longitude >= -180))
			{
				//Change the input text in green, to show to the user if the value is valid
				$('#home_position_form').addClass("has-success");
				document.getElementById('position_button').disabled = false;
			}
			else
			{
				//Remove the green color and no permit to save anything
				$('#home_position_form').removeClass("has-success");
				document.getElementById('position_button').disabled = true;
			}
		}
		else
		{
			//Remove the green color and no permit to save anything
			$('#home_position_form').removeClass("has-success");
			document.getElementById('position_button').disabled = true;
		}
	}
	else
	{
		//Remove the green color and no permit to save anything
		$('#home_position_form').removeClass("has-success");
		document.getElementById('position_button').disabled = true;
	}
}

/**
	* @desc Validate the home position
	* @param none
	* @return none
*/
function validate_position()
{
	//Value recuperation
	var value = document.getElementById("home_position_value").value;

	//Re-split the good value and memorize the position
	var array = value.split("/");
	lat_home = array[0];
	lng_home = array[1];
}


/**
	* @desc Fill the IMERIR position into the input text
	* @param none
	* @return none
*/
function fill_IMERIR_position()
{
	//Change the value
	document.getElementById("home_position_value").value = "42.674547/2.847754";

	//Analyze the position to make it valid (green)
	analyze_position();
}