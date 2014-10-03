<?php

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
   
        $nomville = substr($ville, 0, $pos-1);

        $nomChtx = substr($ville, $pos+1);
        
        echo "$nomville | $nomChtx | $departement<br>";
        $query = '
        SELECT ville_id, ville_nom_simple
        FROM t_ville
        WHERE ville_nom_simple = "'.$ville.' and ville_departement = '.$departement.' "
        ';

        $result = mysql_query($query);
        $res = mysql_fetch_array($result);
 
        //echo "<b>villeBD:</b> $res[1] || <b>villeFile:</b> $ville || <b>dep</b> = $departement || <b>res[0]</b> = $res[0] <br>";

        $poi_ville_id  = $res[0];
        $poi_longitude = $explode_chtx[0];
        $poi_latitude = $explode_chtx[1];
        if(!empty($explode_chtx[6]))
            $poi_nom = $explode_chtx[5];
        else
            $poi_nom = "Chateau";
        $poi_type_id = 4;
        $poi_etoile = 0;
         
        if( !empty($res[0]) ){
        
            $query = "
            INSERT INTO t_poi (poi_ville_id, poi_longitude, poi_latitude, poi_nom, poi_type_id, poi_etoile) VALUES
            ( $poi_ville_id, $poi_longitude, $poi_latitude, '$poi_nom', $poi_type_id, $poi_etoile )
            ";


            //echo $query."<br>";        
            //$result = mysql_query($query);
                $i++;
        
        }
        
    }
}

echo $i;
mysql_close();

fclose($file);


?>
