<?php

require_once("User.php");

$user = new User();
$amount = $user->amountOfUser();
$dist = $user->travelledDistanceByUser();
$loc = $user->lastKnownLocationByUser();
$totalDistance = $user->totalDistance();

var_dump( $amount );
var_dump( $dist );
var_dump( $loc );
var_dump( $totalDistance );

?>
