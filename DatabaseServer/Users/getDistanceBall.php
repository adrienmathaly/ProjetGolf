<?php

/**
* \file getDistanceBall.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne un tableau des tokens et de leur distance parcourue
*/


require_once("Lib/User.php");

$user = new User();
$travelledDistanceByUser = $user->travelledDistanceByUser();
$user->deconnect();

$travelledDistanceByUser_json = json_encode($travelledDistanceByUser);
echo ($travelledDistanceByUser_json);

?>
