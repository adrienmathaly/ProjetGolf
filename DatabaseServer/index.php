<?php

/**
* \file index.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief index of database server
*/


// Test Requete SQL

$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


$query = "
    SELECT ville_nom_reel, ville_departement, ville_code_postal,
    ville_population, ville_densite, ville_url_wiki, ville_pays,
    ville_longitude_deg, ville_latitude_deg

    FROM t_ville

    WHERE ville_code_postal = '66600'
";

$result = mysql_query($query);

$array_liste_ville = array();
while($donnees = mysql_fetch_assoc($result)) {
     
    $ville = array(
    	"ville_nom_reel"      => $donnees["ville_nom_reel"],
    	"ville_departement"   => $donnees["ville_departement"],
    	"ville_code_postal"   => $donnees["ville_code_postal"],
    	"ville_population"    => $donnees["ville_population"],
    	"ville_densite"       => $donnees["ville_densite"],
    	"ville_url_wiki"      => $donnees["ville_url_wiki"],
    	"ville_pays"          => $donnees["ville_pays"],
    	"ville_longitude_deg" => $donnees["ville_longitude_deg"],
    	"ville_latitude_deg"  => $donnees["ville_latitude_deg"]
    );

    array_push($array_liste_ville, $ville);
}

$array_liste_ville_json = json_encode($array_liste_ville);
print_rr($array_liste_ville);
echo ($array_liste_ville_json);

mysql_close();

function print_rr( $array ){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

?>
