<?php

$file = fopen("mcdo.asc", "r");

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
        $row = str_replace("\"", "", $row);
        $row = str_replace("]", ",", $row);
        $row = str_replace("[", "", $row);

        $explode_mcdo = explode(",", $row);
        $departement = substr($explode_mcdo[3], 0, 3);
        $array_villes = explode(" ", $explode_mcdo[3]);
        $ville = rtrim($array_villes[2]);

        $query = '
        SELECT ville_id
        FROM t_ville
        WHERE ville_nom_simple LIKE "%'.strtolower($ville).'%"';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_mcdo[0];
        $poi_latitude = $explode_mcdo[1];
        $poi_nom = "Mcdo ".$ville;
        $poi_type_id = 2;
        $poi_etoile = mb_substr_count( $explode_mcdo[2], "*");

        if( !empty($res[0]) ){
        
            $query = "
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( $poi_ville_id, $poi_longitude, $poi_latitude, '$poi_nom', $poi_type_id, $poi_etoile )
            ";


            //echo $query."<br>";        
            $result = mysql_query($query);
                $i++;
        
        }
        
    }
}

echo $i;
mysql_close();

fclose($file);


?>
