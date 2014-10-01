<?php

/**
* \file nearest.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief Apres tir
*/

// Récupération des données dans l'url (longitude et latitude) + affichage
$longitude = $_GET['lg'];
$latitude  = $_GET['lt'];
echo "Longitude : " . $longitude ."  - Latitude : ".$latitude;

echo "<br><br>";
$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";


mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");

/*SELECT ville_nom_reel , ville_departement , ville_longitude_deg, ville_latitude_deg,
sqrt(pow(abs(42.6746 - ville_longitude_deg),2) 
     + 
     pow(abs(2.84773 - ville_latitude_deg), 2))
FROM `t_ville`*/

$query = "
    SELECT ville_nom_reel, ville_url_wiki, ville_longitude_deg, ville_latitude_deg

    FROM t_ville

    WHERE ville_nom_reel = 'Perpignan'
";

$result = mysql_query($query);

$array_liste_ville = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $ville = array(
    	"ville_nom_reel"      => $donnees["ville_nom_reel"],
    	"ville_url_wiki"      => $donnees["ville_url_wiki"],
    	"ville_longitude_deg" => $donnees["ville_longitude_deg"],
    	"ville_latitude_deg"  => $donnees["ville_latitude_deg"]
    );

    array_push($array_liste_ville, $ville);
}

$array_liste_ville_json = json_encode($array_liste_ville);
//print_rr($array_liste_ville);
echo ($array_liste_ville_json);


mysql_close();


function print_rr( $array ){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

?>
