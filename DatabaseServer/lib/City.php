<?php

require_once("Db.php");
require_once("Table.php");

final class City extends Table{
	
	public function __construct(){

        $this->db = new Db();
        $this->name = "t_ville";
        $this->fields = array(
                "ville_id"            => "token_id",
                "ville_departement"   => "ville_departement",
                "ville_nom"           => "ville_nom",
                "ville_nom_simple"    => "ville_nom_simple",
                "ville_nom_reel"      => "ville_nom_reel",
                "ville_code_postal"   => "ville_code_postal",
                "ville_commune"       => "ville_commune",
                "ville_code_commune"  => "ville_code_commune",
                "population"          => "population",
                "densite"             => "densite",
                "surface"             => "surface",
                "ville_longitude_deg" => "ville_longitude_deg",
                "ville_latitude_deg"  => "ville_latitude_deg",
                "ville_longitude_grd" => "ville_longitude_grd",
                "ville_latitude_grd"  => "ville_latitude_grd",
                "ville_longitude_dms" => "ville_longitude_dms",
                "ville_latitude_dms"  => "ville_latitude_dms",
                "ville_zmin"          => "ville_zmin",
                "ville_zmax"          => "ville_zmax",
                "ville_url_wiki"      => "ville_url_wiki",
                "ville_pays"          => "ville_pays"
        );
	}

    public function getNearestCity($longitude, $latitude, $population){

        $query = "
                    SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki 
                    FROM 
                        ( SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki, 
                            (sqrt(pow(abs(".$longitude." - ville_longitude_deg),2) + pow(abs(".$latitude." - ville_latitude_deg), 2))) 
                          FROM `t_ville` 
                          WHERE ville_population > ".$population." order by 5
                        ) as tt 
                    LIMIT 1 
                ";

		$response = $this->db->getResponse( $query );
		return $response;
    }

    
}

?>
