<?php

/**
* \file getAmountUser.php
* \author Loïc TRICJAUD
* \version 1.0
* \date 01/10/2014
* \brief  Retourne le nombre de token de la table t_token
*/

require_once("Lib/User.php");

$user = new User();
$amountOfUser = $user->amountOfUser();
$user->deconnect();

$array_liste_nb_user_json = json_encode($amountOfUser);
echo ($array_liste_nb_user_json);

?>
