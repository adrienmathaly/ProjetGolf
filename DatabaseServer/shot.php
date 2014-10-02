<?php

/**
* \file shot.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief Apres tir
*/

// Récupération des données depuis json envoyé
$id_token        = 12425;

$longitude_token = 2.833076;
$latitude_token  = 42.641190; // canohes

$longitude_balle = 2.883330  ;  
$latitude_balle  = 42.683300 ;  // balle

// recherche googlemap : 47.265494, 4.188541 (dijon ou autun suivant population)
// imerir : 42.6746 , 2.84773
// canohes 42.641190, 2.833076
// Perpignan 2.883330    42.683300   

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
echo "<br>";
selectTownInformations($longitude_balle, $latitude_balle);


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
        $date_connexion = date('Y-m-d H:i:s');
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
                            set distance_parcourue = distance_parcourue+".($distance_done).", nb_ville_visite = nb_ville_visite + 1
                            where token_id = ".$id_token;
        echo $updateUserQuery;

    }

}

function createVisit($id_token, $longitude_balle, $latitude_balle){
    $date_visite = date('Y-m-d H:i:s');
    $id_ville = 234;
    $insertVisitQuery = "insert into t_visites 
                        (SELECT ville_id , ".$id_token.", $date_visite 
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

function selectTownInformations($longitude_balle, $latitude_balle){
    $query = "
            SELECT ville_nom_reel, ville_longitude_deg, ville_latitude_deg, ville_url_wiki 
            FROM t_ville
            WHERE  ville_longitude_deg = ".$longitude_balle." and ville_latitude_deg = ".$latitude_balle;
        
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
    echo ($array_liste_ville_json);
}

function distanceCoordonnate($x1, $y1, $x2, $y2){

    $distance = sqrt( pow(abs($x1-$x2), 2) + pow(abs($y1-$y2), 2) ) *100;
    return $distance;
}


function print_rr( $array ){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

?>
