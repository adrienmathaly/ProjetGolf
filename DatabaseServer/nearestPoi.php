<?php

/**
* \file nearestPoi.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 03/10/2014
* \brief Return nearest POI of city
*/

//      Location      |  Latitude  | Longitude
// ============================================
// Park next to Dijon :  47.265494 , 4.188541
// Imerir             :  42.6746   , 2.84773
// Canohes            :  42.641190 , 2.833076
// Perpignan          :  42.683300 , 2.883330
// Pic du Canigou     :  42.518881 , 2.456667     


// Data retrieving  in the url (longitude and latitude)
$longitude  = $_GET['lg'];
$latitude   = $_GET['lt'];
$population = 1000;

// Connection database informations
$host = "localhost";
$user = "root";
$bdd  = "DB_GLF";
$pwd  = "";

// Database connection
mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");

//select `poi_nom`, ville_nom_reel, `poi_longitude`, `poi_latitude`, (sqrt(pow(abs(2.833076 - poi_longitude),2) + pow(abs(42.641190 - poi_latitude), 2)))*100 from t_poi, t_ville where `poi_ville_id` = ville_id order by 5 

// SQL Request 
$query = "
    SELECT poi_nom, poi_type_id, poi_longitude, poi_latitude, poi_etoile 
    FROM 
        ( SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki, 
            (sqrt(pow(abs(".$longitude." - ville_longitude_deg),2) + pow(abs(".$latitude." - ville_latitude_deg), 2))) 
          FROM `t_ville` 
          WHERE ville_population > ".$population." order by 5
        ) as tt 
    LIMIT 5 
";

$result = mysql_query($query);

$array_liste_poi = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $poi = array(
    	"poi_nom"       => $donnees["poi_nom"],
    	"poi_type_id"   => $donnees["poi_type_id"],
    	"poi_longitude" => $donnees["poi_longitude"],
        "poi_latitude"  => $donnees["poi_latitude"],
        "poi_etoile"    => $donnees["poi_etoile"],

    );

    array_push($array_liste_poi, $poi);
}

// Json Encode
$array_liste_poi_json = json_encode($array_liste_poi);

echo ($array_liste_poi_json);

mysql_close();


?>
