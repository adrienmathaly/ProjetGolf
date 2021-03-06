<?php

/**
* @file extractChateau.php
* @author Loïc TRICJAUD
* @version 1.0
* @date 05/10/2014
* @brief Preparation of a text file to insert list of castles in France in the database
*/

$file = fopen("chateaux.asc", "r");

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
        $row = $row.", , ";

        $explode_chtx = explode(",", $row);

        $departement = substr($explode_chtx[3], 0, 3);
        $ville = substr($explode_chtx[3], 4);
        $pos = 0;
        $ville = rtrim($ville);
        $ville = strtolower($ville);
        $pos = strpos($ville, "-");
        //echo "$ville - $pos <br>";
        if(!empty($pos)){
            $nomville = substr($ville, 0, $pos-1);
            $nomChtx = substr($ville, $pos+1);
        }else{
            $nomville = $ville;
            $nomChtx = "Chateau";
        }
        $pos = strpos($nomville, "/");
        if(!empty($pos)){
            $nomville = substr($nomville, 0, $pos);
        }

        //echo "$nomville | $nomChtx | $departement<br>";
 
        $query = '
        SELECT ville_id, ville_nom_simple
        FROM t_ville
        WHERE ville_nom_simple = "'.$nomville.'" and ville_departement = '.$departement.'
        ';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);
        //echo "$query <br>";
        //if(!empty($res[0]))
        //echo "<b>villeBD:</b> $res[1] || <b>villeFile:</b> $nomville || <b>dep</b> = $departement || <b>res[0]</b> = $res[0] <br>";

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_chtx[0];
        $poi_latitude = $explode_chtx[1];
        
        $poi_nom = $nomChtx;
        $poi_type_id = 4;
        $poi_etoile = 0;
         
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
