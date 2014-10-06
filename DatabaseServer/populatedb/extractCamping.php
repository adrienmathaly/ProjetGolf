<?php

/**
* @file extractCamping.php
* @author Loïc TRICJAUD
* @version 1.0
* @date 03/10/2014
* @brief Preparation of a text file to insert list of Camping in France in the database
*/

$file = fopen("camping.asc", "r");

$host = "localhost";
$user = "root";
$bdd  = "DB_GLF";
$pwd  = "";

mysql_connect($host, $user, $pwd) or die("Erreur de connexion au serveur");
mysql_select_db($bdd) or die("Erreur de connexion a la base de donnees");

$i =0;
while( !feof($file) ){

    $row = fgets($file);

    if( !empty($row) ){

        $row = str_replace(" (", ",", $row);
        $row = str_replace("[", "", $row);
        $row = str_replace("]", ",", $row);
        $row = str_replace("\"", "", $row);

        $explode_camping = explode(",", $row);
        $departement = substr($explode_camping[3], 0, 3);
        $ville = substr($explode_camping[3], 4);
        $ville = rtrim($ville);
        $ville = str_replace("-", " ", $ville);
        $ville = strtolower($ville);

        $query = '
        SELECT ville_id
        FROM t_ville
        WHERE ville_nom_simple = "'.$ville.'"
        ';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);

        //echo "quer = $query || ville = $ville || Dep = $departement || res[0] = $res[0] <br>";

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_camping[0];
        $poi_latitude = $explode_camping[1];
        $poi_nom = str_replace("*", "", $explode_camping[2]);
        $poi_type_id = 1;
        $poi_etoile = mb_substr_count( $explode_camping[2], "*");

        if( !empty($res[0]) ){
        
            $i++;

            $query = "
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( $poi_ville_id, $poi_longitude, $poi_latitude, '$poi_nom', $poi_type_id, $poi_etoile )
            ";

            //echo "$query <br>";
            $result = mysql_query($query);
        
        }
    }
}

echo $i;
mysql_close();

fclose($file);


?>
