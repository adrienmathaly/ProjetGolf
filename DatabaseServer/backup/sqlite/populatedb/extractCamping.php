<?php

/**
* @file extractCamping.php
* @author Loïc TRICJAUD
* @version 1.0
* @date 03/10/2014
* @brief Preparation of a text file to insert list of Camping in France in the database
*/

$file = fopen("camping.asc", "r");
$db = new SQLite3('../db/db_golf.sqlite');

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

        $result = $db->query($query);
        $res = $result->fetchArray();

        //echo "quer = $query || ville = $ville || Dep = $departement || res[0] = $res[0] <br>";

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_camping[0];
        $poi_latitude = $explode_camping[1];
        $poi_nom = str_replace("*", "", $explode_camping[2]);
        $poi_type_id = 1;
        $poi_etoile = mb_substr_count( $explode_camping[2], "*");

        $poi_ville_id  = utf8_encode($poi_ville_id);
        $poi_longitude  = utf8_encode($poi_longitude);
        $poi_latitude  = utf8_encode($poi_latitude);
        $poi_nom  = utf8_encode($poi_nom);
        $poi_type_id  = utf8_encode($poi_type_id);
        $poi_etoile  = utf8_encode($poi_etoile);

        if( !empty($res[0]) ){
        
            $i++;

            $query = '
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( '.$poi_ville_id.', '.$poi_longitude.', '.$poi_latitude.', "'.$poi_nom.'", '.$poi_type_id.', '.$poi_etoile.' )
            ';

            //echo "$query <br>";
            $result = $db->exec($query);
        
        }
    }
}

echo $i;
$db->close();

fclose($file);


?>
