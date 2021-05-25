<?php
    require_once 'curl_helper.php';

    $sus = $_POST["username"];
    $pss = $_POST["password"];
    $arr = array("user" => $sus, "pass" => $pss);

    $data = CurlHelper::perform_http_request("POST", "http://api:4000/login/", http_build_query($arr));
    echo $data;
?>