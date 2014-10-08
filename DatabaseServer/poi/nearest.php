<?php

/**
	* @file nearest.php
	* @author Loïc TRICJAUD
	* @version 1.0
	* @date 01/10/2014
	* @brief Return nearest city and nearest poi of input coordinates.
*/

//      Location      |  Latitude  | Longitude
// ============================================
// Imerir             :  42.6746   , 2.84773
// Canohes            :  42.641190 , 2.833076
// Perpignan          :  42.683300 , 2.883330
// Pic du Canigou     :  42.518881 , 2.456667 


header('Content-Type: application/json; charset=utf-8');

$longitude  = $_GET['lg'];  //!< Longitude retrieving  in the url
$latitude   = $_GET['lt']; //!< Latitude retrieving  in the url
$population = 5000;       //!< Filter population to display small or large cities. 
$limit_km   = 30;        //!< Limit of kilometers of POI 

// Database connection
$db = new SQLite3('../db/db_golf.sqlite');

// City Request
$results = $db->query("
	SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki
	FROM t_ville
	WHERE ville_population > ".$population."
");

// Poi request
$results_poi = $db->query("
    SELECT      type_nom as type, poi_nom as name, ville_nom_reel as ville, poi_longitude as lgPoi, poi_latitude as ltPoi,
                poi_etoile as etoile
    FROM        t_poi, t_ville, t_type
    WHERE       poi_ville_id = ville_id and poi_type_id = type_id
");


$list_poi = array();
while( $row = $results_poi->fetchArray() ){

	//Distance between the ball and nearest poi
	$distance_poi = sqrt( pow(abs($longitude - $row["lgPoi"]), 2) + pow(abs($latitude - $row["ltPoi"]), 2) )*100;

	if( $distance_poi < $limit_km ){
		
		$poi = array(
			"type"     => $row["type"],
			"name"     => $row["name"],
			"ville"    => $row["ville"],
			"lgPoi"    => $row["lgPoi"],
			"ltPoi"    => $row["ltPoi"],
			"etoile"   => $row["etoile"],
			"distance" => $distance_poi
		);

		array_push($list_poi, $poi);
	}
}

$min = PHP_INT_MAX;
while( $row = $results->fetchArray() ){

	//Distance between the ball and the nearest city
    $distance = sqrt( pow(abs($longitude - $row["ville_longitude_deg"]), 2) + pow(abs($latitude - $row["ville_latitude_deg"]), 2) );

	if( $distance < $min ){
		
		// Nearest city with min distance
		$min = $distance;
		$nearest_city = array(
			"name"      => $row["ville_nom_reel"],
			"lgCity"    => (string)$row["ville_longitude_deg"],
			"ltCity"    => (string)$row["ville_latitude_deg"],
			"url"       => $row["ville_url_wiki"],
			"listOfPoi" => $list_poi
		);
	}
}

$db->close(); // Database deconnection

// JSON Encode
$nearest_city_json = json_encode($nearest_city, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
echo ($nearest_city_json);

?>