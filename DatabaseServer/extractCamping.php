<?php

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
    $i++;

    if( !empty($row) ){

        $row = str_replace("[", "", $row);
        $row = str_replace("]", ",", $row);
        $row = str_replace("\"", "", $row);

        $explode_camping = explode(",", $row);
        $departement = substr($explode_camping[3], 0, 3);
        $array_villes = explode(" ", $explode_camping[3]);
        $ville = rtrim($array_villes[2]);

        $query = '
        SELECT ville_id
        FROM t_ville
        WHERE ville_nom_simple LIKE "%'.strtolower($ville).'%"';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_camping[0];
        $poi_latitude = $explode_camping[1];
        $poi_nom = str_replace("*", "", $explode_camping[2]);
        $poi_type_id = 1;
        $poi_etoile = mb_substr_count( $explode_camping[2], "*");

        if( !empty($res[0]) ){
        
            $query = "
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( $poi_ville_id, $poi_longitude, $poi_latitude, '$poi_nom', $poi_type_id, $poi_etoile )
            ";

        
            $result = mysql_query($query);
        
        }
    }
}

echo $i;
mysql_close();

fclose($file);


?>
