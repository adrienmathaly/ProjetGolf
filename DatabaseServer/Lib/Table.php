<?php

abstract class Table{

	protected $bd;
	protected $nom;
	protected $fields;
	
	public function getAll(){

		$query = "SELECT * FROM ".$this->nom;
		$allRows = $this->bd->getResponse($query);
		
		return $allRows;
	}
	
	/* Récupérer certaines uplets d'une table d'apres certaines
     * condition contenu le tableau $cond.
     * Ex : $cond = array("CLI_NOM" => "'Roland'", "CLI_PRENOM" => "'Marshall'");
	 * Les valeurs de chaines de caractères doivent êtres sous quote 'valeur'
	 * Comme 'Roland' dans l'exemple si dessus
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
		
		$query = "SELECT * FROM ".$this->nom." WHERE ".$where;
		
		$rows = $this->bd->getResponse($query);
        
		return $rows;
	
	}
	
	/*
	 * Il doit y avoir toutes les valeurs.
	 * Les valeurs non remplis sont à NULL
	 * Et les VARCHAR sont entourés par des quotes 'chaine'
	 *	exemple : $client->insertRow("NULL, 'sdqgds', 'test2', NULL, NULL, NULL, NULL");
	 */
	public function insertRow($valeurs){
	
		$queryInsertRow = "INSERT INTO ".$this->nom."(";
		
		$allField = array_keys($this->fields);
		
		// TODO regarder si il y a autant de valeur que de champs
		for($i = 0; $i < count($allField); $i++){
		
			$queryInsertRow .= $allField[$i].",";
		}
		
		$queryInsertRow = substr_replace($queryInsertRow, "", -1, 1);
		$queryInsertRow .= ") VALUES(".$valeurs.");";
		
		$this->bd->getResponse($queryInsertRow);
		
		// Retourne l'id de la ligne insere
		$resultQuery = $this->bd->executeQuery("SELECT  LAST_INSERT_ID()");
		
		while( $row = mysql_fetch_assoc($resultQuery) ){
			
				$idInsere = $row['LAST_INSERT_ID()'];
		}
		
		return $idInsere;
		
	}
	
	public function deleteRow($cond){
	
		$queryDeleteRow = "DELETE FROM ".$this->nom." WHERE ";
		
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
		
		$this->bd->getResponse($queryDeleteRow);
		
		return 0;
		
	}
	
	public function updateRow($newValue, $cond){
	
		$queryUpdateRow = "UPDATE ".$this->nom." SET ";
		
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
				
		$this->bd->getResponse($queryUpdateRow);
	}

    public function deconnect(){

        $this->bd->deconnect();
    }
	
}

?>
