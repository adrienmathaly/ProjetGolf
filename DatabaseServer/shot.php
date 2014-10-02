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
$longitude_token = 2.833076;
$latitude_token  = 42.641190; // canohes

$longitude_balle = 4.188541; 
$latitude_balle  = 47.265494;  // balle

// recherche googlemap : 47.265494, 4.188541 (dijon ou autun suivant population)
// imerir : 42.6746 , 2.84773
// canohes 42.641190, 2.833076

$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";


mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");

createUser($id_token, $longitude_token, $latitude_token, $longitude_balle, $latitude_balle);
echo "<br>";
createVisit($id_token, $longitude_balle, $latitude_balle);
echo "<br>";
updateTown($longitude_balle, $latitude_balle);


mysql_close();


function createUser($id_token, $longitude_token, $latitude_token, $longitude_balle, $latitude_balle){

    $date_connexion = 0;
    $distance_done  = 0;
    
    $userQuery = "SELECT count(*) FROM t_token WHERE `token_id` =".$id_token;
    $result = mysql_query($userQuery); 
    $countUser = mysql_fetch_row($result);
    echo "Nombre User : ".$countUser[0]. "<br>";

    if($countUser[0] == 0){
        // insert user (nb_visite, distance, longitudeO, latitudeO, date connexion)
        $date_connexion = time();
        $distance_done = distanceCoordonnate($longitude_token, $latitude_token, $longitude_balle, $latitude_balle);
        $insertUserQuery = "insert into t_token 
                            values(".$id_token.", ".$date_connexion.", ".$distance_done.", 1, 
                                   ".$longitude_token.", ".$latitude_token.")";
        echo $insertUserQuery;
    }
    else{
        // update user (nb_visite, distance)
        $distance_done = distanceCoordonnate($longitude_token, $latitude_token, $longitude_balle, $latitude_balle);
        $updateUserQuery = "update t_token 
                            set distance_parcourue=".($distance_done+10).", nb_ville_visite = nb_ville_visite + 1
                            where token_id = ".$id_token;
        echo $updateUserQuery;
    }

}

function createVisit($id_token, $longitude_balle, $latitude_balle){
    $date_visite = time();
    $id_ville = 234;
    $insertVisitQuery = "insert into t_visites 
                        (SELECT ville_id , ".$id_token.", '2014-10-14 03:00:00' 
                         FROM t_ville
                         WHERE ville_longitude_deg = ".$longitude_balle." and ville_latitude_deg = ".$latitude_balle.") ";
    echo $insertVisitQuery;

}

function updateTown($longitude_balle, $latitude_balle){
    $updateTownQuery = "update t_ville 
                        set ville_nb_visite = ville_nb_visite + 1
                        where ville_longitude_deg=".$longitude_balle." and ville_latitude_deg =".$latitude_balle;
    echo $updateTownQuery;
}

function distanceCoordonnate($x1, $y1, $x2, $y2){

    $distance = sqrt( pow(abs($x1-$x2), 2) + pow(abs($y1-$y2), 2) );
    return $distance;
}

function print_rr( $array ){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

?>
