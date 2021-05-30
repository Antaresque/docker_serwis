<?php
$URI = "http://store:5000/public/image/";
$image = @file_get_contents($URI . $_GET['obrazek']);

if($image == false)
    $image = file_get_contents('./placeholder.jpg', true);

header('Content-type: image/jpeg');

echo $image;