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

function find_center(xA, xB)
{
	return ((xA+xB)/2);
}