<?php

/**
* \file nearest.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief Return nearest town
*/

//      Location      |  Latitude  | Longitude
// ============================================
// Park next to Dijon :  47.265494 , 4.188541
// Imerir             :  42.6746   , 2.84773
// Canohes            :  42.641190 , 2.833076
// Perpignan          :  42.683300 , 2.883330
// Pic du Canigou     :  42.518881 , 2.456667     

header('Content-Type: application/json; charset=utf-8');

require_once("../lib/City.php");
require_once("../lib/Poi.php");

// Data retrieving  in the url (longitude and latitude)
$longitude  = $_GET['lg'];
$latitude   = $_GET['lt'];
$population = 5000;
$limit_km   = 30;

$city = new City();
$array_nearest_city = $city->getNearestCity($longitude,$latitude,$population);
$city->deconnect();

// Nearest POI
$poi = new Poi();
$array_nearest_poi = $poi->getNearestPoi($longitude,$latitude,$limit_km);
$poi->deconnect();

$nearest_city = array(
	"name" => $array_nearest_city[0]["ville_nom_reel"],
	"lt"   => $array_nearest_city[0]["ville_longitude_deg"],
	"lg"   => $array_nearest_city[0]["ville_latitude_deg"],
	"url"  => $array_nearest_city[0]["ville_url_wiki"],
	"listOfPoi" => $array_nearest_poi
);

// JSON Decode
$nearest_city_json = json_encode($nearest_city, JSON_UNESCAPED_UNICODE);
echo ($nearest_city_json);

?>
