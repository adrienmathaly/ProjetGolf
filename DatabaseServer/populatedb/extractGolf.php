<?php

/**
* @file extractGolf.php
* @author Loïc TRICJAUD
* @version 1.0
* @date 03/10/2014
* @brief Preparation of a text file to insert list of golf in France in the database
*/

$file = fopen("golfs.asc", "r");
$db = new SQLite3('../db/db_golf.sqlite');

$i =0;
while( !feof($file) ){

    $row = fgets($file);

    if( !empty($row) ){

        $row = str_replace(" (", ",", $row);
        $row = str_replace("\"", "", $row);
        $row = str_replace("]", ",", $row);
        $row = str_replace("[", "", $row);

        $explode_golf = explode(",", $row);

        $departement = $explode_golf[3];

        $ville = $explode_golf[4];
        $ville = rtrim($ville);
        $ville = str_replace("-", " ", $ville);
        $ville = strtolower($ville);

        $departement = (string)$departement;
        $departement = substr($departement, 1);
        $departement = rtrim($departement);

        $query = '
        SELECT ville_id, ville_nom_simple
        FROM t_ville
        WHERE ville_nom_simple = "'.$ville.'" and ville_departement = "'.$departement.'"
        ';

        $result = $db->query($query);
        $res = $result->fetchArray();

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_golf[0];
        $poi_latitude = $explode_golf[1];
        if(!empty($explode_golf[5]))
            $poi_nom = $explode_golf[5];
        else
            $poi_nom = "Golf";
        $poi_type_id = 3;
        $poi_etoile = mb_substr_count( $explode_golf[2], "*");

        $poi_ville_id  = utf8_encode($poi_ville_id);
        $poi_longitude  = utf8_encode($poi_longitude);
        $poi_latitude  = utf8_encode($poi_latitude);
        $poi_nom  = utf8_encode($poi_nom);
        $poi_type_id  = utf8_encode($poi_type_id);
        $poi_etoile  = utf8_encode($poi_etoile);
         
        if( !empty($res[0]) ){
        
            $query = '
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( '.$poi_ville_id.', '.$poi_longitude.', '.$poi_latitude.', "'.$poi_nom.'", '.$poi_type_id.', '.$poi_etoile.' )
            ';


            //echo $query."<br>";        
            $result = $db->exec($query);
                $i++;
        
        }
        
    }
}

echo $i;
$db->close();

fclose($file);


?>
