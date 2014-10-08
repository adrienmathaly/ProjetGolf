//VARIABLES
var my_table;		//Contents the details users table 

//DELETE ALL OLD ROWS EXCEPT HEADER
function clean_table(_table)
{
	//If the table in parameter exists
	if (_table != undefined)
	{
		//Find the number of rows
		var length = _table.rows.length;

		//If there is more than the header
		if (length > 1)
		{
			//Delete the second row for each step
			for (var j=1;j<length;j++)
			{
				_table.deleteRow(1);
			}
		}
	}
}