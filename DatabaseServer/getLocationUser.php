<?php

/**
* \file getLocationUser.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne un tableau des tokens et de leur localisation
*/


require_once("Lib/User.php");

$user = new User();
$lastKnownLocation = $user->lastKnownLocationByUser();
$user->deconnect();

$lastKnownLocation_json = json_encode($lastKnownLocation);
echo ($lastKnownLocation_json);


?>
