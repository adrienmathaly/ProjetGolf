<?php

/**
* \file shot.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief Apres tir
*/

// Récupération des données depuis json envoyé
$id_token        = 1245;
$longitude_token;
$latitude_token  ; 
$longitude_balle ; 
$latitude_balle  ; 


echo "<br><br>";
$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";


mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
//mysql_query("SET NAMES UTF8");


// recherche googlemap : 47.265494, 4.188541 (dijon ou autun suivant population)
// imerir : 42.6746 , 2.84773
//$longitude = 4.188541;
//$latitude = 47.265494;

$query = "
    SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki 
    FROM 
        ( SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki, 
            (sqrt(pow(abs(".$longitude." - ville_longitude_deg),2) + pow(abs(".$latitude." - ville_latitude_deg), 2))) 
          FROM `t_ville` 
          WHERE ville_population > 50000 order by 5
        ) as tt 
    LIMIT 1 
";



$result = mysql_query($query);

$array_liste_ville = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $ville = array(
    	"ville_nom_reel"      => $donnees["ville_nom_reel"],
    	"ville_longitude_deg" => $donnees["ville_longitude_deg"],
    	"ville_latitude_deg"  => $donnees["ville_latitude_deg"],
        "ville_url_wiki"      => $donnees["ville_url_wiki"]
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
