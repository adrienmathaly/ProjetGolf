<?php

/**
* \file getTotalDistance.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne la somme de toutes les distances parcourues de la table t_token
*/


$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


$query = "SELECT sum(distance_parcourue) as 'sum' FROM t_token";

$result = mysql_query($query);

$array_sum_distance = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $sum = array(
        "sum_distance" => $donnees["sum"]
    );

    array_push($array_sum_distance, $sum);
}

$array_liste_sum_json = json_encode($array_sum_distance);
echo ($array_liste_sum_json);



mysql_close();



function print_rr( $array ){
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

?>
