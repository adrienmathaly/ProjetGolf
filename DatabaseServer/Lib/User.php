<?php

require_once("Db.php");
require_once("Table.php");

final class User extends Table{
	
	public function __construct(){

        $this->db = new Db();
        $this->name = "t_token";
        $this->fields = array(
                "token_id" => "token_id",
                "date_connexion" => "date_connexion",
                "distance_parcourue" => "distance_parcourue",
                "nb_ville_visite" => "nb_ville_visite",
                "longitude_origine" => "longitude_origine",
                "latitude_origine" => "latitude_origine"
        );
	}

    public function amountOfUser(){

        $query = "
            SELECT count(*) AS amountOfUser
            FROM t_token
        ";

		$response = $this->db->getResponse( $query );
		
		return $response;
    }

    public function travelledDistanceByUser(){

        $query = "
            SELECT token_id, distance_parcourue
            FROM t_token
        ";

		$response = $this->db->getResponse( $query );
		
		return $response;
    }

    public function lastKnownLocationByUser(){

        $query = "
            SELECT token_id, longitude_origine, latitude_origine
            FROM t_token
        ";

		$response = $this->db->getResponse( $query );
		
		return $response;
    }

    public function totalDistance(){

        $query = "
            SELECT SUM(distance_parcourue) AS totalDistance
            FROM t_token
        ";

		$response = $this->db->getResponse( $query );
		
		return $response;
    }
}

?>
