function clean_table(_table)
{
	if (_table != undefined)
	{
		var length = _table.rows.length;

		if (length > 1)
		{
			for (var j=1;j<length;j++)
			{
				table.deleteRow(1);
			}
		}
	}
}