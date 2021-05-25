<?php
    require_once 'curl_helper.php';

    $sus = $_POST["username"];
    $pus = $_POST["password"];
    $arr = array("user" => $sus, 
                "pass" => $pus);
    echo http_build_query($arr) . "\n";

    $data = CurlHelper::perform_http_request("POST", "http://api:4000/login/", $arr);
    echo $data;
?>