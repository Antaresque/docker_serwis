<?php
$URI = "http://store:5000/public/";
$image = file_get_contents($URI . $_GET['obrazek']);

header('Content-type: image/jpeg');

echo $image;