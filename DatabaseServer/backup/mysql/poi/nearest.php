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

require_once("../lib/City.php");
require_once("../lib/Poi.php");

// Data retrieving  in the url (longitude and latitude)
$longitude  = $_GET['lg']; //!< Longitude retrieving  in the url
$latitude   = $_GET['lt']; //!< Latitude retrieving  in the url
$population = 3000;        //!< Filter population to display small or large cities. 
$limit_km   = 30; //!< Limit of kilometers of POI 

$city = new City();
$array_nearest_city = $city->getNearestCity($longitude,$latitude,$population);
$city->deconnect();

// Nearest POI
$poi = new Poi();
$array_nearest_poi = $poi->getNearestPoi($longitude,$latitude,$limit_km);
$poi->deconnect();

$nearest_city = array(
	"name"      => $array_nearest_city[0]["ville_nom_reel"],
	"lgCity"    => $array_nearest_city[0]["ville_longitude_deg"],
	"ltCity"    => $array_nearest_city[0]["ville_latitude_deg"],
	"url"       => $array_nearest_city[0]["ville_url_wiki"],
	"listOfPoi" => $array_nearest_poi
);

// JSON Decode
$nearest_city_json = json_encode($nearest_city, JSON_UNESCAPED_UNICODE | JSON_UNESCAPED_SLASHES);
echo ($nearest_city_json);

?>
