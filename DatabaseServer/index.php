<?php

/**
* \file index.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief index of database server
*/

//include('serveur.php');

//$serveur = new Serveur();
//$serveur->Start("localhost", "8084");

// Test Requete SQL

$host = "localhost";
$user = "root";
$bdd  = "Ville";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");
mysql_query("SET NAMES UTF8");


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

getUserNumbers();

mysql_close();
//include('serveur.php');


function getUserNumbers(){
    /*$nbUser = 0;
	// Creation et envoi de la requete
	$query = "SELECT count(*) FROM t_token WHERE 1=1";
	$result = mysql_query($query);
    $array_nb_user = array();

	while($donnees = mysql_fetch_assoc($result)) {
	     
	    $nbUser =  $donnees[0] ;

	}

$nbUser_json = json_encode($nbUser);
print_rr($nbUser);
echo ($nbUser_json);*/

}

function print_rr( $array ){
	echo "<pre>";
	print_r($array);
	echo "</pre>";
}

?>
