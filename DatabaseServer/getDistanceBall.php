<?php

/**
* \file getDistanceBall.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne un tableau des tokens et de leur distance parcourue
*/


$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


$query = "SELECT token_id, distance_parcourue FROM t_token";

$result = mysql_query($query);

$array_distance = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $distance = array(
        "token_id"           => $donnees["token_id"],
        "distance_parcourue" => $donnees["distance_parcourue"]
    );

    array_push($array_distance, $distance);
}

$array_liste_distance_json = json_encode($array_distance);
echo ($array_liste_distance_json);



mysql_close();



function print_rr( $array ){
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

?>
