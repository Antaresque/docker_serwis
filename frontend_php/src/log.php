<?php
    session_start();
    require_once 'curl_helper.php';

    $sus = $_POST["username"];
    $pus = $_POST["password"];
    $arr = array("user" => $sus, 
                "pass" => $pus);

    $data = CurlHelper::perform_http_request("POST", "http://api:4000/login/", http_build_query($arr));
    echo $data;
    $data = json_decode($data);
    $_SESSION["token"] = $data->token;
    header('Location: index.php');
?>