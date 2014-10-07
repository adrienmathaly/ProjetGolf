<?php

/**
    * @file Db.php
    * @author Loïc TRICJAUD
    * @version 1.0
    * @date 01/10/2014
    * @brief Db class. This class allows the connection, access and disconnection of database
*/

/**
    * @class Db
    * @brief This class allows the connection, access and disconnection of database
*/

class Db{

    private $host;
    private $user;
    private $password;
    private $bd_name;
	private $link;
	
	public function __construct(){

        $this->host = "localhost";
        $this->user = "root";
        $this->password = "";
        $this->bd_name = "DB_GLF";

		$this->link = mysql_connect( $this->host , $this->user, $this->password) or die ("Connexion MYSQL => PROBLEME");
		mysql_select_db($this->bd_name) or die ("Selection BD => PROBLEME");
		mysql_query("SET NAMES UTF8");
	}
	
	/**
        * Returns the result of a sql query
        * @param $query SQL request
        * @return $response response of query
    */
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
	
	/**
        * Returns the result of a sql query
        * @param $query SQL request
        * @return $response response of query
    */
	public function executeQuery($query){
	
		$resultQuery = mysql_query($query, $this->link) or die ("Requete => PROBLEME");
		
		return $resultQuery;

	}
	
	/**
        * Display the list of tables
    */
	public function showTables(){
	
		$resultQuery = mysql_query("SHOW TABLES;");
		
		echo "Liste des tables : <br><br>";
		
		while( $row = mysql_fetch_row($resultQuery) ){
		
			echo " - ".$row[0]."<br>";
		}
		
		echo "<br>";
	}
	
	/**
        * Database deconnection
    */
	public function deconnect(){
		
		mysql_close($this->link);
		$this->link = NULL;
	}
}

?>
