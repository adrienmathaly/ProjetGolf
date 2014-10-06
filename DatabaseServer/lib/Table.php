<?php

/**
    * @file Table.php
    * @author Loïc TRICJAUD
    * @version 1.0
    * @date 01/10/2014
*/

/**
	* @class Table
	* @brief This class contains functions to read/write/delete from the database
*/

abstract class Table{

	protected $db; //!< Database
	protected $name; //!< table name
	protected $fields;
	
	/**
        * @brief This function returns the entire table
        * @return $allRows Data list
    */
	public function getAll(){

		$query = "SELECT * FROM ".$this->name;
		$allRows = $this->db->getResponse($query);
		
		return $allRows;
	}
	
    /**
        * @brief Collect some tuples of a table after some content provided $cond table.
        * @param $cond select conditions
        * @return $rows Data list
    */
	public function getRows($cond){

        $where = "";
		$rows = array();
		
		reset($cond);
		while (list($key, $val) = each($cond)) {
		
			if( !array_key_exists($key, $this->fields) ){
			
				echo "<br><br> PROBLEME => Le champ ".$key." n'existe pas ! <br><br>";
				return $rows;
			}
			
			$where .= $key."=".$val." AND ";
		}
		
		$where = substr_replace($where, "", -5, 5).";";
		
		$query = "SELECT * FROM ".$this->name." WHERE ".$where;
		
		$rows = $this->db->getResponse($query);
        
		return $rows;
	
	}
	

	/**
        * Inserting rows into a table
        * @param $valeurs value list to insert
        * @return $idInsere id of the inserted row
    */
	public function insertRow($valeurs){
	
		$queryInsertRow = "INSERT INTO ".$this->name."(";
		
		$allField = array_keys($this->fields);
		
		// TODO regarder si il y a autant de valeur que de champs
		for($i = 0; $i < count($allField); $i++){
		
			$queryInsertRow .= $allField[$i].",";
		}
		
		$queryInsertRow = substr_replace($queryInsertRow, "", -1, 1);
		$queryInsertRow .= ") VALUES(".$valeurs.");";
		
		$this->db->getResponse($queryInsertRow);
		
		// Retourne l'id de la ligne insere
		$resultQuery = $this->db->executeQuery("SELECT  LAST_INSERT_ID()");
		
		while( $row = mysql_fetch_assoc($resultQuery) ){
			
				$idInsere = $row['LAST_INSERT_ID()'];
		}
		
		return $idInsere;
		
	}
	
	/**
        * Delete rows into a table according to conditions
        * @param $cond delete condition
        * @return 0
    */
	public function deleteRow($cond){
	
		$queryDeleteRow = "DELETE FROM ".$this->name." WHERE ";
		
		$where ="";
		
		reset($cond);
		while (list($key, $val) = each($cond)) {
		
			if( !array_key_exists($key, $this->fields) ){
			
				echo "<br><br> PROBLEME => Le champ ".$key." n'existe pas ! <br><br>";
				return -1;
			}
			
			$queryDeleteRow .= $key."=".$val." AND ";
		}
		
		$queryDeleteRow = substr_replace($queryDeleteRow, "", -5, 5).";";
		
		$this->db->getResponse($queryDeleteRow);
		
		return 0;
		
	}
	
	/**
        * Update rows into a table according to conditions
        * @param $newValue update value
        * @param $cond update condition
        * @return -1 if problem
    */
	public function updateRow($newValue, $cond){
	
		$queryUpdateRow = "UPDATE ".$this->name." SET ";
		
		reset($newValue);
		while (list($key, $val) = each($newValue)) {
		
			if( !array_key_exists($key, $this->fields) ){
			
				echo "<br><br> PROBLEME => Le champ ".$key." n'existe pas ! <br><br>";
				return -1;
			}
			
			$queryUpdateRow .= $key."=".$val.", ";
		}
		
		$queryUpdateRow = substr_replace($queryUpdateRow, "", -2, 2)." WHERE ";
		
		reset($cond);
		while (list($key, $val) = each($cond)) {
		
			if( !array_key_exists($key, $this->fields) ){
			
				echo "<br><br> PROBLEME => Le champ ".$key." n'existe pas ! <br><br>";
				return -1;
			}
			
			$queryUpdateRow .= $key."=".$val." AND ";
		}
		
		$queryUpdateRow = substr_replace($queryUpdateRow, "", -5, 5).";";
				
		$this->db->getResponse($queryUpdateRow);
	}

	/**
        * Database deconnect
    */
    public function deconnect(){

        $this->db->deconnect();
    }
	
}

?>
