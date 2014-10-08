//Variables
var my_table;		//Contents the details users table 

/**
	* @desc Delete all old rows except header
	* @param Object _table - the table to be cleaned
	* @return nothing
*/
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