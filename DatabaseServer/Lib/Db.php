<?php

class Db{

    private $host;
    private $user;
    private $password;
    private $bd_name;
	private $link;
	
	public function __construct(){

        $this->host = "localhost";
        $this->user = "root";
        $this->password = "admin";
        $this->bd_name = "DB_GLF";

		$this->link = mysql_connect( $this->host , $this->user, $this->password) or die ("Connexion MYSQL => PROBLEME");
		mysql_select_db($this->bd_name) or die ("Selection BD => PROBLEME");
	}
	
	public function getResponse($query){
		
		$resultQuery = $this->executeQuery($query);
		
		$reponse = "";
		
		if($resultQuery != 0 && $resultQuery != 1){
		
			$response = array();
			
			while( $row = mysql_fetch_assoc($resultQuery) ){
			
				array_push($response, $row);
			}
			
		}else{
		
			$response = $resultQuery;
			
		}
		
		return $response;
	}
	
	public function executeQuery($query){
	
		$resultQuery = mysql_query($query, $this->link) or die ("Requete => PROBLEME");
		
		return $resultQuery;

	}
	
	public function showTables(){
	
		$resultQuery = mysql_query("SHOW TABLES;");
		
		echo "Liste des tables : <br><br>";
		
		while( $row = mysql_fetch_row($resultQuery) ){
		
			echo " - ".$row[0]."<br>";
		}
		
		echo "<br>";
	}
	
	public function deconnect(){
		
		mysql_close($this->link);
		$this->link = NULL;
	}
}

?>
