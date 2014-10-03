function add_cell(index, row, contents)
{
	var cell = row.insertCell(index);
	cell.innerHTML = contents;
	return cell;
}

function add_row(table, index)
{
	var row = table.insertRow(index);
	return row;
}