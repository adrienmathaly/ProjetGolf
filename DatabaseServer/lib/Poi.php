<?php

/**
    * @file Poi.php
    * @author Loïc TRICJAUD
    * @version 1.0
    * @date 01/10/2014
    * @brief Poi class.
*/


require_once("Db.php");
require_once("Table.php");

final class Poi extends Table{
	
	public function __construct(){

        $this->db = new Db();
        $this->name = "t_poi";
        $this->fields = array(
                "poi_id"        => "poi_id",
                "poi_ville_id"  => "poi_ville_id",
                "poi_type_id"   => "poi_type_id",
                "poi_nom"       => "poi_nom",
                "poi_etoile"    => "poi_etoile",
                "poi_longitude" => "poi_longitude",
                "poi_latitude"  => "poi_latitude"
        );
	}

    /**
        * This function will search the nearest poi of input coordinates.
        * @param $longitude Longitude of the ball.
        * @param $latitude Latitude of the ball.
        * @param $limit_km Defines the scope of Poi display.
        * @return $response Array of nearest poi informations
    */
    public function getNearestPoi($longitude, $latitude, $limit_km){

        $query = "
                    SELECT      type_nom as type, poi_nom as name, ville_nom_reel as ville, poi_longitude as lg, poi_latitude as lt, 
                                (sqrt(pow(abs(".$longitude." - poi_longitude),2) + pow(abs(".$latitude." - poi_latitude), 2)))*100 as distance , 
                                poi_etoile as etoile
                    FROM        t_poi, t_ville, t_type
                    WHERE       poi_ville_id = ville_id and poi_type_id = type_id 
                    GROUP BY    poi_nom, ville_nom_reel, poi_longitude, poi_latitude 
                    HAVING      distance < ".$limit_km."
                    ORDER BY    6
                ";

		$response = $this->db->getResponse( $query );
		
		return $response;
    }

    
}

?>
