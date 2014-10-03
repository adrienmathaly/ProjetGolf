<?php

$file = fopen("golfs.asc", "r");

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

        $explode_golf = explode(",", $row);

        $departement = $explode_golf[3];

        $ville = $explode_golf[4];
        $ville = rtrim($ville);
        $ville = str_replace("-", " ", $ville);
        $ville = strtolower($ville);

        $query = '
        SELECT ville_id, ville_nom_simple
        FROM t_ville
        WHERE ville_nom_simple = "'.$ville.'"
        ';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);
 
        //echo "quer = $query || ville = $ville || Dep = $departement || res[0] = $res[0] <br>";

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_golf[0];
        $poi_latitude = $explode_golf[1];
        if(!empty($explode_golf[5]))
            $poi_nom = $explode_golf[5];
        else
            $poi_nom = "Golf";
        $poi_type_id = 3;
        $poi_etoile = mb_substr_count( $explode_golf[2], "*");
         
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
