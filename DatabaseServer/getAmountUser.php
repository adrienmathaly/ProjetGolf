<?php

/**
* \file getAmountUser.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne le nombre de token de la table t_token
*/


$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


$query = "SELECT count(*) as 'nb' FROM t_token";

$result = mysql_query($query);

$array_number_user = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $nbuser = array(
        "nb_user" => $donnees["nb"]
    );

    array_push($array_number_user, $nbuser);
}

$array_liste_nb_user_json = json_encode($array_number_user);
echo ($array_liste_nb_user_json);



mysql_close();



function print_rr( $array ){
    echo "<pre>";
    print_r($array);
    echo "</pre>";
}

?>
