<?php

/**
* \file getTotalDistance.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne la somme de toutes les distances parcourues de la table t_token
*/


require_once("Lib/User.php");

$user = new User();
$totalDistance = $user->totalDistance();
$user->deconnect();

$totalDistance_json = json_encode($totalDistance);
echo ($totalDistance_json);


?>
