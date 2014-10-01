<?php

/**
* \file getLocationUser.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne un tableau des tokens et de leur localisation
*/


$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


$query = "SELECT token_id, longitude_origine, latitude_origine FROM t_token";

$result = mysql_query($query);

$array_location = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $location = array(
        "token_id"           => $donnees["token_id"],
        "longitude_origine" => $donnees["longitude_origine"],
        "latitude_origine" => $donnees["latitude_origine"]
    );

    array_push($array_location, $location);
}

$array_liste_location_json = json_encode($array_location);
echo ($array_liste_location_json);



mysql_close();



function print_rr( $array ){
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

?>
