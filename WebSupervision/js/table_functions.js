function add_cell(row, index, contents)
{
	var cell = row.insertCell(index);
	cell.innerHTML = contents;
	return cell;
}

function add_row(table, index)
{
	return (table.insertRow(index));
}

function clean_table(table)
{
	var length = table.rows.length;

	if (length > 1)
	{
		for (var j=1;j<length;j++)
		{
			table.deleteRow(1);
		}
	}
}