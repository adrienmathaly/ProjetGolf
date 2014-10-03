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

require_once("Lib/City.php");

// Data retrieving  in the url (longitude and latitude)
$longitude  = 2.456667; //$_GET['lg'];
$latitude   = 42.518881; //$_GET['lt'];
$population = 1000;

$city = new City();
$nearestCity = $city->getNearestCity($longitude,$latitude,$population);
$city->deconnect();
echo "<pre>";
print_r($nearestCity);
echo "</pre>";


/*$array_liste_ville = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $ville = array(
    	"ville_nom_reel"      => $donnees["ville_nom_reel"],
    	"ville_longitude_deg" => $donnees["ville_longitude_deg"],
    	"ville_latitude_deg"  => $donnees["ville_latitude_deg"],
        "ville_url_wiki"      => $donnees["ville_url_wiki"]
    );

    array_push($array_liste_ville, $ville);
}

// Json Encode
$array_liste_ville_json = json_encode($array_liste_ville);

echo ($array_liste_ville_json);

mysql_close();
*/

?>
